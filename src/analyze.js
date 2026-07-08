const CHECKS = [
  {
    id: "title",
    label: "Clear project title",
    category: "Positioning",
    points: 10,
    test: (markdown) => /^#\s+\S+/m.test(markdown),
    suggestion: "Add a clear H1 title at the top of the README."
  },
  {
    id: "pitch",
    label: "One-line pitch",
    category: "Positioning",
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
    category: "Adoption",
    points: 12,
    test: (markdown) => /(^|\n)#{2,3}\s*(install|installation|setup|getting started)/i.test(markdown),
    suggestion: "Add an installation or setup section."
  },
  {
    id: "quick-start",
    label: "Quick start path",
    category: "Adoption",
    points: 12,
    test: (markdown) => /quick\s*start|getting\s*started|usage/i.test(markdown) && /```[\s\S]*?```/.test(markdown),
    suggestion: "Add a short quick start with copyable commands or code."
  },
  {
    id: "example",
    label: "Usage example",
    category: "Adoption",
    points: 12,
    test: (markdown) => /example|usage|demo/i.test(markdown) && /```[\s\S]*?```/.test(markdown),
    suggestion: "Show one realistic usage example."
  },
  {
    id: "visual",
    label: "Screenshot, GIF, or demo link",
    category: "Trust",
    points: 10,
    test: (markdown) => /!\[[^\]]*]\([^)]+\)|\b(demo|screenshot|gif|preview)\b/i.test(markdown),
    suggestion: "Add one screenshot, GIF, or hosted demo link near the top."
  },
  {
    id: "license",
    label: "License clarity",
    category: "Trust",
    points: 10,
    test: (markdown) => /(^|\n)#{2,3}\s*license\b|MIT|Apache-2\.0|GPL|BSD/i.test(markdown),
    suggestion: "Add a LICENSE file and mention the license in the README."
  },
  {
    id: "badges",
    label: "Status badges",
    category: "Trust",
    points: 7,
    test: (markdown) => /img\.shields\.io|badge\.svg|badgen\.net/i.test(markdown),
    suggestion: "Add a small badge for npm, tests, license, or build status."
  },
  {
    id: "contributing",
    label: "Contribution path",
    category: "Community",
    points: 7,
    test: (markdown) => /contributing|contribution|pull requests|issues/i.test(markdown),
    suggestion: "Add a short contributing section."
  },
  {
    id: "links",
    label: "Useful links",
    category: "Community",
    points: 5,
    test: (markdown) => /\[[^\]]+]\(https?:\/\/[^)]+\)/.test(markdown),
    suggestion: "Add links to docs, homepage, examples, or related resources."
  }
];

function getGrade(score) {
  if (score >= 90) {
    return "A";
  }

  if (score >= 75) {
    return "B";
  }

  if (score >= 60) {
    return "C";
  }

  if (score >= 40) {
    return "D";
  }

  return "F";
}

function summarize(score) {
  if (score >= 90) {
    return "This README looks ready to share.";
  }

  if (score >= 75) {
    return "This README is solid, with a few high-impact gaps left.";
  }

  if (score >= 60) {
    return "This README has the basics, but visitors may still hesitate.";
  }

  if (score >= 40) {
    return "This README needs clearer proof, setup, and trust signals.";
  }

  return "This README needs a stronger first impression before launch.";
}

export function analyzeReadme(markdown) {
  const checks = CHECKS.map((check) => {
    const passed = check.test(markdown);

    return {
      id: check.id,
      label: check.label,
      category: check.category,
      points: check.points,
      passed,
      suggestion: check.suggestion
    };
  });

  const score = checks
    .filter((check) => check.passed)
    .reduce((total, check) => total + check.points, 0);
  const maxScore = CHECKS.reduce((total, check) => total + check.points, 0);
  const missing = checks.filter((check) => !check.passed);

  return {
    score,
    maxScore,
    grade: getGrade(score),
    summary: summarize(score),
    passed: checks.filter((check) => check.passed),
    missing,
    nextSteps: missing
      .slice()
      .sort((first, second) => second.points - first.points)
      .slice(0, 3)
      .map((check) => check.suggestion)
  };
}
