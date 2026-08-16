# 低保真作品集原型 · 简短交接

日期：2026-08-17  
目录：`low-fi-portfolio-prototype/`  
和正式站点（上级 `Portfolio/`）隔离，先在这里改交互，再考虑合入。

## 怎么跑

```powershell
python -m http.server 8766
```

打开 `http://127.0.0.1:8766/index.html`。  
YouTube 嵌入、XR 全景需要 HTTP；`file://` 直接打开没有 Referer，详情页会报错误 153，代码修不了这个。

## 结构

`index.html` 外层只是壳：真正页面在 **sandbox iframe 的 srcdoc** 里。改首页文案/XR/hover，改的是这段被 HTML 实体编码的 srcdoc，不是外层那几行。

详情页是运行时注入进 iframe 的：

| 文件 | 作用 |
| --- | --- |
| `assets/creative-detail-data.js` | 项目文案、图片、YouTube 链接 |
| `assets/creative-detail-clone.js` | 详情页 DOM / 打开关闭 / YouTube iframe |
| `assets/creative-detail-clone.css` | 详情页样式（可读源） |
| `assets/creative-detail-style.js` | 同上 CSS 的注入版，**改样式两边都要改** |

XR 流体折射另见 `docs/XR-WEBGL-HANDOFF.md`（其中「标题后需再滚一次才撕纸」已过时）。

## 本轮已定行为（不要改回去）

1. **XR 标题 hover**：球面/鱼眼背景仍随 hover 切换。标题旁**不要**再出现小预览窗或预览视频。实现：`.xr-project > img` 隐藏；hover 视频只挂 `.rq-polaroid-image` / `.rq-media`，跳过 `.xr-project`。
2. **XR 撕纸**：从上下任一方向进入时，标题播完且舞台到达视口顶部后立即自动撕开。标题还在时继续往下滚，不要跳过动画。QA：`qa_xr_tear.mjs`。
3. **Plant Bot / AR Graffiti 首页卡**：与 Pizza 同一套 100vw + `display: contents` 折页布局。封面：Graffiti `assets/xr-ar-graffiti.png`，Plant Bot `../images/plant-bot-cover.png`。
4. **Sidework**：正式站 `#side-work` 四项。首页卡：Emotional Mask、Cascadeur Motion Capture、Unreal Engine VFX Practice、After Class。XR 里的 Emotional Mask 保留。文案和资源见 `docs/SIDEWORK-HANDOFF.md`。
5. **Back to Index**：默认空心描边。仅 hover 从右向左填黑。不要给 `:focus-visible` 加填充（打开详情页会自动 focus，否则一进来就是实心黑）。
6. **详情页 YouTube**：所有项目统一走 `creative-detail-clone.js` 的 `renderVideo()`。HTTP 下用带 Referer、播放 `allow` 和 `origin` 的 iframe；`file://` 无法提供 YouTube 要求的 Referer，因此和正式站一样显示可点击的 YouTube 缩略图，不再展示错误 153。内层 CSP 的 `img-src` 必须保留 `https://i.ytimg.com`。

## 接着改时注意

- 改 srcdoc 时引号写成 `&quot;`、`&#x27;`，外层 CSP 和内层 CSP 各改一次。
- 详情页封面/视频路径有的指向 `../images`、`../videos` 或 `127.0.0.1:4389`，合入正式站前要换成相对路径。
- 不要给 XR 标题重新挂 preview video。
