from collections import deque
from pathlib import Path

from PIL import Image


SOURCE = Path(r"C:\Users\caloe\Downloads\5ce413ba990a1-ZENITH_LOGO.jpeg")
OUTPUT = Path("public/images/brand/zenith-logo-transparent.png")


image = Image.open(SOURCE).convert("RGBA")
pixels = image.load()
width, height = image.size

visited = set()
queue = deque()

for x in range(width):
    queue.append((x, 0))
    queue.append((x, height - 1))

for y in range(height):
    queue.append((0, y))
    queue.append((width - 1, y))


def background_strength(red, green, blue):
    minimum = min(red, green, blue)
    maximum = max(red, green, blue)

    # Background pixels are bright and nearly neutral. The gradual range keeps
    # antialiased edges smooth without touching white details enclosed by blue.
    if minimum < 205 or maximum - minimum > 30:
        return 0
    return max(0, min(255, round((minimum - 205) / 50 * 255)))


while queue:
    x, y = queue.popleft()
    if (x, y) in visited:
        continue

    red, green, blue, _ = pixels[x, y]
    strength = background_strength(red, green, blue)
    if strength == 0:
        continue

    visited.add((x, y))
    pixels[x, y] = (red, green, blue, 255 - strength)

    if x > 0:
        queue.append((x - 1, y))
    if x + 1 < width:
        queue.append((x + 1, y))
    if y > 0:
        queue.append((x, y - 1))
    if y + 1 < height:
        queue.append((x, y + 1))

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
image.save(OUTPUT, "PNG")
print(OUTPUT.resolve())
