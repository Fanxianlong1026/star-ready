import test from "node:test";
import assert from "node:assert/strict";
import { analyzeReadme } from "../src/analyze.js";

test("scores a complete README at 100", () => {
  const markdown = `# Example Project

[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

Example Project helps maintainers understand README quality before publishing their repository to GitHub.

## Install

\`\`\`bash
npm install example-project
\`\`\`

## Usage

\`\`\`bash
example-project ./README.md
\`\`\`

## Demo

![Screenshot](./screenshot.png)

## Useful Links

- [Docs](https://example.com/docs)

## Contributing

Issues and pull requests are welcome.

## License

MIT
`;

  const result = analyzeReadme(markdown);

  assert.equal(result.score, 100);
  assert.equal(result.missing.length, 0);
});

test("returns actionable missing signals for a sparse README", () => {
  const result = analyzeReadme("# Tiny\n");
  const missingIds = result.missing.map((item) => item.id);

  assert.equal(result.score, 10);
  assert.ok(missingIds.includes("pitch"));
  assert.ok(missingIds.includes("install"));
  assert.ok(missingIds.includes("license"));
});
