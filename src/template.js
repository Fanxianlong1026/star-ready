export function createReadmeTemplate(projectName = "Your Project") {
  return `# ${projectName}

[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

Write one clear sentence that explains what this project does and who it helps.

## Demo

Add a screenshot, GIF, or hosted demo link here.

## Install

\`\`\`bash
npm install ${projectName.toLowerCase().replaceAll(" ", "-")}
\`\`\`

## Quick Start

\`\`\`bash
${projectName.toLowerCase().replaceAll(" ", "-")} --help
\`\`\`

## Usage

Show one realistic example and the output users should expect.

## Configuration

Document the most common options or environment variables.

## Contributing

Issues and pull requests are welcome.

## License

MIT
`;
}
