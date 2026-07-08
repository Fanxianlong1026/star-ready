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
      category: "Positioning",
      points: 10,
      passed: true,
      suggestion: "Add a clear H1 title at the top of the README."
    }
  ],
  missing: [
    {
      id: "install",
      label: "Installation instructions",
      category: "Adoption",
      points: 12,
      passed: false,
      suggestion: "Add an installation or setup section."
    }
  ],
  grade: "F",
  summary: "This README needs a stronger first impression before launch.",
  nextSteps: ["Add an installation or setup section."]
};

test("formats terminal reports", () => {
  const output = formatTerminalReport(result);

  assert.match(output, /Star-ready score: 10 \/ 100 \(F\)/);
  assert.match(output, /Clear project title/);
  assert.match(output, /Add an installation or setup section/);
  assert.match(output, /Next steps/);
});

test("formats markdown reports", () => {
  const output = formatMarkdownReport(result);

  assert.match(output, /# Star-ready Report/);
  assert.match(output, /\| Yes \| Positioning \| Clear project title \| 10 \|/);
  assert.match(output, /\| No \| Adoption \| Installation instructions \| 12 \|/);
  assert.match(output, /## Next Steps/);
});
