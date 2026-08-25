# 🎓 伦敦大学计算机科学作业合集 | UoL Computer Science Coursework

> 本仓库集成了伦敦大学（University of London）计算机科学本科学位课程的全部编程作业，按课程分类整理，方便统一浏览与查阅。
>
> This repository aggregates all programming coursework from my University of London BSc Computer Science degree, organized by module for easy browsing.

[![University of London](https://img.shields.io/badge/University-London-blue?style=for-the-badge)](https://london.ac.uk/)
[![BSc Computer Science](https://img.shields.io/badge/Degree-BSc_Computer_Science-red?style=for-the-badge)]()
[![JavaScript](https://img.shields.io/badge/Language-JavaScript-f7df1e?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![p5.js](https://img.shields.io/badge/Framework-p5.js-ff6b6b?style=for-the-badge&logo=p5.js)](https://p5js.org/)

---

## 📚 课程作业导航 | Coursework Navigation

| # | 课程模块 | 作业项目 | 技术栈 | 在线演示 |
|---|---------|---------|--------|---------|
| 1 | **Programming 1**<br>编程 1（期末大作业） | 🐱 [Black Cat Granary Saga 黑猫粮仓传说](01-Programming1-Black-Cat-Granary-Saga/) — 2D 平台冒险游戏 | p5.js · ES6 · 模块化架构 | ▶️ [在线试玩](https://leechuihui.github.io/Programing-1--final-exam-report-game_project_6/) |
| 2 | **Programming 2**<br>编程 2（期末大作业） | 🌌 [Galaxy Audio Visualizer 银河音频可视化播放器](02-Programming2-Galaxy-Audio-Visualizer/) — 专业音频可视化播放器 | p5.js · Web Audio API · FFT 频谱分析 | ▶️ [在线体验](https://leechuihui.github.io/programing2-final-exam-report-galaxy-audio-visualizer/) |
| 3 | **Algorithms and Data Structures**<br>算法与数据结构 | ✒️ [Poetry Assistant 诗歌创作助手](03-Algorithms-Poetry-Assistant/) — 押韵/头韵/音节查询工具 | JavaScript · Trie 树 · 哈希表 | — |
| 4 | **Introduction to Computer Programming**<br>计算机编程导论 | 🔍 [Case 101: The Case of Lina Lovelace](04-IntroToProgramming-Case101-Lina-Lovelace/) — 图像识别侦探案例 | p5.js · 坐标绘图 | — |

---

## 📂 目录结构 | Repository Structure

```
UoL-CS-Assignments/
├── README.md                                    ← 本文件（总索引）
│
├── 01-Programming1-Black-Cat-Granary-Saga/      ← 编程 1 期末作业
│   ├── README.md                                ← 项目详情
│   ├── project reprot                           ← 模块化系统文档
│   ├── docs/                                    ← 架构文档 / 开发日志 / 技术文档
│   ├── main.js / sketch.js                      ← 游戏入口
│   ├── game_modules.js                          ← 核心游戏逻辑（模块化）
│   ├── character.js / environment.js / weather.js ...
│   └── assets/                                  ← 素材、截图、演示视频
│
├── 02-Programming2-Galaxy-Audio-Visualizer/     ← 编程 2 期末作业
│   ├── README.md                                ← 项目详情
│   ├── Project report.md                        ← 项目报告 ⭐
│   ├── sketch.js / needles.js / plant.js        ← 可视化核心代码
│   ├── audio-files.json                         ← 动态播放列表配置
│   └── media/                                   ← 截图与演示视频
│
├── 03-Algorithms-Poetry-Assistant/              ← 算法课作业
│   ├── README.md                                ← 项目详情
│   ├── ASSIGNMENT_ANSWERS.md                    ← 作业题解 ⭐
│   ├── poetry-assistant.js                      ← Trie 树 + 押韵算法实现
│   └── app.js / index.html                      ← Web 界面
│
└── 04-IntroToProgramming-Case101-Lina-Lovelace/ ← 编程导论作业
    ├── Case - 101 - The case of Lina Lovelace.md ← 案例 Stage 2 题目与解答
    ├── Introduction to Computer Programming...   ← Stage 1 - Central Station
    └── 101-0-93175851-7699534 下午10.02.25/      ← p5.js 项目源码
```

---

## 🎮 各作业简介 | Project Highlights

### 1️⃣ Black Cat Granary Saga：Dream Prologue 🐱⚔️
**Programming 1 期末大作业**

一款用 p5.js 开发的 2D 平台冒险游戏：黑猫武士「影爪」守护村庄粮仓，对抗智能 AI 老鼠军团。

- ✅ 昼夜循环 + 动态天气系统（雨/雪/闪电）
- ✅ 战斗系统与智能敌人 AI
- ✅ 计分系统与音频系统
- ✅ 完整模块化重构（`game_modules.js`），含架构文档与开发日志
- 📄 相关报告：[`project reprot`](01-Programming1-Black-Cat-Granary-Saga/project%20reprot) · [`docs/`](01-Programming1-Black-Cat-Granary-Saga/docs/)
- 🔗 原始仓库：[Programing-1--final-exam-report-game_project_6](https://github.com/Leechuihui/Programing-1--final-exam-report-game_project_6)

### 2️⃣ Galaxy Audio Visualizer Player 🌌
**Programming 2 期末大作业**

基于现代 Web 技术的专业级音频可视化播放器，宇宙主题界面。

- ✅ Web Audio API 实时音频分析（FFT 频谱）
- ✅ 多种可视化模式（太阳系可视化等）
- ✅ 动态播放列表、键盘快捷键、移动端适配
- 📄 相关报告：[`Project report.md`](02-Programming2-Galaxy-Audio-Visualizer/Project%20report.md)
- 🔗 原始仓库：[programing2-final-exam-report-galaxy-audio-visualizer](https://github.com/Leechuihui/programing2-final-exam-report-galaxy-audio-visualizer)

### 3️⃣ Poetry Assistant 诗歌创作助手 ✒️
**Algorithms and Data Structures 作业**

帮助诗人查找押韵词、头韵词并统计英文单词音节数的应用。

- ✅ **Trie 树（前缀树）**：高效单词存储与前缀检索
- ✅ **哈希表 RhymeMap**：按押韵模式组织单词
- ✅ 自研押韵检测算法（处理 -ed/-ing/-er/-ly 等常见词尾）
- ✅ 音节统计算法（元音频率 + 特殊规则）
- 📄 题解：[`ASSIGNMENT_ANSWERS.md`](03-Algorithms-Poetry-Assistant/ASSIGNMENT_ANSWERS.md)
- 🔗 原始仓库：[UoL-CS--Algorithms](https://github.com/Leechuihui/UoL-CS--Algorithms)

### 4️⃣ Case 101: The Case of Lina Lovelace 🔍
**Introduction to Computer Programming 案例作业**

伦敦大学编程导论课的经典「侦探案例」系列：在 Console City 追踪 Lina Lovelace，用 p5.js 绘制精确矩形框识别目标人物。

- ✅ Stage 1 - Central Station（中央车站追踪）
- ✅ Stage 2 - Smalltalk Speakeasy（酒吧辨认）
- ✅ 精确坐标计算与图形绘制
- 🔗 原始仓库：[-Online-Courses-Learning](https://github.com/Leechuihui/-Online-Courses-Learning)

---

## 🚀 如何运行 | How to Run

所有项目均为纯前端 p5.js 项目，无需安装依赖：

```bash
# 方式一：直接打开
# 双击各项目文件夹中的 index.html 即可在浏览器中运行

# 方式二：本地服务器（推荐，部分浏览器策略需要）
cd 01-Programming1-Black-Cat-Granary-Saga
python -m http.server 8000
# 浏览器访问 http://localhost:8000
```

> 💡 在线演示无需下载，直接点击顶部导航表格中的「在线试玩 / 在线体验」链接。

---

## 📝 说明 | Notes

- 本仓库为**只读归档集成**，各作业的完整开发历史请访问对应的原始仓库。
- 原仓库 `my-p5js-game` 为空仓库，未纳入本合集。
- 集成时修复了原仓库中 2 个 Windows 不兼容的文件名（含 `|` 和 `:` 字符），并同步更新了代码中的引用，现在全平台均可正常克隆。
