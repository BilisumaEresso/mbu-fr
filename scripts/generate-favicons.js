import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const sourcePath = path.join(rootDir, 'src', 'assets', 'images', 'brand', 'MBU_logo_nobg.png');
const publicDir = path.join(rootDir, 'public');

async function generate() {
  console.log('1. Checking source image at:', sourcePath);
  try {
    await fs.access(sourcePath);
  } catch (err) {
    throw new Error(`Source image not found at ${sourcePath}`);
  }

  // Step A: Crop circular content, remove excess canvas
  console.log('Step A: Trimming excess canvas and ensuring square canvas...');
  const trimmed = await sharp(sourcePath)
    .trim()
    .toBuffer({ resolveWithObject: true });

  const { width: trimWidth, height: trimHeight } = trimmed.info;
  console.log(`Trimmed dimensions: ${trimWidth} x ${trimHeight}`);

  let squaredBuffer;
  if (trimWidth === trimHeight) {
    console.log('Trimmed graphic is an exact square.');
    squaredBuffer = trimmed.data;
  } else {
    const maxDim = Math.max(trimWidth, trimHeight);
    const padX = maxDim - trimWidth;
    const padY = maxDim - trimHeight;
    const left = Math.floor(padX / 2);
    const right = padX - left;
    const top = Math.floor(padY / 2);
    const bottom = padY - top;
    console.log(`Padding to square (${maxDim}x${maxDim}): left=${left}, right=${right}, top=${top}, bottom=${bottom}`);

    squaredBuffer = await sharp(trimmed.data)
      .extend({
        top,
        bottom,
        left,
        right,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toBuffer();
  }

  // Step B: Generate standard transparent favicons
  console.log('Step B: Generating standard transparent PNGs...');
  const sizes = [
    { size: 16, name: 'favicon-16.png' },
    { size: 32, name: 'favicon-32.png' },
    { size: 48, name: 'favicon-48x48.png' },
    { size: 192, name: 'icon-192.png' },
    { size: 512, name: 'icon-512.png' },
    { size: 512, name: 'favicon-512.png' }
  ];

  for (const { size, name } of sizes) {
    const outPath = path.join(publicDir, name);
    await sharp(squaredBuffer)
      .resize(size, size, { kernel: sharp.kernel.lanczos3 })
      .png()
      .toFile(outPath);
    console.log(`  Created ${name} (${size}x${size})`);
  }

  // Step C: Pack real multi-size .ico (16, 32, 48)
  console.log('Step C: Packing genuine multi-size favicon.ico...');
  const icoFiles = [
    path.join(publicDir, 'favicon-16.png'),
    path.join(publicDir, 'favicon-32.png'),
    path.join(publicDir, 'favicon-48x48.png')
  ];
  const icoBuffer = await pngToIco(icoFiles);
  const icoPath = path.join(publicDir, 'favicon.ico');
  await fs.writeFile(icoPath, icoBuffer);
  console.log(`  Created favicon.ico (${icoBuffer.length} bytes)`);

  // Step D: apple-touch-icon (180x180, flattened #FCF9F8, opaque, no alpha)
  console.log('Step D: Generating opaque apple-touch-icon.png (#FCF9F8, 180x180)...');
  const appleTouchPath = path.join(publicDir, 'apple-touch-icon.png');
  await sharp(squaredBuffer)
    .resize(180, 180, { kernel: sharp.kernel.lanczos3 })
    .flatten({ background: '#FCF9F8' })
    .png()
    .toFile(appleTouchPath);
  console.log('  Created apple-touch-icon.png (180x180, solid cream background)');

  // Step E: Maskable icons for Android PWA (safe zone 80% on #173124 deep green background)
  console.log('Step E: Generating maskable icons with 80% safe zone on #173124 background...');
  const maskableConfigs = [
    { canvasSize: 192, name: 'maskable-icon-192.png' },
    { canvasSize: 512, name: 'maskable-icon-512.png' }
  ];

  for (const { canvasSize, name } of maskableConfigs) {
    const logoSize = Math.round(canvasSize * 0.8);
    const offset = Math.floor((canvasSize - logoSize) / 2);

    const resizedLogo = await sharp(squaredBuffer)
      .resize(logoSize, logoSize, { kernel: sharp.kernel.lanczos3 })
      .png()
      .toBuffer();

    const outPath = path.join(publicDir, name);
    await sharp({
      create: {
        width: canvasSize,
        height: canvasSize,
        channels: 4,
        background: { r: 23, g: 49, b: 36, alpha: 1 } // #173124
      }
    })
      .composite([{ input: resizedLogo, top: offset, left: offset }])
      .flatten({ background: '#173124' }) // Ensure full bleed solid RGB, no transparency
      .png()
      .toFile(outPath);

    console.log(`  Created ${name} (${canvasSize}x${canvasSize}, logo ${logoSize}x${logoSize} at offset ${offset})`);
  }

  // Step F: SVG wrapper
  console.log('Step F: Writing favicon.svg wrapper...');
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512">
  <image href="/favicon-512.png" width="512" height="512"/>
</svg>
`;
  await fs.writeFile(path.join(publicDir, 'favicon.svg'), svgContent, 'utf-8');
  console.log('  Created favicon.svg');

  console.log('\nAll assets generated successfully!');
}

generate().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
