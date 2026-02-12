import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const source = join(root, 'src', 'assets', 'logo-source.png');

async function generateFavicons() {
    console.log('Generating favicons from:', source);

    // Generate 48x48 PNG for Google Search
    await sharp(source)
        .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toFile(join(root, 'public', 'assets', 'icon-48.png'));
    console.log('✅ icon-48.png (48x48)');

    // Generate 32x32 PNG
    await sharp(source)
        .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toFile(join(root, 'public', 'assets', 'icon-32.png'));
    console.log('✅ icon-32.png (32x32)');

    // Generate 16x16 PNG
    await sharp(source)
        .resize(16, 16, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toFile(join(root, 'public', 'assets', 'icon-16.png'));
    console.log('✅ icon-16.png (16x16)');

    // Generate favicon.ico (contains 16x16 and 32x32 as a single ICO)
    // ICO format: we'll create a simple ICO with the 32x32 PNG embedded
    const png32 = await sharp(source)
        .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer();

    const png16 = await sharp(source)
        .resize(16, 16, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer();

    // Build ICO file manually (PNG-in-ICO format)
    const numImages = 2;
    const headerSize = 6;
    const dirEntrySize = 16;
    const dataOffset1 = headerSize + dirEntrySize * numImages;
    const dataOffset2 = dataOffset1 + png16.length;

    // ICO Header (6 bytes)
    const header = Buffer.alloc(6);
    header.writeUInt16LE(0, 0);      // Reserved
    header.writeUInt16LE(1, 2);      // Type: ICO
    header.writeUInt16LE(numImages, 4); // Number of images

    // Directory entry for 16x16
    const dir1 = Buffer.alloc(16);
    dir1.writeUInt8(16, 0);          // Width
    dir1.writeUInt8(16, 1);          // Height
    dir1.writeUInt8(0, 2);           // Color palette
    dir1.writeUInt8(0, 3);           // Reserved
    dir1.writeUInt16LE(1, 4);        // Color planes
    dir1.writeUInt16LE(32, 6);       // Bits per pixel
    dir1.writeUInt32LE(png16.length, 8); // Size
    dir1.writeUInt32LE(dataOffset1, 12); // Offset

    // Directory entry for 32x32
    const dir2 = Buffer.alloc(16);
    dir2.writeUInt8(32, 0);
    dir2.writeUInt8(32, 1);
    dir2.writeUInt8(0, 2);
    dir2.writeUInt8(0, 3);
    dir2.writeUInt16LE(1, 4);
    dir2.writeUInt16LE(32, 6);
    dir2.writeUInt32LE(png32.length, 8);
    dir2.writeUInt32LE(dataOffset2, 12);

    const ico = Buffer.concat([header, dir1, dir2, png16, png32]);
    writeFileSync(join(root, 'public', 'favicon.ico'), ico);
    console.log('✅ favicon.ico (16x16 + 32x32)');

    // Also copy to src/assets for dev mode references
    await sharp(source)
        .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toFile(join(root, 'src', 'assets', 'icon-48.png'));
    console.log('✅ src/assets/icon-48.png (48x48)');

    writeFileSync(join(root, 'src', 'assets', 'favicon.ico'), ico);
    console.log('✅ src/assets/favicon.ico');

    console.log('\n🎉 All favicons generated successfully!');
}

generateFavicons().catch(console.error);
