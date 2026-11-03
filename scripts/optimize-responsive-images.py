"""Create missing responsive assets from the full-size WebP product images.

Run with Python and Pillow: python scripts/optimize-responsive-images.py
"""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1] / 'src/assets/images'

for source in sorted(ROOT.iterdir()):
    if source.suffix.lower() != '.webp' or source.stem == 'triskele' or source.stem.endswith(('-480', '-800', '-mobile')):
        continue
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original).convert('RGB')
    for width in (480, 800):
        if width > image.width:
            continue
        height = round(image.height * width / image.width)
        target = source.with_name(f'{source.stem}-{width}.webp')
        if target.exists():
            continue
        image.resize((width, height), Image.Resampling.LANCZOS).save(
            target, 'WEBP', quality=82, method=6
        )
        print(f'{target.name}: {target.stat().st_size:,} bytes')

    if source.stem == 'pizzateglia' and not (ROOT / 'pizzateglia-mobile.webp').exists():
        image.thumbnail((960, 960), Image.Resampling.LANCZOS)
        image.save(ROOT / 'pizzateglia-mobile.webp', 'WEBP', quality=82, method=6)
