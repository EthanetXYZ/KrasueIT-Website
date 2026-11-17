// Regenerates the 1200x630 social share image. Run from the repo root: node scripts/generate-social.mjs
import sharp from 'sharp';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <pattern id="g" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M60 0H0V60" fill="none" stroke="#1a2a4a" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="#0b1120"/>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="1020" cy="90" r="280" fill="#13244a" opacity="0.6"/>
  <circle cx="1020" cy="90" r="140" fill="#17306a" opacity="0.7"/>
  <text x="80" y="330" font-family="Segoe UI, Arial, sans-serif" font-size="68" font-weight="700" fill="#ffffff">Your website, done properly.</text>
  <text x="80" y="398" font-family="Segoe UI, Arial, sans-serif" font-size="30" fill="#c5d0e6">Website design, hosting and domains for small</text>
  <text x="80" y="442" font-family="Segoe UI, Arial, sans-serif" font-size="30" fill="#c5d0e6">businesses, sole traders and community groups.</text>
  <rect x="80" y="500" width="336" height="56" rx="28" fill="#2563eb"/>
  <text x="248" y="537" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="#ffffff">Fully remote · Australia-wide</text>
</svg>`;

const logo = await sharp('public/KrauseIT_Logo_Transparent.png').resize({ height: 110 }).negate({ alpha: false }).toBuffer();

await sharp(Buffer.from(svg))
  .composite([{ input: logo, left: 80, top: 90 }])
  .png({ compressionLevel: 9 })
  .toFile('public/KrauseIT_Social.png');
console.log('written public/KrauseIT_Social.png');
