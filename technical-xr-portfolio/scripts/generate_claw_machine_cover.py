from pathlib import Path
import math
import random

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "media" / "claw-machine-cover.png"
SIZE = 1024
INK = (28, 24, 34)
NIGHT = (63, 80, 133)
PURPLE = (121, 88, 151)
BLUE = (67, 143, 199)
BLUE_LIGHT = (153, 198, 220)
PINK = (213, 132, 178)
PINK_LIGHT = (237, 183, 204)
YELLOW = (225, 176, 72)
CREAM = (244, 237, 218)
RED = (183, 74, 119)
GRAY = (159, 159, 170)


def wobble(points, amount=3, seed=0):
    rng = random.Random(seed)
    return [(x + rng.randint(-amount, amount), y + rng.randint(-amount, amount)) for x, y in points]


def polygon(draw, points, fill, width=7, seed=0):
    pts = wobble(points, 3, seed)
    draw.polygon(pts, fill=fill)
    draw.line(pts + [pts[0]], fill=INK, width=width, joint="curve")


def rect(draw, box, fill, width=7, radius=4):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=INK, width=width)


def ellipse(draw, box, fill, width=7):
    draw.ellipse(box, fill=fill, outline=INK, width=width)


def star(draw, center, outer, inner, fill, seed=0):
    cx, cy = center
    points = []
    for i in range(10):
        angle = -math.pi / 2 + i * math.pi / 5
        radius = outer if i % 2 == 0 else inner
        points.append((cx + math.cos(angle) * radius, cy + math.sin(angle) * radius))
    polygon(draw, points, fill, 8, seed)


def plush(draw, center, color, kind=0):
    cx, cy = center
    if kind == 0:
        ellipse(draw, (cx - 42, cy - 44, cx + 42, cy + 48), color, 6)
        ellipse(draw, (cx - 49, cy - 51, cx - 12, cy - 15), color, 5)
        ellipse(draw, (cx + 12, cy - 51, cx + 49, cy - 15), color, 5)
    else:
        ellipse(draw, (cx - 36, cy - 50, cx + 36, cy + 48), color, 6)
        draw.line((cx - 25, cy + 38, cx - 42, cy + 56), fill=INK, width=7)
        draw.line((cx + 25, cy + 38, cx + 42, cy + 56), fill=INK, width=7)
    ellipse(draw, (cx - 18, cy - 13, cx - 9, cy - 3), INK, 2)
    ellipse(draw, (cx + 9, cy - 13, cx + 18, cy - 3), INK, 2)
    draw.line((cx - 5, cy + 10, cx, cy + 14, cx + 5, cy + 10), fill=INK, width=4)


def main():
    image = Image.new("RGB", (SIZE, SIZE), NIGHT)
    draw = ImageDraw.Draw(image)

    # Quiet cloud bands retain the original arcade backdrop.
    draw.ellipse((-110, 215, 270, 520), fill=PURPLE)
    draw.ellipse((770, 235, 1130, 540), fill=PURPLE)
    draw.rectangle((0, 420, SIZE, SIZE), fill=(176, 113, 166))

    # Cabinet silhouette and star marquee.
    rect(draw, (116, 62, 908, 962), BLUE, 10, 18)
    polygon(draw, [(160, 62), (258, 25), (510, 50), (765, 25), (868, 62),
                   (868, 238), (160, 238)], PINK_LIGHT, 9, 10)
    rect(draw, (174, 106, 850, 223), BLUE_LIGHT, 7, 20)
    star(draw, (512, 158), 82, 41, YELLOW, 4)
    ellipse(draw, (493, 144, 502, 154), INK, 2)
    ellipse(draw, (522, 144, 531, 154), INK, 2)
    draw.line((503, 168, 512, 174, 521, 168), fill=INK, width=4)

    # Glass box, hanging cable, and three-prong claw.
    rect(draw, (176, 245, 848, 678), BLUE_LIGHT, 9, 2)
    draw.line((512, 244, 512, 330), fill=INK, width=6)
    rect(draw, (486, 320, 538, 349), GRAY, 5)
    draw.line((512, 348, 512, 375), fill=INK, width=6)
    draw.arc((449, 356, 517, 444), 120, 255, fill=INK, width=7)
    draw.arc((507, 356, 575, 444), 285, 60, fill=INK, width=7)
    draw.line((512, 375, 512, 438), fill=INK, width=7)

    # Only the plush subjects visible in the supplied screenshot are retained.
    plush(draw, (410, 563), PURPLE, 1)
    plush(draw, (518, 542), (151, 111, 143), 1)
    plush(draw, (654, 568), CREAM, 0)
    plush(draw, (744, 617), CREAM, 0)
    star(draw, (592, 570), 31, 15, YELLOW, 22)

    # Control deck, joystick, two buttons, prize chute and coin slot.
    polygon(draw, [(135, 678), (889, 678), (855, 810), (166, 810)], PINK, 9, 33)
    draw.line((247, 726, 247, 670), fill=INK, width=10)
    ellipse(draw, (218, 638, 276, 696), RED, 7)
    ellipse(draw, (430, 699, 521, 763), RED, 8)
    ellipse(draw, (654, 699, 745, 763), RED, 8)
    rect(draw, (164, 797, 850, 949), BLUE, 9, 2)
    rect(draw, (230, 826, 422, 944), (45, 45, 59), 8, 10)
    polygon(draw, [(245, 846), (405, 846), (368, 916), (274, 916)], INK, 5, 55)
    rect(draw, (760, 832, 824, 927), PURPLE, 7, 3)
    draw.line((792, 847, 792, 878), fill=INK, width=6)
    ellipse(draw, (783, 892, 801, 910), RED, 3)

    # Existing rainbow and small stars become flat marks on the lower cabinet.
    draw.arc((421, 828, 718, 1010), 192, 332, fill=YELLOW, width=16)
    draw.arc((423, 844, 720, 1026), 192, 332, fill=PINK, width=16)
    for center in ((150, 290), (865, 302), (159, 575), (860, 589)):
        star(draw, center, 14, 7, YELLOW, center[0])

    draw.rectangle((12, 12, SIZE - 13, SIZE - 13), outline=INK, width=9)
    image.save(OUT, "PNG", optimize=True)
    print(OUT)


if __name__ == "__main__":
    main()
