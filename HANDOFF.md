# Portfolio 项目交接文档

更新时间：2026-08-14  
项目目录：`C:\Users\25727\Desktop\秋招\Portfolio`

## 1. 当前状态

- 主页：`index.html`
- 公共样式：`css/style.css`
- 主页目前有 **15 张主项目卡片**，保持现有顺序，不要移动或删除。
- 主项目网格下方已有独立的 **Side Work** 板块，目前是占位状态；Side Work 用来放其他内容，不是用来收纳现有项目。
- 当前工作区有大量尚未提交的有效修改。**不要执行 `git reset --hard`、`git checkout -- .` 或其他整批回退命令。**
- 修改前先看 `git status --short`；只编辑本次任务涉及的文件，并保留无关改动。

当前主页项目顺序：

1. Pizza Delivery
2. AugSoc AR Creation Research
3. ABYSS
4. Gothic Hunter
5. Speaking World
6. Plant Bot
7. AR Escape Room
8. Magic Bus
9. White Lavender
10. Hand-Input Claw Machine
11. Cat Teaser 2D
12. Four-Way Kitchen
13. Mole Rhythm
14. Neon BeatRunner
15. Emotional Mask

## 2. 新增普通项目卡片

在 `index.html` 的 `.gallery-grid` 内、用户指定的位置加入卡片。不要把项目放进 `.side-work`，除非用户明确说它属于 Side Work。

```html
<!-- Project Name -->
<a href="project-projectName.html" class="project-item">
    <div class="img-wrapper">
        <img src="images/project-cover.jpg" alt="准确描述图片内容">
        <span class="project-shade" aria-hidden="true"></span>
        <span class="project-overlay">
            <strong class="project-title">Project Name</strong>
            <span class="project-role">简短说明职责、技术或项目重点</span>
        </span>
    </div>
</a>
```

现有卡片比例和 hover 蒙层由 `css/style.css` 中的 `.gallery-grid`、`.img-wrapper`、`.project-overlay` 等公共样式负责，不要为单张卡重复写样式。

## 3. 新增带 hover 视频的项目卡片

优先使用本地 MP4，不使用 YouTube iframe 充当主页 hover 视频。将短预览视频放入 `videos/`，封面放入 `images/`。

```html
<!-- Project Name -->
<a href="project-projectName.html" class="project-item preview-card">
    <div class="img-wrapper">
        <img src="images/project-cover.jpg" alt="准确描述图片内容">
        <video class="hover-preview" muted loop playsinline preload="none"
               data-src="videos/project-preview.mp4" aria-hidden="true"></video>
        <span class="project-shade" aria-hidden="true"></span>
        <span class="project-overlay">
            <strong class="project-title">Project Name</strong>
            <span class="project-role">简短说明职责、技术或项目重点</span>
        </span>
    </div>
</a>
```

主页底部已有原生 JavaScript，行为如下：

- 鼠标进入或键盘聚焦时才加载并播放视频。
- 鼠标离开或失焦后暂停并回到开头。
- 默认静音、循环播放。
- 触屏设备和开启“减少动态效果”的用户不会自动播放。

不要再引入 GSAP 或新增一套 hover 脚本。

当前已有主页 hover 预览的项目：

- Pizza Delivery：`videos/pizza-delivery.mp4`
- ABYSS：`videos/abyss-preview.mp4`
- Gothic Hunter：`videos/gothic-hunter-preview-with-audio.mp4`（主页仍静音）
- Plant Bot：`videos/plant-bot-preview.mp4`
- Hand-Input Claw Machine：`videos/claw-machine-hover.mp4`
- Mole Rhythm：`videos/mole-rhythm-preview.mp4`

## 4. 详情页顶部预览视频

带预览视频的详情页在 `<head>` 引入：

```html
<script src="js/detail-preview.js" defer></script>
```

并在 `.project-content` 最上方使用：

```html
<video class="detail-preview" autoplay muted loop playsinline controls
       preload="metadata" poster="images/project-cover.jpg"
       aria-label="Project Name preview" tabindex="0">
    <source src="videos/project-preview.mp4" type="video/mp4">
    Your browser does not support this video preview.
</video>
```

现有交互：

- 默认自动播放、循环、静音。
- 桌面端 hover 或键盘聚焦时显示原生控制条。
- 用户可点击取消静音并播放声音。
- 手机端保留原生控制条。
- 尺寸、圆角和响应式布局统一由 `.project-content > .detail-preview` 控制。

参考实现：

- `project-pizzaDelivery.html`
- `project-detail.html`（ABYSS）
- `project-gothicHunter.html`
- `project-plantBot.html`
- `project-handInputClaw.html`
- `project-moleRhythm.html`

## 5. YouTube 注意事项

直接用 `file:///` 打开网页时，YouTube iframe 可能显示错误 153。这通常是 YouTube 对本地文件来源的限制，不是容器尺寸问题。

- 已有本地兼容脚本：`js/youtube-local-preview.js`
- 在 `file:` 环境下，它会把 YouTube iframe 替换为封面和“去 YouTube 观看”的链接。
- 正式通过 HTTP/HTTPS 部署时，iframe 可以正常保留。
- 如需本地完整测试，建议在 Portfolio 目录运行本地服务器，而不是只用 `file:///`。

## 6. Side Work 约束

`index.html` 中 `.side-work` 位于主项目 `.gallery-grid` 之后。当前仅有标题、说明和空状态。

- 新 Side Work 内容只加入 `.side-work`。
- 不要移动当前 15 个主项目到 Side Work。
- 用户提供真实图片、视频、标题和链接后，再把 `.side-work-empty` 替换为真实内容。
- 不虚构 Side Work 项目、类别、成果或职责。
- 沿用网站的黑、白、灰和橙色强调色，保持桌面与手机端适配。

## 7. 新增项目的推荐流程

1. 确认项目名、插入位置、详情页文件名、封面图、预览视频和正文素材。
2. 把素材复制到 `images/` 和 `videos/`，使用英文小写文件名和连字符。
3. 在 `.gallery-grid` 指定位置新增卡片，不改动其他卡片顺序。
4. 新建或更新对应详情页。
5. 有本地视频时复用 `preview-card`、`hover-preview`、`detail-preview` 和现有脚本。
6. 检查主页项目数量、顺序、链接、视频路径和详情页返回链接。
7. 用桌面端和 390px 左右手机宽度测试，确认没有横向滚动。
8. 运行 `git diff --check`，但不要回退其他未提交修改。

## 8. 验收标准

- 现有 15 个主项目未被移动、删除或重命名，除非用户明确要求。
- 新卡片位于用户指定位置，点击能进入正确详情页。
- 封面加载正常，alt 文本准确。
- 有预览视频的卡片：桌面 hover 可播放、默认静音、离开后复位。
- 详情页顶部视频：自动静音播放，用户可通过控制条开启声音。
- 手机端为单列，无横向溢出。
- Side Work 与主项目保持独立。
- 不新增不必要的依赖、动画库或重复脚本。

## 9. 可复制到新对话的任务说明

```text
请继续维护 C:\Users\25727\Desktop\秋招\Portfolio。
先完整阅读 HANDOFF.md，再检查 git status --short。
当前工作区包含未提交的有效修改，不要使用 git reset、git checkout 或覆盖无关文件。
保留主页现有 15 个主项目及其顺序；Side Work 是独立区域，不要把主项目移动进去。
接下来我会提供新项目的标题、插入位置、封面、预览视频和详情内容。请复用现有卡片 hover 视频与详情页 detail-preview 的实现，并验证桌面端和手机端。
```
