# 创意版预览视频迁移交接

更新时间：2026-08-15

## 目标

继续把 `D:\Portfolio\index.html` 中各项目卡片的预览视频，一一对应迁移到：

`D:\Portfolio\创意版预览\creative-site-framework.html`

保留创意版现有布局、项目顺序和详情页链接，不改参考首页。

## 当前状态

- 原首页 17 个项目已全部映射；创意版另保留 3 个额外项目，共 20 个归档入口。
- 本轮补入了 `Duck Trombone Champion`，链接 `../project-duckTrombone.html`，视频 `../videos/duck-trombone-preview.mp4`。
- 创意版目前已有预览视频：Duck Trombone、Claw Machine。
- 预览逻辑已统一作用于含 `.item-preview` 的卡片，无需新增第二套脚本。
- 桌面端已确认：7 张 Body as Interface 卡片、20 个归档入口、Duck 跳转正确、无根级横向溢出、控制台无错误。
- 当前内置浏览器未成功切换到 390px，迁移完成后仍需补做手机端验证。

## 可迁移的视频

源首页现有视频位于 `D:\Portfolio\videos`：

- Pizza Delivery：`pizza-delivery.mp4`
- AR Graffiti / AugSoc：`ar-graffiti-preview.mp4`
- Abyss：`abyss-preview.mp4`
- Gothic Hunter：`gothic-hunter-preview-with-audio.mp4`
- Speaking World：`speaking-world-preview.mp4`
- Plant Bot：`plant-bot-preview.mp4`
- AR Escape Room：`ar-escape-room-preview.mp4`
- Magic Bus：`magic-bus-preview.mp4`
- Duck Trombone：`duck-trombone-preview.mp4`（已迁移）
- Claw Machine：`claw-machine-hover.mp4`（已迁移）
- Cat Teaser：`cat-teaser-preview.mp4`
- Mole Rhythm：`mole-rhythm-preview.mp4`
- EMG Ninja：`emg-ninja-preview.mp4`

创意版位于子目录，引用父目录视频时使用 `../videos/文件名`，无需复制视频文件。

## 实现约束

- 只修改 `D:\Portfolio\创意版预览\creative-site-framework.html`，除非用户明确扩大范围。
- 保留工作区已有未提交修改，不要 reset 或覆盖低保真版本。
- 视频保持 `muted loop playsinline`；普通预览优先 `preload="none"` 与 `data-src` 延迟加载。
- 桌面 hover/键盘聚焦时播放，离开或失焦时暂停并复位；触屏和 `prefers-reduced-motion` 不依赖自动 hover。
- 复用现有 `.item-preview`、`.is-previewing` 和 `previewCards` 逻辑，不加依赖、不重做布局。
- 只给创意版中确实存在且对应正确的项目加视频，不虚构素材或项目。

## 最小验收

检查桌面和约 390px 手机宽度：视频能播放并复位、卡片仍可进入正确详情页、控制台无错误、页面无根级横向溢出；最后运行：

`git diff --check -- "创意版预览/creative-site-framework.html"`

## 给新对话

> 请先阅读 `D:\Portfolio\创意版预览\CHAT-HANDOFF.md`，再把 `D:\Portfolio\index.html` 中已有的项目预览视频一一对应迁移到创意版。保留现有布局和所有未提交修改，只修改交接文档指定的目标文件，并按“最小验收”检查。
