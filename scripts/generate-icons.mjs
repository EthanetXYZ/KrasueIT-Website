import sharp from 'sharp';
// Regenerates favicons/app icons and the header logo WebP. Run from the repo root: node scripts/generate-icons.mjs
import { writeFileSync } from 'node:fs';

// K mark traced from public/KrauseIT_Icon_Transparent.png (bbox x16–438, y28–356, centre 227,192)
const K = `
    <polygon points="16,28 169,28 169,87 16,240"/>
    <polygon points="291,28 436,28 201,260 131,188"/>
    <polygon points="99,218 169,288 169,356 16,356 16,301"/>
    <polygon points="303,218 438,356 299,356 231,288"/>`;

const svg = ({ radius = 112, scale = 0.92 } = {}) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="${radius}" fill="#0b1120"/>
  <g fill="#ffffff" transform="translate(256 256) scale(${scale}) translate(-227 -192)">${K}
  </g>
</svg>
`;

writeFileSync('public/favicon.svg', svg());

const png = (size, opts) => sharp(Buffer.from(svg(opts))).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

// iOS applies its own rounding, so the touch icon is full-bleed
writeFileSync('public/apple-touch-icon.png', await png(180, { radius: 0, scale: 0.8 }));
writeFileSync('public/icon-192.png', await png(192));
writeFileSync('public/icon-512.png', await png(512));

// favicon.ico containing 16/32/48 PNG images
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map((s) => png(s)));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((s, i) => {
  const e = 6 + 16 * i;
  header.writeUInt8(s, e);
  header.writeUInt8(s, e + 1);
  header.writeUInt8(0, e + 2);
  header.writeUInt8(0, e + 3);
  header.writeUInt16LE(1, e + 4);
  header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(images[i].length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += images[i].length;
});
writeFileSync('public/favicon.ico', Buffer.concat([header, ...images]));

// Header/footer logo is displayed at 140x36; ship a 2x WebP instead of the 1584x408 PNG
await sharp('public/KrauseIT_Logo_Transparent.png').resize({ height: 72 }).webp({ quality: 90 }).toFile('public/KrauseIT_Logo.webp');
const meta = await sharp('public/KrauseIT_Logo.webp').metadata();
console.log('logo webp', meta.width, meta.height);
