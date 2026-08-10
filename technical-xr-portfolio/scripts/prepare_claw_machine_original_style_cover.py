"""Prepare the original claw-machine artwork for a square portfolio cover."""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageFilter


def prepare_cover(source_path: Path, output_path: Path, size: int = 1024) -> None:
    with Image.open(source_path) as source_file:
        source = source_file.convert("RGB")

    # Fill the square with a softly enlarged copy, then place every source pixel
    # back on top. This preserves the artwork while avoiding hard side bars.
    background_scale = max(size / source.width, size / source.height)
    background_size = (
        round(source.width * background_scale),
        round(source.height * background_scale),
    )
    background = source.resize(background_size, Image.Resampling.LANCZOS)
    left = (background.width - size) // 2
    top = (background.height - size) // 2
    background = background.crop((left, top, left + size, top + size))
    background = background.filter(ImageFilter.GaussianBlur(radius=28))

    foreground_scale = min(size / source.width, size / source.height)
    foreground_size = (
        round(source.width * foreground_scale),
        round(source.height * foreground_scale),
    )
    foreground = source.resize(foreground_size, Image.Resampling.LANCZOS)
    position = ((size - foreground.width) // 2, (size - foreground.height) // 2)
    background.paste(foreground, position)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    background.save(output_path, format="PNG", optimize=True)


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Fit a portrait claw-machine render into a square cover without cropping it."
    )
    parser.add_argument("input", type=Path, help="Path to the original render")
    parser.add_argument("output", type=Path, help="Path for the square PNG cover")
    parser.add_argument("--size", type=int, default=1024, help="Square output size")
    args = parser.parse_args()

    prepare_cover(args.input, args.output, args.size)


if __name__ == "__main__":
    main()
