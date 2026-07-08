import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const cliPath = fileURLToPath(new URL("../bin/star-ready.js", import.meta.url));

function runCli(args) {
  return spawnSync(process.execPath, [cliPath, ...args], {
    cwd: fileURLToPath(new URL("..", import.meta.url)),
    encoding: "utf8"
  });
}

test("prints JSON output", () => {
  const result = runCli(["--json", "./README.md"]);
  const parsed = JSON.parse(result.stdout);

  assert.equal(result.status, 0);
  assert.equal(parsed.score, 100);
});

test("rejects invalid score thresholds", () => {
  const result = runCli(["./README.md", "--fail-below", "101"]);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /Use a number from 0 to 100/);
});
