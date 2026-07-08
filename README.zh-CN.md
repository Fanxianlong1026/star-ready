# Star-ready

[English](README.md)

检查你的 GitHub 仓库 README 是否已经准备好获得更多 star。

Star-ready 是一个轻量级命令行工具。它会分析 README 中是否包含开源项目常见的关键信号，例如项目介绍、安装步骤、快速开始、示例、截图、许可证、徽章和贡献说明，并输出分数、等级和可执行的改进建议。

## 适合谁

- 正在发布开源项目的开发者
- 想让仓库主页更清晰的维护者
- 需要在 PR 或 CI 中检查 README 质量的团队
- 想学习优秀 README 结构的新手

## 功能

- 检查 GitHub 仓库链接
- 检查本地 `README.md`
- 输出终端报告
- 输出 JSON，方便自动化处理
- 生成 Markdown 报告
- 设置最低分数阈值，低于阈值时让 CI 失败
- 生成一个可直接修改的 README 模板

## 安装

```bash
npm install -g star-ready
```

也可以直接使用：

```bash
npx star-ready https://github.com/owner/repo
```

## 使用方法

检查 GitHub 仓库：

```bash
star-ready https://github.com/owner/repo
```

检查本地 README：

```bash
star-ready ./README.md
```

生成 Markdown 报告：

```bash
star-ready ./README.md --report report.md
```

输出 JSON：

```bash
star-ready ./README.md --json
```

设置最低分数，适合 CI：

```bash
star-ready ./README.md --fail-below 80
```

生成 README 模板：

```bash
star-ready --init-template README.md --name "My Project"
```

## 检查内容

| 检查项 | 作用 |
| --- | --- |
| 项目标题 | 让访问者立刻知道项目名称 |
| 一句话介绍 | 快速说明项目价值 |
| 安装步骤 | 降低尝试成本 |
| 快速开始 | 给用户一条最短成功路径 |
| 使用示例 | 让工具的实际效果更具体 |
| 截图或 demo | 提供直观证明 |
| License | 明确别人是否可以使用 |
| Badges | 展示版本、测试、许可证等状态 |
| 贡献说明 | 让潜在贡献者知道如何参与 |
| 有用链接 | 连接文档、主页、示例或相关资源 |

## 输出示例

```text
Star-ready score: 86 / 100 (B)
This README is solid, with a few high-impact gaps left.

Strong signals:
- Clear project title
- Installation instructions
- Usage example

Missing signals:
- Screenshot, GIF, or demo link

Suggestions:
- Add one screenshot, GIF, or hosted demo link near the top.

Next steps:
- Add one screenshot, GIF, or hosted demo link near the top.
```

## 在 GitHub Actions 中使用

```yaml
name: README check

on:
  pull_request:
  push:
    branches: [main]

jobs:
  readme:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: node ./bin/star-ready.js ./README.md --fail-below 80
```

## 为什么需要它

很多项目不是因为代码差而被忽略，而是因为访问者在前几十秒内看不懂它的价值。Star-ready 把这些容易被忽略的 README 信号变成清晰的检查结果，帮助你更快发现“别人为什么没有继续看下去”。

## 贡献

欢迎提交 issue 和 pull request。新的检查项应该尽量简单、可解释，并且给出明确的改进建议。

## License

MIT
