# CLAUDE.md — Lv.6 Pass 项目指引

## 项目路径
`D:\桌面\lv6-pass`

## 文档索引
- 需求文档：`./docs/requirements.md`
- 技术规格：`./docs/tech-spec.md`
- 设计规范：`./docs/design-spec.md`
- 执行计划：`./docs/execution-plan.md`

## 开发日志
`./devlog/` — 每日开发记录，命名格式 `YYYY-MM-DD.md`

## 常用命令
```bash
npm run dev      # 启动开发服务器
npm run build    # 生产构建
npm run preview  # 预览生产构建
```

## 项目约定
- 代码注释使用中文
- 组件文件使用 PascalCase.tsx
- 工具/Hooks 使用 camelCase.ts
- 优先使用 Tailwind 原子类，避免自定义 CSS
- 所有持久化使用 localStorage
