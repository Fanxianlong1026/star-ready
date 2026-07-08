const CHECKS = [
  {
    id: "title",
    label: "Clear project title",
    points: 10,
    test: (markdown) => /^#\s+\S+/m.test(markdown),
    suggestion: "Add a clear H1 title at the top of the README."
  },
  {
    id: "pitch",
    label: "One-line pitch",
    points: 15,
    test: (markdown) => {
      const lines = markdown
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);

      const firstParagraph = lines.find((line) => !line.startsWith("#") && !line.startsWith("!"));
      return Boolean(firstParagraph && firstParagraph.length >= 40 && firstParagraph.length <= 220);
    },
    suggestion: "Put a concise one-sentence value proposition directly under the title."
  },
  {
    id: "install",
    label: "Installation instructions",
    points: 12,
    test: (markdown) => /(^|\n)#{2,3}\s*(install|installation|setup|getting started)/i.test(markdown),
    suggestion: "Add an installation or setup section."
  },
  {
    id: "quick-start",
    label: "Quick start path",
    points: 12,
    test: (markdown) => /quick\s*start|getting\s*started|usage/i.test(markdown) && /```[\s\S]*?```/.test(markdown),
    suggestion: "Add a short quick start with copyable commands or code."
  },
  {
    id: "example",
    label: "Usage example",
    points: 12,
    test: (markdown) => /example|usage|demo/i.test(markdown) && /```[\s\S]*?```/.test(markdown),
    suggestion: "Show one realistic usage example."
  },
  {
    id: "visual",
    label: "Screenshot, GIF, or demo link",
    points: 10,
    test: (markdown) => /!\[[^\]]*]\([^)]+\)|\b(demo|screenshot|gif|preview)\b/i.test(markdown),
    suggestion: "Add one screenshot, GIF, or hosted demo link near the top."
  },
  {
    id: "license",
    label: "License clarity",
    points: 10,
    test: (markdown) => /(^|\n)#{2,3}\s*license\b|MIT|Apache-2\.0|GPL|BSD/i.test(markdown),
    suggestion: "Add a LICENSE file and mention the license in the README."
  },
  {
    id: "badges",
    label: "Status badges",
    points: 7,
    test: (markdown) => /img\.shields\.io|badge\.svg|badgen\.net/i.test(markdown),
    suggestion: "Add a small badge for npm, tests, license, or build status."
  },
  {
    id: "contributing",
    label: "Contribution path",
    points: 7,
    test: (markdown) => /contributing|contribution|pull requests|issues/i.test(markdown),
    suggestion: "Add a short contributing section."
  },
  {
    id: "links",
    label: "Useful links",
    points: 5,
    test: (markdown) => /\[[^\]]+]\(https?:\/\/[^)]+\)/.test(markdown),
    suggestion: "Add links to docs, homepage, examples, or related resources."
  }
];

export function analyzeReadme(markdown) {
  const checks = CHECKS.map((check) => {
    const passed = check.test(markdown);

    return {
      id: check.id,
      label: check.label,
      points: check.points,
      passed,
      suggestion: check.suggestion
    };
  });

  const score = checks
    .filter((check) => check.passed)
    .reduce((total, check) => total + check.points, 0);

  return {
    score,
    maxScore: CHECKS.reduce((total, check) => total + check.points, 0),
    passed: checks.filter((check) => check.passed),
    missing: checks.filter((check) => !check.passed)
  };
}
