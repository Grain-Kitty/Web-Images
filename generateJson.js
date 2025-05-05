import fs from 'fs/promises';
import path from 'path';
import { promisify } from 'util';
import sizeOf from 'image-size';

// 图片所在文件夹路径
const imageFolder = 'images/';

// 将 sizeOf 转换为 promise 形式
const sizeOfPromise = promisify(sizeOf);

async function generateImageJson() {
    const imageInfo = [];
    try {
        const files = await fs.readdir(imageFolder);
        for (const file of files) {
            const filePath = path.join(imageFolder, file);
            const stats = await fs.stat(filePath);
            if (stats.isFile() && /\.(jpg|jpeg|png|gif|webp)$/i.test(file)) {
                // 获取图片尺寸
                const dimensions = await sizeOfPromise(filePath);
                imageInfo.push({
                    name: file,
                    url: `https://raw.githubusercontent.com/Grain-Kitty/Web-Images/refs/heads/main/${filePath.replace(/\\/g, '/')}`,
                    width: dimensions.width,
                    height: dimensions.height
                });
            }
        }
        const jsonData = { images: imageInfo };
        await fs.writeFile('images.json', JSON.stringify(jsonData, null, 2));
        console.log('images.json 已成功生成');
    } catch (error) {
        console.error('生成 images.json 时出错:', error);
    }
}

generateImageJson();