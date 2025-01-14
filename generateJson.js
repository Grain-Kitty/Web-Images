import fs from 'fs/promises';
import path from 'path';

// 图片所在文件夹路径
const imageFolder = 'images/';

async function generateImageJson() {
    const imageInfo = [];
    try {
        const files = await fs.readdir(imageFolder);
        for (const file of files) {
            const filePath = path.join(imageFolder, file);
            const stats = await fs.stat(filePath);
            if (stats.isFile() && /\.(jpg|jpeg|png|gif)$/i.test(file)) {
                // 在 url 属性前添加 http://www 并将路径中的 \\ 替换为 /
                imageInfo.push({
                    name: file,
                    url: `https://github.com/Grain-Kitty/Web-Images/blob/main/images/${filePath.replace(/\\/g, '/')}`
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