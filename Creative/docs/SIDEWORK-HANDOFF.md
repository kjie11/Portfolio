# Sidework 内容交接

日期：2026-08-17  
来源：正式站 `Portfolio/index.html` 的 `#side-work`  
目标：低保真 `low-fi-portfolio-prototype/` 的 `.rq-playground` 区块  
原则：只搬文案、封面、预览视频、详情；低保真仍用现有 3 列 `.rq-project` 卡片，不改正式站布局。

## 正式站 Side Work 区块

标题：`Side Work`  
说明：`Independent experiments, visual studies, and smaller pieces, kept separate from the project archive above.`

首页 4 张卡，顺序如下。

| # | 正式站标题 | 首页副标题 | 封面 | Hover 预览 | 详情页 |
| --- | --- | --- | --- | --- | --- |
| 1 | Emotional Mask | Global Game Jam 2026 | `images/emotionalMask.jpg` | 无 | `project-emotionalMask.html` |
| 2 | Cascadeur Motion Capture | Video-based motion capture practice in Cascadeur | `images/cascadeur-cover.png` | `videos/cascadeur.mp4` | `project-cascadeur.html` |
| 3 | Unreal Engine VFX Practice | VFX practice from my Unreal Engine learning | `images/ue-vfx-cover.png` | `videos/ue-vfx.mp4` | `project-ueVfx.html` |
| 4 | After Class | Immersive escape room, RFID interaction, and dual projection | `images/after-class-cover.png` | `videos/after-class-preview.mp4` | `project-afterClass.html` |

低保真路径写成 `../images/...` 和 `../videos/...`（和 Plant Bot 同一套上级资源）。

## 详情原文

### 1. Emotional Mask

低保真 XR 区已经有这张卡和详情，Sidework 只补首页卡，详情不重写。

- 摘要：VR team prototype created for Global Game Jam 2026, connecting gesture triggers, level flow, and narrative interaction.
- 贡献：gesture-trigger mechanisms, level logic, interactive narrative content.
- Key Features：gesture-triggered interactions connected to level events；level logic supporting the playable flow；narrative interaction content built within the Jam scope.
- Design Focus：Keep gesture input tied to the level flow；Control scope around a playable team prototype；Separate my recorded contribution from the wider team delivery.
- 视频：`https://www.youtube.com/watch?v=AvCc4186Ol4`

### 2. Cascadeur Motion Capture

- 摘要：A video-based motion capture exercise in Cascadeur, exploring how recorded movement can be translated into editable character animation.
- 第二段：The practice focused on reviewing the captured motion against the source video, then refining poses and timing on the animation timeline.
- Practice Focus：Using recorded video as the motion reference；Reviewing captured movement on a 3D character；Refining poses and timing in Cascadeur.
- 详情媒体：本地 `videos/cascadeur.mp4`，poster `images/cascadeur-cover.png`。无 YouTube。

### 3. Unreal Engine VFX Practice

- 摘要：A real-time VFX practice piece created as part of my Unreal Engine learning.
- 第二段：The exercise focused on testing how the effect reads in motion and against the lighting, water, and scale of the surrounding scene.
- Practice Focus：Building and reviewing a real-time effect in Unreal Engine；Testing the effect within an environmental scene；Evaluating motion, scale, and visual readability during runtime.
- 详情媒体：本地 `videos/ue-vfx.mp4`，poster `images/ue-vfx-cover.png`。无 YouTube。

### 4. After Class

- 摘要：Single-room immersive escape room built around Die Xian, a Taiwanese folkloric ritual for communicating with spirits. Players enter an ordinary classroom and reconstruct the story of a deceased student through sequential puzzles, physical props, diaries, and projected narrative.
- 第二段：Two-phase emotional arc: a familiar classroom gradually becomes an uncanny horror environment, while the ghost story reveals an underlying narrative about school bullying and its consequences.
- Full Experience Video：`https://www.youtube.com/embed/275NSp7rIuA`
- Experience Design：three schoolbags linear puzzle flow；answer sheet goal (student, cause of death, time of death)；UV clues, diaries, body model, ritual objects, medication；Stage 1 ritual via wall and desk projections.
- Technical System：Unity 3D wall projection；Python / Py5 2D Die Xian desk projection；RFID in four key props；COGS + Media Master.
- My Contribution：projector testing and technical setup；software flow and trigger sequence testing；Stage 1 digital-number puzzle cards.
- Testing：seven-person playtest, 3 game-design students vs 4 others (~30–40 min vs ~1 hour). Iterations: opening puzzle, visual cues, UV ritual instructions, staff hint system.
- Showcase：eight groups of 3–5；about half finished in 50 minutes；strongest response on atmosphere shift and RFID projections；remaining issues: puzzle clarity, colour in low light, narrative-to-number links.
- Evidence note：team assignment report dated 24 June 2026.
- 详情头图：本地 `videos/after-class-preview.mp4`，poster `images/after-class-cover.png`。

## 低保真对应

| 正式站 | 低保真 `data-rq-detail-project` | 首页 | 详情 |
| --- | --- | --- | --- |
| Emotional Mask | `emotional-mask` | Sidework 新卡；XR 原卡保留 | 沿用现有 `creative-detail-data.js` |
| Cascadeur Motion Capture | `cascadeur` | 新卡 + hover 视频 | 新详情 |
| Unreal Engine VFX Practice | `ue-vfx` | 新卡 + hover 视频 | 新详情 |
| After Class | `after-class` | 新卡 + hover 视频 | 新详情 |

换下来的旧 Sidework 6 项（EMG Gesture Ninja、VR Interaction、Wearable Game、WebXR Gallery、White Lavender、Magic Bus）只从首页拿掉，详情数据先留着。

区块标题仍用低保真的 `Sidework`。说明改成正式站那句 Independent experiments…。
