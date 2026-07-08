function formatList(items, fallback) {
  if (items.length === 0) {
    return `- ${fallback}`;
  }

  return items.map((item) => `- ${item.label}`).join("\n");
}

export function formatTerminalReport(result) {
  const suggestions = result.missing.map((item) => `- ${item.suggestion}`).join("\n");

  return `Star-ready score: ${result.score} / ${result.maxScore}

Strong signals:
${formatList(result.passed, "No strong signals found yet.")}

Missing signals:
${formatList(result.missing, "Nothing obvious is missing.")}

Suggestions:
${suggestions || "- This README is in good shape. Keep it current."}`;
}

export function formatMarkdownReport(result) {
  const rows = [...result.passed, ...result.missing]
    .map((item) => `| ${item.passed ? "Yes" : "No"} | ${item.label} | ${item.points} |`)
    .join("\n");

  const suggestions = result.missing.map((item) => `- ${item.suggestion}`).join("\n");

  return `# Star-ready Report

**Score:** ${result.score} / ${result.maxScore}

## Checklist

| Passed | Signal | Points |
| --- | --- | --- |
${rows}

## Suggestions

${suggestions || "- This README is in good shape. Keep it current."}
`;
}
