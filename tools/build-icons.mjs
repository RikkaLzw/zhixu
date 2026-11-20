import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const foreground = await sharp(fileURLToPath(new URL('../assets/memory-mark.png', import.meta.url)))
  .resize(1024, 1024)
  .png()
  .toBuffer();
const background = {
  create: { width: 1024, height: 1024, channels: 4, background: '#F4F5F1' },
};

await sharp(foreground).png().toFile(fileURLToPath(new URL('../assets/android-icon-foreground.png', import.meta.url)));
const icon = await sharp(background).composite([{ input: foreground }]).png().toBuffer();
await sharp(icon).toFile(fileURLToPath(new URL('../assets/icon.png', import.meta.url)));
await sharp(icon).resize(48, 48).toFile(fileURLToPath(new URL('../assets/favicon.png', import.meta.url)));
