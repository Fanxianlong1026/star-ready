#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { analyzeReadme } from "../src/analyze.js";
import { fetchReadmeFromGitHub } from "../src/fetch-readme.js";
import { formatMarkdownReport, formatTerminalReport } from "../src/format-report.js";
import { createReadmeTemplate } from "../src/template.js";

const args = process.argv.slice(2);

function printHelp() {
  console.log(`Star-ready

Usage:
  star-ready <github-url-or-readme-path>
  star-ready <github-url-or-readme-path> --report report.md
  star-ready <github-url-or-readme-path> --json
  star-ready <github-url-or-readme-path> --fail-below 80
  star-ready --init-template README.md --name "My Project"

Examples:
  star-ready https://github.com/owner/repo
  star-ready ./README.md
  star-ready https://github.com/owner/repo --report report.md
  star-ready ./README.md --json
  star-ready --init-template README.md --name "My Project"
`);
}

function parseArgs(inputArgs) {
  let target = null;
  let reportPath = null;
  let failBelow = null;
  let json = false;
  let templatePath = null;
  let name = "Your Project";

  for (let index = 0; index < inputArgs.length; index += 1) {
    const arg = inputArgs[index];

    if (arg === "--report") {
      reportPath = inputArgs[index + 1] ?? null;
      index += 1;
      continue;
    }

    if (arg === "--fail-below") {
      failBelow = Number(inputArgs[index + 1]);
      index += 1;
      continue;
    }

    if (arg === "--json") {
      json = true;
      continue;
    }

    if (arg === "--init-template") {
      const nextArg = inputArgs[index + 1];
      templatePath = nextArg && !nextArg.startsWith("-") ? nextArg : "README.md";

      if (templatePath === nextArg) {
        index += 1;
      }

      continue;
    }

    if (arg === "--name") {
      name = inputArgs[index + 1] ?? name;
      index += 1;
      continue;
    }

    if (!arg.startsWith("-") && !target) {
      target = arg;
    }
  }

  return {
    target,
    reportPath,
    failBelow,
    json,
    templatePath,
    name
  };
}

function isGitHubUrl(value) {
  return /^https?:\/\/github\.com\/[^/]+\/[^/]+\/?$/.test(value);
}

async function loadReadme(target) {
  if (isGitHubUrl(target)) {
    return fetchReadmeFromGitHub(target);
  }

  return readFile(resolve(target), "utf8");
}

async function main() {
  if (args.includes("--help") || args.includes("-h")) {
    printHelp();
    return;
  }

  const { target, reportPath, failBelow, json, templatePath, name } = parseArgs(args);

  if (templatePath) {
    try {
      await writeFile(resolve(templatePath), createReadmeTemplate(name), "utf8");
      console.log(`README template saved to ${templatePath}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exitCode = 1;
    }

    return;
  }

  if (!target) {
    printHelp();
    process.exitCode = 1;
    return;
  }

  if (args.includes("--report") && !reportPath) {
    console.error("Missing report path after --report.");
    process.exitCode = 1;
    return;
  }

  if (args.includes("--fail-below") && (!Number.isFinite(failBelow) || failBelow < 0 || failBelow > 100)) {
    console.error("Missing or invalid score after --fail-below. Use a number from 0 to 100.");
    process.exitCode = 1;
    return;
  }

  try {
    const markdown = await loadReadme(target);
    const result = analyzeReadme(markdown);

    if (json) {
      console.log(JSON.stringify(result, null, 2));
    } else {
      console.log(formatTerminalReport(result));
    }

    if (reportPath) {
      await writeFile(resolve(reportPath), formatMarkdownReport(result), "utf8");

      if (!json) {
        console.log(`\nReport saved to ${reportPath}`);
      }
    }

    if (failBelow !== null && result.score < failBelow) {
      if (!json) {
        console.error(`\nScore ${result.score} is below required minimum ${failBelow}.`);
      }

      process.exitCode = 2;
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

main();
