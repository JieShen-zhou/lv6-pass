# 设计规范 — Lv.6 Pass

## 风格定位
极简现代学院风，干净、专注，具有学习工具的沉静感。

## 配色方案

| 用途 | 色值 | CSS 变量 |
|------|------|----------|
| 主背景 | #FBF9F1 | `--color-bg` |
| 卡片背景 | #FFFFFF | `--color-card` |
| 学术蓝（强调） | #3B5998 | `--color-accent` |
| 墨绿（正确） | #2E7D32 | `--color-correct` |
| 暖橙（错误） | #E65100 | `--color-wrong` |
| 琥珀（半对） | #F59E0B | `--color-warning` |
| 主文字 | #1F2937 | `--color-text` |
| 次要文字 | #6B7280 | `--color-text-secondary` |

## 字体

| 用途 | 字体 |
|------|------|
| 英文单词 | Georgia, "Times New Roman", serif |
| 中文内容 | "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif |

## 组件规范

### 卡片
- 圆角：rounded-2xl (16px)
- 阴影：shadow-sm
- 边框：border border-border
- 内边距：p-5 (20px)

### 按钮
- 主按钮：bg-accent text-white rounded-xl
- 次级按钮：border border-border bg-card rounded-full
- 错误按钮：border border-wrong text-wrong

## 响应式
- 移动端（<768px）：底部固定导航栏
- 桌面端（≥768px）：顶部标签页导航
- 最大内容宽度：max-w-4xl (896px)
