---
target: 19 creative portfolio project detail pages
total_score: 18
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
timestamp: 2026-08-14T03-49-56Z
slug: project-pizzadelivery-html
---
# 创意版项目详情页 UI/UX 评审

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---:|---|
| 1 | 系统状态可见性 | 2 | 媒体先行页面首屏看不到项目身份，也没有阅读进度提示。 |
| 2 | 与真实世界匹配 | 3 | 文案诚实且符合项目语境，但部分技术术语密集，两个英文页面语言标记错误。 |
| 3 | 用户控制与自由 | 3 | 返回项目列表清晰，但移动端隐藏了 About、Contact、CV。 |
| 4 | 一致性与标准 | 2 | 共享外观一致，内容顺序、媒体职责、图片说明和页面深度不一致。 |
| 5 | 错误预防 | 2 | 空媒体占位像资源加载失败，外部视频缺少统一后备说明。 |
| 6 | 识别优于记忆 | 2 | 长页面没有角色、结果、状态和验证边界的首屏摘要。 |
| 7 | 灵活与效率 | n/a | Experience + Read 型作品集页面。 |
| 8 | 审美与简约 | 3 | 编辑式视觉克制而独特，但空占位、重复媒体和超长标题削弱精度。 |
| 9 | 错误恢复 | 1 | iframe 和媒体缺失状态没有明确恢复路径。 |
| 10 | 帮助与文档 | n/a | Experience + Read 型作品集页面。 |
| **Total** | | **18/32** | **Acceptable，需要优化招聘者阅读路径** |

## Design Specificity Verdict

页面不是通用模板：米白纸张、Montagu Slab、JGS 标签、细分隔线和克制的青色形成了适合 XR、游戏与交互原型的编辑式语言。问题不在视觉方向，而在同一模板没有适配视频型、图像型、长案例和无媒体项目，导致内容证据越弱的页面越像未完成页面。

检测器在 19 页中只发现 2 条 `flat-type-hierarchy`：Pizza Delivery 的 12/14/16px 和 Plant Bot 的 13/14/16px。两条主要来自页面内联样式，实际 H1/H2 已被共享 CSS 放大，属于局部或静态扫描误报；Plant Bot 的 13/14px 图注层级仍确实偏弱。

## Overall Impression

视觉身份已经成立，最大机会是把“看作品”改成“十秒内读懂贡献，再按需深入证据”。每个首屏都应同时出现项目名、本人角色、最强证据和真实媒体，而不是让视频或长标题单独占满首屏。

## What's Working

- Montagu 展示字体、JGS 标签和纸张底色形成明确的个人视觉语言。
- Pizza Delivery 用具体测试轮次与因果限制建立可信度，没有夸大结果。
- Plant Bot 的研究、线路、装配和 AR 过程素材真正对应项目过程，而不是装饰图。
- 共享 CSS 已保证 390px 无横向溢出，并保留清晰的键盘焦点。

## Priority Issues

### [P1] 招聘者最需要的事实埋得太深

Pizza Delivery 与 Plant Bot 超过 5,500px，Results 和 My Role 到后半段才出现。每页标题后增加统一事实带：Role、Contribution、Tools/Context、Status、Strongest Evidence、Validation Boundary。正文顺序改为 Overview → Key Work → Result/Validation → Process → Learnings。

Suggested command: `$impeccable layout`

### [P1] 无媒体项目的大灰块看起来像加载失败

Neon BeatRunner 等页面的空矩形没有信息价值且被 `aria-hidden`。没有真实素材时直接移除；若需要说明证据缺口，改成可见的 Evidence pending 文本区，不伪造图片。

Suggested command: `$impeccable clarify`

### [P1] 可访问性元数据与移动导航不完整

Abyss、Emotional Mask 的可见内容是英文但声明 `zh-CN`；Emotional Mask iframe 无 title；Abyss 图片 alt 是 Project Detail 1/2/3；移动端只保留 All Projects。修正语言、iframe 标题、描述性 alt，并提供语义化移动菜单访问 About、Contact、CV。

Suggested command: `$impeccable audit`

### [P2] 媒体顺序重复，没有说明每份证据证明什么

部分页面依次出现本地视频、YouTube 和截图，但缺少证据职责。每页只保留一个首要媒体；其余图片贴近对应论点并使用 figure/figcaption，说明它支持哪项设计决定或验证结果。

Suggested command: `$impeccable distill`

### [P2] 字体体系正确，但字号、正文宽度和长标题缺少自适应

UI/UX Pro Max 的编辑式作品集建议采用展示 serif + 阅读 serif/sans + mono 标签的三层体系。保留 Montagu 与 JGS；正文优先改为 Source Serif 4，若更偏技术清晰则用 Public Sans。正文控制在 17–18px、1.65–1.75 行高、65–70ch；长标题桌面不超过 76px、手机 42–56px；JGS 只用于 12px 以上的标签和数据。

Suggested command: `$impeccable typeset`

## 建议的统一详情页骨架

1. 首屏：项目标题 + 一句话命题 + 4–6 项事实带 + 一个主媒体。
2. Key Work：3–5 条最强个人贡献，先回答“我做了什么”。
3. Result / Validation：结果、证据、仍未验证的边界并列呈现。
4. Process：只保留能说明取舍和迭代的内容，媒体靠近对应论点。
5. Closing：一句学习结论 + Previous / All Projects / Next。

模板只需要三种变体：video-led、image-led、evidence-only。短页面不强行填满，长页面桌面可增加 3–4 项锚点目录，手机保持单一路径。

## Persona Red Flags

- 招聘者/首次访问者：媒体先于角色与结果，10 秒内无法确认本人贡献；长页缺少下一项目入口。
- 键盘、屏幕阅读器与缩放用户：焦点可见性良好，但错误 lang、无标题 iframe、泛化 alt 和隐藏的移动导航破坏访问。
- 分心的手机审阅者：长标题和简介延迟证据，页面可达 4,600px 以上，没有摘要锚点，重复视频也增加慢网负担。

## Minor Observations

- 图注依赖负 margin，遇到不同媒体比例容易错位。
- 远程字体没有 `font-display: swap`，慢网首屏可能跳字。
- 除 Plant Bot 外，多数折叠以下图片没有 `loading="lazy"`。
- 文档级 h1 是作者名而不是项目名，项目标题是 h2；语义上应让项目名成为每页 h1。
- 页面结尾缺少上一个/下一个项目和明确收束。

## Questions to Consider

- 每个项目最希望招聘者在十秒后记住哪一条证据？
- 双视频是否提供不同证据，还是重复同一个主张？
- 详情页应优先强化“创意叙事”，还是“招聘者快速扫描”？推荐以扫描为骨架、叙事为深度。
