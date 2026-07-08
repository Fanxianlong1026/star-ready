# Star-ready 中文说明

Star-ready 是一个用来检查 GitHub 仓库 README 是否“适合被 star”的小工具。

它会分析 README 里有没有这些关键信号：

- 项目一句话介绍
- 安装步骤
- 快速开始
- 使用示例
- 截图、GIF 或 demo
- License
- Badges
- 贡献说明

## 推荐仓库介绍

你可以在 GitHub 仓库描述里写：

```text
Check whether your GitHub repo is ready to earn stars.
```

中文宣传可以写：

```text
一个自动检查 GitHub 项目 README 是否容易获得 star 的 CLI 工具。
```

## 第一版上传哪些文件

建议先上传这些文件：

```text
star-ready/
  README.md
  README.zh-CN.md
  package.json
  LICENSE
  .gitignore
  bin/
    star-ready.js
  src/
    analyze.js
    fetch-readme.js
    format-report.js
  examples/
    report.md
```

## 发到社区时的标题

可以用这些标题：

- I built a CLI that checks if your GitHub repo is ready to earn stars
- Star-ready: a README checklist for open-source projects
- 我做了一个检查 GitHub README 是否容易被 star 的小工具

## 后续可以扩展

- 做成 GitHub Action
- 做成网页 demo
- 输出 JSON 报告
- 生成 README 徽章
- 接入 AI，自动改写 README 开头
