import https from "node:https";

function requestText(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            "User-Agent": "star-ready"
          }
        },
        (response) => {
          if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
            requestText(response.headers.location).then(resolve, reject);
            return;
          }

          if (response.statusCode !== 200) {
            reject(new Error(`Request failed with status ${response.statusCode}`));
            response.resume();
            return;
          }

          let body = "";
          response.setEncoding("utf8");
          response.on("data", (chunk) => {
            body += chunk;
          });
          response.on("end", () => resolve(body));
        }
      )
      .on("error", reject);
  });
}

function parseGitHubUrl(repoUrl) {
  const url = new URL(repoUrl);
  const [owner, repoWithSuffix] = url.pathname.split("/").filter(Boolean);
  const repo = repoWithSuffix?.replace(/\.git$/, "");

  if (!owner || !repo) {
    throw new Error("Expected a GitHub repository URL like https://github.com/owner/repo.");
  }

  return { owner, repo };
}

export async function fetchReadmeFromGitHub(repoUrl) {
  const { owner, repo } = parseGitHubUrl(repoUrl);
  const candidates = ["main", "master"];
  const names = ["README.md", "readme.md"];

  for (const branch of candidates) {
    for (const name of names) {
      const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${name}`;

      try {
        return await requestText(rawUrl);
      } catch {
        // Try the next common branch/name combination.
      }
    }
  }

  throw new Error("Could not find README.md on main or master.");
}
