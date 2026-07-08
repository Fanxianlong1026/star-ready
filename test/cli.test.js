import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
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

test("exits with code 2 when the README score is below the threshold", async () => {
  const directory = await mkdtemp(join(tmpdir(), "star-ready-"));
  const readmePath = join(directory, "README.md");

  try {
    await writeFile(readmePath, "# Sparse\n", "utf8");
    const result = runCli([readmePath, "--fail-below", "80"]);

    assert.equal(result.status, 2);
    assert.match(result.stderr, /below required minimum/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("creates a README template", async () => {
  const directory = await mkdtemp(join(tmpdir(), "star-ready-"));
  const outputPath = join(directory, "README.md");

  try {
    const result = runCli(["--init-template", outputPath, "--name", "Template Demo"]);
    const content = await readFile(outputPath, "utf8");

    assert.equal(result.status, 0);
    assert.match(result.stdout, /README template saved/);
    assert.match(content, /^# Template Demo/);
    assert.match(content, /## Quick Start/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
