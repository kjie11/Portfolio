# Lusion ScreenPaint 笔触差距与复刻顺序

核对页面：`https://lusion.co/projects/of_the_oak`  
本地页面：`http://127.0.0.1:4185/index.html`  
核对日期：2026-08-11

## 结论

当前实现的“大架构”是对的：完整场景先进入 framebuffer，再由 ScreenPaint 在末端做九次折射采样。主要差距不再是颜色来源，而是笔触场的半径语义、低频反馈核、逐帧噪声和末端抗锯齿。

视觉上，Lusion 的笔触更像连续、柔软、会膨胀回卷的液膜；本地更像边缘带固定颗粒的横向擦拭。以下四项直接解释这个差别。

| 优先级 | 差距 | Lusion 源码事实 | 当前本地 | 视觉影响 |
|---|---|---|---|---|
| P1 | 半径输入语义 | 使用当前帧鼠标像素位移，映射 `0..100 -> 0..maxRadius`；`maxRadius = max(40, viewportWidth / 20)` | 使用累计 `xrSmoke.travel`，最大值固定 `100px` | 本地移动一段距离后很快长期满半径，慢速与快速笔触缺少宽窄呼吸 |
| P1 | 低频反馈模糊 | 1/8 分辨率，横纵各九采样；权重 `.1633/.1531/.12245/.0918/.051`，步长为 2 texel | 五采样 `.34/.24/.09`，只取 0/4/8 texel | 本地边缘更硬、更分层，卷曲形成条带而不是厚软的膜 |
| P1 | Blue-noise | `128 x 128` `LDR_RGB1_0.png`，nearest + repeat，每帧随机偏移 UV | `gl_FragCoord` 静态 hash，不随帧变化 | 本地颗粒固定在屏幕上，形成可见的砂砾/锯齿；Lusion 的颗粒在时间上抖散 |
| P2 | 末端 AA | ScreenPaint render order `75`，PostUfx `100`，SMAA `500` | distortion 直接输出到 canvas，无后置 SMAA | RGB 窄折线和大位移边缘更锯齿、更黑硬 |
| P2 | 渲染时钟 | 单一全局 RAF；`deltaSeconds = min(frameDelta, .05)`；blue-noise、ScreenPaint、场景、后处理同帧更新 | 独立、可停止 RAF；部分参数用 60fps frameScale 近似 | 活跃时基本接近，但慢帧、重启首帧和噪声节奏仍不同 |
| P3 | 场景后处理 | 条件 Bloom/Final/PreUfx -> ScreenPaint -> PostUfx -> SMAA -> 可选 FSR | XR 自有场景 -> ScreenPaint -> canvas | 同一 shader 在不同亮度、对比和边缘能量下观感仍会不同 |

## 已确认的源码事实

- 主目标是固定全屏 `#canvas`，页面标注 `data-engine="three.js r158"`。公开 bundle 将这个元素直接传给 `new WebGLRenderer({ canvas, premultipliedAlpha: false })`。
- Three.js 渲染器关闭原生 antialias，使用后置 SMAA。主 canvas 在 1440x900 视口下的 backing size 是 2160x1350，也就是 1.5 倍。
- ScreenPaint 主反馈场为渲染尺寸的 1/4，低频场为 1/8。
- 更新 shader 的低频反向平流、curl noise、RGBA 速度/双权重结构与当前本地实现方向一致。
- 折射 shader 的 9 次场景采样、RGB 相位高光以及 `amount=3`、`multiplier=5`、`rgbShift=.5`、`colorMultiplier=10` 已对齐。
- Lusion 的 blue-noise 不是程序化 hash。真实资源已保存在 `evidence/assets/LDR_RGB1_0.png`，SHA-256 为 `11AD7FA715AE19F6E18E9AD2065622D79A2ACCEB31E56F7CB1837D764E97ACEC`。
- `flip_texture.png` 与 ScreenPaint 无关，它属于页面底部的 flip/shape 效果；不要误接进笔触。

## 推荐复刻顺序

1. 先修正半径语义：去掉累计 `travel` 对半径的控制，改为当前待绘制 segment 的像素长度；最大半径使用 `max(40, stageWidth / 20)`。这是形态差异最大的单点。
2. 把低频 blur 改成 Lusion 的精确九采样核。保留当前 1/8 framebuffer，不需要增加新反馈层。
3. 加载真实 `LDR_RGB1_0.png`，使用 `NEAREST` + `REPEAT`；每个活动帧更新一个随机 `vec2` 偏移。资源未加载成功时才回退到当前 hash。
4. 在 distortion 后加 SMAA。若先做轻量验证，可临时用 FXAA 判断“锯齿是否为主要剩余差距”，但 FXAA 只能标为近似，最终 1:1 仍应移植 bundle 中的 SMAA 三 pass 和两张查找纹理。
5. 把活动期时间统一成秒：`dt = min((now-lastNow)/1000, .05)`。用同一个 `dt` 驱动速度注入、衰减和场景更新；空闲停 RAF 可以保留，不影响目标形态。
6. 最后再比较色调映射与亮度。不要通过加黑色烟雾、提高 RGB 折线强度或额外颜色历史纹理来掩盖前四项。

## 验收方式

- 同一 1440x900 视口，从低对比背景快速斜划 500px，分别截取输入后 0ms、250ms、1200ms。
- 快划时最大宽度约 72px；慢划应明显更细，停止后不应因为累计路程继续保持最大半径。
- 边缘颗粒应随帧变化而消散，静态截图仍有细微 noise，但连续播放时不能粘在屏幕坐标上。
- 折线边缘在 SMAA 后应连续，不能出现本地截图中 AR Graffiti 左缘那种密集黑色像素栅格。
- 卡片颜色仍需跨出卡片边界；若修正后颜色不再跨界，说明完整场景 framebuffer 路径被破坏，应回退而不是重新加固定笔触颜色。

## 证据位置

- 参考初始帧：`evidence/screenshots/source-loaded-1440x900.png`
- 参考快速划动：`evidence/screenshots/pointer-sweep-1440x900.png`
- 参考 1200ms 衰减：`evidence/screenshots/pointer-decay-1200ms.png`
- canvas 清单：`evidence/dom/surface-inventory.json`
- 页面资源清单：`evidence/network/page-assets.json`
- 公开 bundle：`evidence/source/hoisted.CUO_IjfL.js`
- 真实 blue-noise 与 SMAA 纹理：`evidence/assets/`
- 本地对照帧：`../../../qa-xr-tear/local-card-drag.png`
