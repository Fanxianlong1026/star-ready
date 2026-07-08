# Star-ready

[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18-339933.svg)](package.json)

[中文说明](README.zh-CN.md)

Check whether your GitHub repository is ready to earn stars.

Star-ready is a tiny CLI that reviews a repository README and gives it a practical score based on the signals people look for before starring an open-source project: a clear pitch, quick start, examples, screenshots, license, badges, and contribution hints.

```bash
npx star-ready https://github.com/owner/repo
```

```text
Star-ready score: 76 / 100 (B)
This README is solid, with a few high-impact gaps left.

Strong signals:
- Clear project title
- Installation instructions found
- Usage example found

Missing signals:
- No screenshot or demo link
- No license section
- No contribution guide

Suggestions:
- Add one screenshot, GIF, or demo link near the top.
- Add a 3-step quick start before advanced configuration.
- Include a license so people know how they can use the project.

Next steps:
- Add one screenshot, GIF, or hosted demo link near the top.
- Add a 3-step quick start before advanced configuration.
- Include a license so people know how they can use the project.
```

## Why

Great projects are often ignored because visitors cannot understand them quickly. A strong README should answer four questions in the first minute:

- What does this project do?
- Who is it for?
- How do I try it?
- Can I trust it?

Star-ready turns those questions into a simple checklist and score.

## Features

- Score a GitHub repository by URL
- Score a local `README.md`
- Detect common README signals
- Print clear terminal reports
- Print JSON for automation
- Fail CI when a README score is too low
- Generate a Markdown report for issues or pull requests
- Generate a starter README template
- Runs with Node.js only, no runtime dependencies

## Install

```bash
npm install -g star-ready
```

Or run it without installing:

```bash
npx star-ready https://github.com/owner/repo
```

## Usage

Check a GitHub repository:

```bash
star-ready https://github.com/owner/repo
```

Check a local README:

```bash
star-ready ./README.md
```

Save a report:

```bash
star-ready https://github.com/owner/repo --report report.md
```

Print JSON:

```bash
star-ready ./README.md --json
```

Fail when the score is below a threshold:

```bash
star-ready ./README.md --fail-below 80
```

Create a starter README template:

```bash
star-ready --init-template README.md --name "My Project"
```

## What It Checks

Star-ready looks for practical signals that help a repository feel useful and trustworthy:

| Category | Signal | Why it matters |
| --- | --- | --- |
| Positioning | Clear title | Visitors need to know where they are |
| Positioning | One-line pitch | The project value should be obvious fast |
| Adoption | Installation | People need a path to try it |
| Adoption | Quick start | A short success path increases adoption |
| Adoption | Usage example | Examples make the tool feel real |
| Trust | Screenshot or demo | Visual proof makes sharing easier |
| Trust | License | People need permission clarity |
| Trust | Badges | Status signals help with trust |
| Community | Contributing | Contributors need an entry point |
| Community | Links | Homepage, docs, or demos reduce friction |

## Example Report

```text
Star-ready score: 68 / 100 (C)
This README has the basics, but visitors may still hesitate.

Strong signals:
- README has a clear title
- Installation section found
- Usage section found

Missing signals:
- No visual demo found
- No license mentioned
- No contribution section found

Suggestions:
- Put a one-sentence value proposition directly under the title.
- Add a screenshot, GIF, or hosted demo link.
- Add a LICENSE file and mention it in the README.

Next steps:
- Put a one-sentence value proposition directly under the title.
- Add a screenshot, GIF, or hosted demo link.
- Add a LICENSE file and mention it in the README.
```

## Roadmap

- GitHub Action for pull request README checks
- README badge generation
- AI rewrite suggestions
- Web demo

## Useful Links

- [GitHub README guide](https://docs.github.com/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes)
- [Open Source Guides](https://opensource.guide/)

## Contributing

Issues and pull requests are welcome. If you have a README pattern that helped your project get adopted, please open an issue and share it.

## License

MIT
