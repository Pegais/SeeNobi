# Logo Background Removal Guide

## Current CSS Solution

The logo component now uses CSS blend modes to help remove dark backgrounds:

1. **mix-blend-mode: screen** - Blends the image to remove dark pixels
2. **brightness(1.4)** - Brightens the image
3. **contrast(1.2)** - Increases contrast

## Better Solution: Edit the Image File

For best results, you should edit the PNG image file to have a transparent background:

### Using Online Tools:
1. **Remove.bg** - https://www.remove.bg/
2. **Photopea** - https://www.photopea.com/ (Free Photoshop alternative)
3. **GIMP** - Free image editor

### Steps:
1. Open the image in an image editor
2. Use "Magic Wand" or "Select by Color" tool
3. Select the dark background
4. Delete the selected area
5. Save as PNG with transparency enabled

### Using ImageMagick (Command Line):
```bash
convert seenobi.png -fuzz 10% -transparent "#1a1a1a" seenobi-transparent.png
```

### Using Python (PIL/Pillow):
```python
from PIL import Image
import numpy as np

img = Image.open('seenobi.png')
img = img.convert("RGBA")
data = np.array(img)

# Remove dark pixels (adjust threshold as needed)
threshold = 50
mask = (data[:,:,0] < threshold) & (data[:,:,1] < threshold) & (data[:,:,2] < threshold)
data[mask] = [0, 0, 0, 0]  # Make transparent

img = Image.fromarray(data)
img.save('seenobi-transparent.png')
```

## CSS-Only Solution (Current Implementation)

The current CSS uses:
- `mix-blend-mode: screen` - Works well for dark backgrounds
- Brightness and contrast filters
- This works but may not be perfect for all cases

## Testing

After updating the image:
1. The logo should blend seamlessly with the page background
2. No dark rectangle around the logo
3. Only the ninja and text elements should be visible

