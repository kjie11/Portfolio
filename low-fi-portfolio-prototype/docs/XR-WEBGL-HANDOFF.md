# XR WebGL 流体折射交接文档

更新日期：2026-08-11  
工作分支：`main`  
项目目录：`D:\Portfolio\low-fi-portfolio-prototype`

## 1. 当前状态

XR 板块已经从自定义黑色烟雾叠层改为 Lusion 风格的 ScreenPaint 后处理：先把交互球背景和五张卡片绘制到同一张离屏场景纹理，再使用鼠标速度场对完整场景做九次连续采样。笔触经过卡片时，会直接拉伸卡片本身的橙色、青色和暗部像素。

当前实现保留了以下既有功能：

- XR 标题播放完成后，需要再次滚动才触发撕纸。
- 撕纸完整展开、sticky 停驻以及上下离场反播。
- 五张卡片弹出、鼠标凝视、局部受笔触影响和详情页导航。
- 交互球背景及其鼠标响应。
- DOM 卡片继续承担点击和键盘交互。
- 触摸设备和 `prefers-reduced-motion` 不启用 ScreenPaint。

本轮没有新增第三方依赖或公共 API。

## 2. 参考站结论

参考页面：`https://lusion.co/projects/of_the_oak`

参考公开 bundle：`https://lusion.co/_astro/hoisted.CUO_IjfL.js`

关键结论：Lusion 不维护一张独立的“烟雾颜色历史”纹理。它先完成整个 WebGL 场景的渲染，再把 ScreenPaint 作为末端后处理。卡片或媒体的颜色之所以能被拖走，是因为折射采样直接读取完整场景 framebuffer。

提取到的核心参数：

| 参数 | 数值 |
| --- | ---: |
| `minRadius` | `0` |
| `maxRadius` | `100` |
| `radiusDistanceRange` | `100` |
| `pushStrength` | `25` |
| `velocityDissipation` | `.975` |
| `weight1Dissipation` | `.95` |
| `weight2Dissipation` | `.8` |
| `curlScale` | `.02` |
| `curlStrength` | `3` |
| `distortionAmount` | `3` |
| `distortionMultiplier` | `5` |
| `rgbShift` | `.5` |
| `colorMultiplier` | `10` |
| `shade` | `1.25` |

显示阶段的核心逻辑是：读取 RGBA 速度/权重场，计算位移，沿位移方向连续采样完整场景九次并取平均，再在速度最强的窄折线处加入相位错开的 RGB 高光。

## 3. 本地渲染架构

```text
鼠标轨迹
   |
   v
RGBA ScreenPaint 速度/双权重场（1/4 分辨率，ping-pong）
   |
   +--> 低频模糊反馈场（1/8 分辨率）
   |
   v
完整离屏场景 framebuffer
   |- 实时交互球背景
   |- Abyss
   |- Emotional Mask
   |- AR Escape Room
   |- Speaking World
   `- AR Graffiti
   |
   v
9 次场景折射采样 + RGB 窄折线
   |
   v
XR 全屏 WebGL canvas
```

重要约束：不要重新加入独立的颜色反馈 framebuffer，也不要给笔触叠加固定黑色、炭灰或不透明烟雾颜色。此前视觉发黑和颜色不跟随卡片的主要原因就是这两类旁路。

## 4. 关键文件

| 文件 | 作用 |
| --- | --- |
| `index.html` | 页面、iframe `srcdoc`、XR CSS、撕纸时间线、卡片动画、球背景和 ScreenPaint 全部实现 |
| `assets/xr-webgl-data.js` | 适配 `file://` 的卡片预览和天空纹理内嵌数据 |
| `assets/xr-abyss.jpg` | Abyss 卡片纹理 |
| `assets/xr-emotional-mask.jpg` | Emotional Mask 卡片纹理 |
| `assets/xr-ar-escape-room.png` | AR Escape Room 卡片纹理 |
| `assets/xr-speaking-world.png` | Speaking World 卡片纹理 |
| `assets/xr-ar-graffiti.png` | AR Graffiti 卡片纹理 |
| `qa_xr_tear.mjs` | XR 入场、撕纸、sticky、凝视、WebGL、详情导航和移动端 QA |
| `docs/research/components/xr-smoke-distortion.spec.md` | ScreenPaint 设计与实现规格 |
| `qa-xr-tear/local-card-drag.png` | 卡片颜色被折射拖出的定向视觉验证截图 |

## 5. `index.html` 代码入口

当前行号会随编辑变化，接手时优先按标识搜索：

| 搜索标识 | 当前约在 | 说明 |
| --- | ---: | --- |
| `const xrSmoke =` | `3619` | WebGL 状态与 framebuffer 引用 |
| `const initXrSmoke` | `3779` | shader 编译与初始化 |
| `xrSmoke.displayProgram` | `4050` 附近 | Lusion 风格九采样显示 shader |
| `const renderXrSmokeScene` | `4398` | 交互球和五张卡片绘制进完整场景 |
| `const getXrTrailRadiusCss` | `4521` | 当前最大笔触半径 `100px` |
| `const updateXrSmokeField` | `4522` | 速度、双权重、卷曲和衰减更新 |
| `const displayXrSmoke` | `4720` | 完整场景末端折射输出 |
| `const renderXrSmoke =` | `4763` | 每帧执行顺序和停止条件 |
| `const seedXrSmoke` | `4851` | 连续 Catmull-Rom 鼠标路径输入 |
| `const renderXrMotion` | `5531` | 卡片弹出、凝视和局部笔触影响组合 |

运行时可通过 `canvas[data-rq-xr-smoke].dataset` 检查关键状态：

```text
renderer       = webgl-screen-paint
material       = lusion-screen-paint-distortion
colorTransport = late-full-scene-distortion
sceneMode      = full-framebuffer
sceneBackground= interactive-sphere-canvas
sceneSync      = same-frame-sphere
```

## 6. 生命周期

1. XR 未完全撕开时，canvas 清空并隐藏，鼠标不会注入轨迹。
2. 纸张释放且卡片开始出现后，ScreenPaint 才启用。
3. 鼠标移动时，连续路径写入 RGBA 反馈场。
4. 同一帧先刷新交互球，再把球和五张卡片绘制到离屏场景。
5. 显示 shader 对完整场景进行九次折射采样。
6. WebGL 正在呈现时，DOM 卡片视觉内容透明，但元素仍保留点击和键盘能力。
7. 鼠标离开或 XR 反播时，停止注入并加速衰减。
8. 能量低于 `.006` 后清空 canvas、恢复 DOM 卡片视觉并停止动画帧。

## 7. 性能边界

- 显示 canvas 的 DPR 上限为 `1.5`。
- 主反馈场为显示尺寸的 `1/4`，上限 `640 x 384`。
- 低频反馈场为显示尺寸的 `1/8`，上限 `320 x 192`。
- 只在 `(hover: hover) and (pointer: fine)` 且未启用减少动态效果时运行。
- canvas 始终使用 `pointer-events: none`。
- 没有能量和待处理轨迹时不保留后台 `requestAnimationFrame`。

## 8. 验证结果

已通过：

- iframe 内 6 段脚本可被 JavaScript 解析器编译。
- `assets/xr-webgl-data.js` 与 `qa_xr_tear.mjs` 通过 `node --check`。
- `git diff --check` 通过，仅有 Git 的 LF/CRLF 提示。
- WebGL 主反馈场、低频场、九采样材质和 `100px` 最大半径断言通过。
- 五张卡片全部进入完整场景 framebuffer。
- 交互球背景在同一帧同步进入折射场景。
- 卡片邻近影响、颜色拖动、鼠标离开消散和停止渲染断言通过。
- 移动端不启用凝视和 ScreenPaint。
- XR 卡片键盘详情导航通过。

定向视觉验证截图：`qa-xr-tear/local-card-drag.png`。截图中 AR Graffiti 的青色和暗部像素被拖到卡片外，证明颜色来自场景采样，不是固定笔触颜色。

完整 QA 当前最后失败在独立的拍立得横向吸附断言：

```text
Polaroid wheel motion did not settle on the centered card
```

该失败位于 `qa_xr_tear.mjs` 末尾的拍立得测试，不属于 XR WebGL 改动。不要为了让 XR 任务显示全绿而放宽该断言；应单独检查拍立得滚动停止时间和 `is-centered` 更新逻辑。

## 9. 运行命令

本地服务器当前运行在：

```text
http://127.0.0.1:4185/index.html
```

启动它的 Python 进程在交接时为 PID `71792`。如果进程已不存在，可在项目目录启动新的静态服务器并换用空闲端口。

项目目录没有安装 Playwright。运行完整 QA 时使用 Codex 桌面自带依赖：

```powershell
$env:NODE_PATH='C:\Users\brainco\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules'
& 'C:\Users\brainco\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' qa_xr_tear.mjs
```

快速语法检查：

```powershell
node --check assets/xr-webgl-data.js
node --check qa_xr_tear.mjs
git diff --check
```

## 10. 工作区注意事项

当前工作区是脏的，包含用户历史改动、XR 素材和多张 QA 截图。不要执行 `git reset --hard`、`git checkout --` 或批量删除截图。提交前应逐项确认变更归属。

本轮相关但尚未跟踪的核心文件包括五张 `assets/xr-*` 项目图、`assets/xr-webgl-data.js` 以及新生成的 QA 截图。它们是当前 `file://` 和 WebGL 卡片取色路径的一部分，不应误删。

## 11. 已知差距

当前逻辑已经对齐 Lusion 的末端完整场景折射方式，但不应宣称二进制级 1:1：

- 本地使用程序化 hash 近似 blue-noise，未确认与参考站使用同一张噪声纹理。
- 本地运行在独立的 `requestAnimationFrame` 循环，不是 Lusion 的完整主渲染时钟。
- 参考站的全局色调映射、抗锯齿和可能的后处理链没有完整复制。
- 本地场景内容、亮度和对比度与参考站不同，同一折射 shader 的主观观感仍会不同。

## 12. 建议接手顺序

1. 先在 `http://127.0.0.1:4185/index.html` 完整走一次标题、撕纸和卡片弹出流程。
2. 从 Emotional Mask 或 AR Graffiti 卡片内部快速拖向空白背景，确认颜色跨出卡片边界。
3. 使用 `$web-shader-extractor` 再核对参考站实际 blue-noise 资源、uniform 更新频率和最终后处理顺序。
4. 如需继续提高相似度，优先替换噪声采样和对齐渲染时钟，不要重新引入固定黑色烟雾。
5. 在集成显卡和高 DPR 屏幕上记录帧时间，再决定是否降低 framebuffer 上限。
6. 将拍立得吸附失败作为独立任务处理，避免与 XR shader 调参混在一起。

