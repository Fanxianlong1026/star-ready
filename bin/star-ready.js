#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { analyzeReadme } from "../src/analyze.js";
import { fetchReadmeFromGitHub } from "../src/fetch-readme.js";
import { formatMarkdownReport, formatTerminalReport } from "../src/format-report.js";

const args = process.argv.slice(2);

function printHelp() {
  console.log(`Star-ready

Usage:
  star-ready <github-url-or-readme-path>
  star-ready <github-url-or-readme-path> --report report.md

Examples:
  star-ready https://github.com/owner/repo
  star-ready ./README.md
  star-ready https://github.com/owner/repo --report report.md
`);
}

function parseArgs(inputArgs) {
  const target = inputArgs[0];
  const reportIndex = inputArgs.indexOf("--report");
  const reportPath = reportIndex >= 0 ? inputArgs[reportIndex + 1] : null;

  return { target, reportPath };
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

  const { target, reportPath } = parseArgs(args);

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

  try {
    const markdown = await loadReadme(target);
    const result = analyzeReadme(markdown);

    console.log(formatTerminalReport(result));

    if (reportPath) {
      await writeFile(resolve(reportPath), formatMarkdownReport(result), "utf8");
      console.log(`\nReport saved to ${reportPath}`);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

main();
