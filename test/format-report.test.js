import test from "node:test";
import assert from "node:assert/strict";
import { formatMarkdownReport, formatTerminalReport } from "../src/format-report.js";

const result = {
  score: 10,
  maxScore: 100,
  passed: [
    {
      id: "title",
      label: "Clear project title",
      points: 10,
      passed: true,
      suggestion: "Add a clear H1 title at the top of the README."
    }
  ],
  missing: [
    {
      id: "install",
      label: "Installation instructions",
      points: 12,
      passed: false,
      suggestion: "Add an installation or setup section."
    }
  ]
};

test("formats terminal reports", () => {
  const output = formatTerminalReport(result);

  assert.match(output, /Star-ready score: 10 \/ 100/);
  assert.match(output, /Clear project title/);
  assert.match(output, /Add an installation or setup section/);
});

test("formats markdown reports", () => {
  const output = formatMarkdownReport(result);

  assert.match(output, /# Star-ready Report/);
  assert.match(output, /\| Yes \| Clear project title \| 10 \|/);
  assert.match(output, /\| No \| Installation instructions \| 12 \|/);
});
