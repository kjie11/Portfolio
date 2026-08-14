# 创意版作品集交接

更新时间：2026-08-12

## 当前目标

继续迭代 OF Domains × Akaru 风格的个人作品集首页原型。整体采用米白纸张、编辑式网格、Montagu Slab 标题与 JGS 标签文字；XR 是唯一深色、沉浸式的视觉断层。

## 修改范围

只修改：

`C:\Users\brainco\Documents\作品集\创意版预览\creative-site-framework.html`

预览与截图也放在：

`C:\Users\brainco\Documents\作品集\创意版预览`

严禁修改：

`D:\Portfolio\low-fi-portfolio-prototype\index.html`

低保真页面只能作为内容与交互参考。最近确认的 SHA-256 为：

`C0747CDE0EB7A1B1AEAB3821E454E57BDE65F301873E5FB57D6589301C2B0EFA`

## 当前页面状态

1. 首页身份区保留 ASCII 地景与 `Ruyan Qin`。
2. 原独立 `Body as Interface` 介绍板块已删除。
3. `Body as Interface` 已移动到原 `Interaction Prototype Lab` 标题位置。
4. 右侧描述现在是：

   `A series of experimental embodied-interaction explorations, translating EMG, motion, force, and sensor signals into playful systems.`

5. 右侧三个维度为：

   - `INPUT / EMG, motion, force`
   - `FORM / 2D, 3D, realtime`
   - `PLATFORM / Mobile, desktop, hardware`

6. 下方 Prototype Lab 项目仍保留筛选和等权重项目网格。
7. XR 首页板块已从单张入口改为展开式四项目布局：Abyss、Emotional Mask、AR Escape Room、Speaking World。
8. XR 底部继续链接 `xr-tear-high-fidelity.html`，保留“撕开纸张后进入另一个空间”的沉浸体验。
9. Pizza Delivery、AR Graffiti / AugSoc、Plant Bot 使用三个等权重全屏纸张；桌面 sticky 覆盖，移动端正常连续排列。
10. 后续还有 Visual & Technical Playground、From Input to Experience、About 与 Footer。

## 已确认的设计原则

- Prototype Lab 内项目权重一致，不做突出主卡。
- XR 可以有更强的沉浸感，但首页应先展开展示项目，撕裂效果作为进一步探索入口。
- 不使用圆角卡片墙、玻璃效果或新增依赖。
- Plant Bot 与其他项目内容不得伪造；仅使用已有真实素材和已确认文案。
- 保持键盘焦点、移动端布局和 `prefers-reduced-motion` 支持。

## 最近验证

- 桌面：1440 × 900，无横向溢出或页面错误。
- 手机：390 × 844，无横向溢出或页面错误。
- Prototype Lab 筛选正常。
- XR 四张图片正常加载。
- 三个案例桌面为 sticky，移动端为 static。
- Impeccable 检测器仍提示既有的 Arial 使用与 XR 网格背景；这是现有视觉方向，不是最近改动产生的问题。

最近的合并板块截图：

- `creative-site-framework-body-lab-merged-desktop.png`
- `creative-site-framework-body-lab-merged-mobile.png`

XR 展开截图：

- `creative-site-framework-xr-expanded-desktop.png`
- `creative-site-framework-xr-expanded-mobile.png`

## 新对话开始方式

请先阅读：

- `C:\Users\brainco\Documents\作品集\AGENTS.md`
- 本文件
- `C:\Users\brainco\Documents\作品集\PRODUCT.md`
- `C:\Users\brainco\Documents\作品集\创意版预览\creative-site-framework.html`

然后运行 `git status --short`，保留所有已有修改。使用项目要求的 Ponytail ultra；涉及 UI 时同时使用 Impeccable，浏览器验证使用 Webapp Testing。只做用户在新对话中指定的下一处调整。

## 可直接发给新对话

> 请阅读 `C:\Users\brainco\Documents\作品集\创意版预览\CHAT-HANDOFF.md` 并继续修改创意版作品集。只允许修改 `C:\Users\brainco\Documents\作品集\创意版预览\creative-site-framework.html`，不要修改 `D:\Portfolio\low-fi-portfolio-prototype\index.html`。先检查当前页面和已有改动，再按我接下来的要求继续。
