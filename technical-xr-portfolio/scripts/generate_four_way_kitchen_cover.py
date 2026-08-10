from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "scripts" / "reference-assets" / "four-way-kitchen" / "gameplay.png"
OUT = ROOT / "public" / "media" / "four-way-kitchen-polaroid-cover.png"
ELEMENTS_PREVIEW = ROOT / "output" / "qa" / "four-way-kitchen-elements.png"


def largest_component(mask):
    height, width = mask.shape
    seen = np.zeros_like(mask, dtype=bool)
    largest = []
    for y in range(height):
        for x in range(width):
            if not mask[y, x] or seen[y, x]:
                continue
            component = []
            queue = deque([(x, y)])
            seen[y, x] = True
            while queue:
                px, py = queue.popleft()
                component.append((px, py))
                for nx, ny in ((px - 1, py), (px + 1, py), (px, py - 1), (px, py + 1)):
                    if 0 <= nx < width and 0 <= ny < height and mask[ny, nx] and not seen[ny, nx]:
                        seen[ny, nx] = True
                        queue.append((nx, ny))
            if len(component) > len(largest):
                largest = component
    result = np.zeros_like(mask, dtype=bool)
    for x, y in largest:
        result[y, x] = True
    return result


def fill_holes(mask):
    height, width = mask.shape
    outside = np.zeros_like(mask, dtype=bool)
    queue = deque()
    for x in range(width):
        for y in (0, height - 1):
            if not mask[y, x] and not outside[y, x]:
                outside[y, x] = True
                queue.append((x, y))
    for y in range(height):
        for x in (0, width - 1):
            if not mask[y, x] and not outside[y, x]:
                outside[y, x] = True
                queue.append((x, y))
    while queue:
        px, py = queue.popleft()
        for nx, ny in ((px - 1, py), (px + 1, py), (px, py - 1), (px, py + 1)):
            if 0 <= nx < width and 0 <= ny < height and not mask[ny, nx] and not outside[ny, nx]:
                outside[ny, nx] = True
                queue.append((nx, ny))
    return mask | (~mask & ~outside)


def extract_character(source):
    image = source.crop((375, 275, 600, 480)).convert("RGBA")
    rgb = np.asarray(image)[..., :3].astype(np.int16)
    red, green, blue = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    yellow = (red > 145) & (green > 105) & (blue < 115) & (red - blue > 70)
    mask = fill_holes(largest_component(yellow))
    alpha = Image.fromarray((mask * 255).astype(np.uint8))
    alpha = alpha.filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.GaussianBlur(1.1))
    image.putalpha(alpha)
    return image


def resize_to(image, size):
    return image.resize(size, Image.Resampling.LANCZOS)


def paste_with_shadow(canvas, image, position, shadow_offset=(14, 18)):
    alpha = image.getchannel("A")
    shadow = Image.new("RGBA", image.size, (37, 62, 91, 0))
    shadow.putalpha(alpha.point(lambda value: round(value * 0.48)))
    shadow = shadow.filter(ImageFilter.GaussianBlur(8))
    canvas.alpha_composite(shadow, (position[0] + shadow_offset[0], position[1] + shadow_offset[1]))
    outline_alpha = np.maximum(
        np.asarray(alpha.filter(ImageFilter.MaxFilter(9)), dtype=np.int16)
        - np.asarray(alpha, dtype=np.int16),
        0,
    ).astype(np.uint8)
    outline = Image.new("RGBA", image.size, (255, 225, 93, 0))
    outline.putalpha(Image.fromarray(outline_alpha))
    canvas.alpha_composite(outline, position)
    canvas.alpha_composite(image, position)


def main():
    source = Image.open(SOURCE).convert("RGB")
    canvas = Image.new("RGBA", (1024, 1024), (224, 220, 217, 255))
    draw = ImageDraw.Draw(canvas)

    # Rebuild the cool tiled floor as a quiet backdrop for the extracted stations.
    for coordinate in range(0, 1025, 42):
        draw.line((coordinate, 0, coordinate, 1024), fill=(199, 196, 194, 180), width=2)
        draw.line((0, coordinate, 1024, coordinate), fill=(199, 196, 194, 180), width=2)

    top = resize_to(source.crop((150, 18, 850, 198)).convert("RGBA"), (900, 231))
    left = resize_to(source.crop((14, 190, 154, 600)).convert("RGBA"), (172, 504))
    right = resize_to(source.crop((844, 74, 991, 590)).convert("RGBA"), (174, 610))
    bottom = resize_to(source.crop((150, 600, 991, 784)).convert("RGBA"), (930, 204))
    character = resize_to(extract_character(source), (292, 266))

    canvas.alpha_composite(top, (62, 40))
    canvas.alpha_composite(left, (42, 260))
    canvas.alpha_composite(right, (808, 224))
    canvas.alpha_composite(bottom, (47, 790))
    paste_with_shadow(canvas, character, (366, 402))

    canvas = ImageEnhance.Color(canvas.convert("RGB")).enhance(1.06)
    canvas = ImageEnhance.Contrast(canvas).enhance(1.04)
    canvas.save(OUT, "PNG", optimize=True)

    ELEMENTS_PREVIEW.parent.mkdir(parents=True, exist_ok=True)
    preview = Image.new("RGBA", (1024, 360), (222, 219, 214, 255))
    preview.alpha_composite(resize_to(top, (500, 128)), (24, 22))
    preview.alpha_composite(resize_to(left, (100, 293)), (550, 28))
    preview.alpha_composite(resize_to(right, (84, 294)), (690, 28))
    preview.alpha_composite(resize_to(character, (220, 200)), (790, 80))
    preview.convert("RGB").save(ELEMENTS_PREVIEW, "PNG", optimize=True)
    print(OUT)


if __name__ == "__main__":
    main()
