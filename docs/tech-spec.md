# 技术规格 — Lv.6 Pass

## 技术栈

| 层 | 技术 | 版本 |
|----|------|------|
| 框架 | React | 19.x |
| 语言 | TypeScript | 5.x |
| 构建 | Vite | 6.x |
| 样式 | Tailwind CSS | 4.x |
| 路由 | react-router-dom | 7.x |
| 动效 | framer-motion | 12.x |
| 图标 | lucide-react | 0.x |
| 部署 | Vercel | — |

## 项目结构

```
src/
├── components/       # UI 组件
│   ├── layout/       # 布局组件 (TopNav, BottomNav, Layout)
│   ├── home/         # 首页组件 (Countdown, FlashCard, DailyQuote)
│   ├── sentence/     # 长难句组件 (SentenceDisplay, WordPopup, StructureDiagram)
│   ├── wordbook/     # 错词本组件 (WordBookList)
│   └── practice/     # 训练组件 (ScoreChart)
├── pages/            # 页面级组件 (7 个路由页面)
├── data/             # 硬编码题库数据
├── hooks/            # 自定义 Hooks (useLocalStorage, useWordBook, usePracticeHistory)
├── utils/            # 工具函数 (diff 算法)
├── App.tsx           # 路由配置
├── main.tsx          # 入口
└── index.css         # Tailwind 导入 + 主题变量
```

## 路由设计

| 路径 | 组件 | 说明 |
|------|------|------|
| `/` | HomePage | 首页 |
| `/sentence` | SentencePage | 长难句 |
| `/wordbook` | WordBookPage | 错词本 |
| `/practice` | PracticePage | 训练首页 |
| `/practice/reading` | ReadingPage | 阅读理解 |
| `/practice/listening` | ListeningPage | 听力填空 |
| `/practice/translation` | TranslationPage | 翻译练习 |

## 数据流
- 所有持久化通过 `useLocalStorage` Hook 与 localStorage 同步
- 组件间无跨页面状态共享（通过 localStorage 间接同步）
- 页面过渡使用 framer-motion `AnimatePresence`
