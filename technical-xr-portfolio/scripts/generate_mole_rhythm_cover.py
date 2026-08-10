from pathlib import Path
import math
import random

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "media" / "mole-rhythm-polaroid-cover.png"
S = 256

INK = (31, 22, 43)
SKY = (246, 139, 145)
SKY_LIGHT = (255, 168, 157)
MINT = (127, 203, 158)
MINT_LIGHT = (145, 217, 169)
VIOLET = (91, 65, 119)
TEAL = (48, 126, 128)
MOLE = (151, 91, 81)
MOLE_LIGHT = (202, 135, 112)
HOLE = (54, 38, 62)
GOLD = (236, 181, 73)
GOLD_LIGHT = (255, 220, 119)
RED = (235, 71, 77)
CREAM = (255, 244, 205)


def px_line(draw, points, fill, width=1):
    draw.line(points, fill=fill, width=width, joint="curve")


def star_points(cx, cy, outer, inner, count=10, rotation=-math.pi / 2):
    points = []
    for index in range(count * 2):
        angle = rotation + index * math.pi / count
        radius = outer if index % 2 == 0 else inner
        points.append((round(cx + math.cos(angle) * radius), round(cy + math.sin(angle) * radius)))
    return points


def draw_horizon(draw):
    draw.rectangle((0, 0, S, 70), fill=SKY)
    draw.rectangle((0, 0, S, 5), fill=(181, 125, 163))
    draw.rectangle((0, 8, S, 10), fill=SKY_LIGHT)
    draw.rectangle((0, 12, S, 13), fill=(208, 125, 156))

    far = [(0, 54), (12, 42), (25, 51), (39, 38), (55, 52), (73, 43), (90, 55),
           (108, 46), (126, 55), (143, 39), (161, 53), (178, 42), (195, 55),
           (215, 37), (231, 48), (256, 31), (256, 75), (0, 75)]
    near = [(0, 65), (20, 61), (38, 66), (59, 58), (78, 67), (99, 63), (118, 68),
            (140, 57), (160, 66), (180, 55), (202, 67), (224, 57), (240, 65),
            (256, 56), (256, 76), (0, 76)]
    draw.polygon(far, fill=VIOLET)
    draw.polygon(near, fill=TEAL)
    draw.rectangle((0, 70, S, S), fill=MINT)
    draw.rectangle((0, 70, S, 74), fill=MINT_LIGHT)

    rng = random.Random(52)
    for _ in range(32):
        x = rng.randrange(3, 253)
        y = rng.randrange(84, 246)
        if 111 < y < 211 and 14 < x < 243:
            continue
        color = TEAL if rng.random() > .35 else (103, 176, 143)
        px_line(draw, [(x, y), (x - 2, y - 4)], color)
        px_line(draw, [(x, y), (x + 2, y - 5)], color)


def draw_hole(draw, cx, cy, scale=1.0):
    rx, ry = round(19 * scale), round(7 * scale)
    draw.ellipse((cx - rx, cy - ry, cx + rx, cy + ry), fill=INK)
    draw.ellipse((cx - rx + 2, cy - ry + 2, cx + rx - 2, cy + ry - 1), fill=HOLE)
    draw.arc((cx - rx, cy - ry - 1, cx + rx, cy + ry), 190, 350, fill=(188, 142, 112), width=2)


def draw_mole(draw, cx, cy, expression, scale=1.0):
    def q(value):
        return round(value * scale)

    draw_hole(draw, cx, cy + q(12), scale)
    draw.ellipse((cx - q(13), cy - q(16), cx + q(13), cy + q(13)), fill=INK)
    draw.ellipse((cx - q(11), cy - q(15), cx + q(11), cy + q(12)), fill=MOLE)
    draw.ellipse((cx - q(7), cy - q(8), cx + q(7), cy + q(8)), fill=MOLE_LIGHT)
    draw.ellipse((cx - q(16), cy + q(7), cx - q(5), cy + q(14)), fill=INK)
    draw.ellipse((cx + q(5), cy + q(7), cx + q(16), cy + q(14)), fill=INK)
    draw.ellipse((cx - q(14), cy + q(8), cx - q(6), cy + q(13)), fill=MOLE_LIGHT)
    draw.ellipse((cx + q(6), cy + q(8), cx + q(14), cy + q(13)), fill=MOLE_LIGHT)

    eye_y = cy - q(6)
    if expression == "surprised":
        draw.rectangle((cx - q(7), eye_y - q(2), cx - q(4), eye_y + q(2)), fill=CREAM)
        draw.rectangle((cx + q(4), eye_y - q(2), cx + q(7), eye_y + q(2)), fill=CREAM)
        draw.point((cx - q(5), eye_y), fill=INK)
        draw.point((cx + q(5), eye_y), fill=INK)
    elif expression == "squint":
        px_line(draw, [(cx - q(8), eye_y), (cx - q(4), eye_y - q(2))], INK, max(1, q(2)))
        px_line(draw, [(cx + q(4), eye_y - q(2)), (cx + q(8), eye_y)], INK, max(1, q(2)))
    else:
        draw.rectangle((cx - q(7), eye_y - q(1), cx - q(5), eye_y + q(1)), fill=INK)
        draw.rectangle((cx + q(5), eye_y - q(1), cx + q(7), eye_y + q(1)), fill=INK)

    draw.rectangle((cx - q(1), cy - q(2), cx + q(1), cy), fill=INK)
    if expression == "sad":
        draw.arc((cx - q(5), cy + q(1), cx, cy + q(6)), 190, 320, fill=INK, width=max(1, q(2)))
        draw.arc((cx, cy + q(1), cx + q(5), cy + q(6)), 220, 350, fill=INK, width=max(1, q(2)))
    elif expression == "surprised":
        draw.ellipse((cx - q(3), cy + q(1), cx + q(3), cy + q(7)), fill=INK)
        draw.rectangle((cx - q(1), cy + q(2), cx + q(1), cy + q(3)), fill=RED)
    else:
        draw.arc((cx - q(5), cy - q(1), cx, cy + q(5)), 5, 120, fill=INK, width=max(1, q(2)))
        draw.arc((cx, cy - q(1), cx + q(5), cy + q(5)), 60, 175, fill=INK, width=max(1, q(2)))


def draw_impact(draw, cx, cy):
    draw.polygon(star_points(cx, cy, 34, 18, 12), fill=INK)
    draw.polygon(star_points(cx, cy, 30, 15, 12), fill=RED)
    draw.polygon(star_points(cx, cy, 22, 10, 10), fill=GOLD)
    draw.polygon(star_points(cx, cy, 13, 6, 9), fill=CREAM)
    for angle in (0.2, 1.1, 2.2, 3.3, 4.4, 5.4):
        x = round(cx + math.cos(angle) * 42)
        y = round(cy + math.sin(angle) * 42)
        draw.rectangle((x - 1, y - 1, x + 1, y + 1), fill=GOLD_LIGHT)


def draw_hammer(draw):
    # A descending frame, echoing the supplied three-pose hammer study.
    handle = [(154, 88), (160, 84), (188, 117), (182, 123)]
    draw.polygon(handle, fill=INK)
    draw.polygon([(157, 90), (160, 88), (185, 117), (182, 120)], fill=(127, 70, 52))
    head = [(139, 78), (150, 68), (171, 90), (161, 101)]
    draw.polygon(head, fill=INK)
    draw.polygon([(143, 79), (150, 72), (167, 90), (160, 97)], fill=(168, 119, 63))
    draw.polygon([(145, 73), (149, 69), (155, 75), (151, 79)], fill=GOLD_LIGHT)
    draw.polygon([(157, 96), (164, 88), (171, 94), (163, 103)], fill=GOLD)
    px_line(draw, [(174, 104), (185, 108)], GOLD_LIGHT, 2)
    px_line(draw, [(171, 99), (186, 100)], GOLD_LIGHT, 1)


def draw_rhythm_markers(draw):
    colors = [GOLD, RED, CREAM, RED, GOLD]
    for index, (x, y) in enumerate(((36, 121), (78, 107), (126, 100), (176, 107), (220, 121))):
        draw.rectangle((x - 3, y - 7, x + 3, y - 2), fill=INK)
        draw.rectangle((x - 2, y - 6, x + 2, y - 3), fill=colors[index])
        px_line(draw, [(x, y - 2), (x, y + 3)], INK, 2)
        if index < 4:
            px_line(draw, [(x + 5, y - 13), (x + 10, y - 13)], (209, 113, 126), 1)


def main():
    image = Image.new("RGB", (S, S), SKY)
    draw = ImageDraw.Draw(image)
    draw_horizon(draw)
    draw_rhythm_markers(draw)

    performers = [
        (36, 171, "calm", .82),
        (78, 158, "sad", .92),
        (126, 152, "surprised", 1.12),
        (176, 158, "squint", .92),
        (220, 171, "calm", .82),
    ]
    for performer in performers:
        draw_mole(draw, *performer)

    draw_impact(draw, 145, 128)
    draw_hammer(draw)

    # Sparse foreground bands anchor the square without competing with the cast.
    draw.polygon([(0, 230), (34, 226), (67, 234), (106, 229), (145, 237),
                  (188, 228), (223, 234), (256, 229), (256, 256), (0, 256)], fill=(95, 159, 136))
    draw.rectangle((0, 252, 256, 255), fill=VIOLET)

    image = image.resize((1024, 1024), Image.Resampling.NEAREST)
    image.save(OUT, "PNG", optimize=True)
    print(OUT)


if __name__ == "__main__":
    main()
