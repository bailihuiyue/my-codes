const fs = require('fs');
const path = require('path');

const folderPath = __dirname+'/src'; // 当前文件夹路径

const chineseObj = {};
// 递归遍历文件夹中的所有文件
function traverseFolder(folderPath) {
  const files = fs.readdirSync(folderPath);
  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      // 如果是文件夹，则递归遍历
      traverseFolder(filePath);
    } else if (stats.isFile() && path.extname(file) === '.vue') {
      // 如果是.vue文件，则提取中文内容
      extractChinese(filePath, chineseObj);
    }
  });
}

// 提取中文内容
function extractChinese(filePath, chineseObj) {
  const content = fs.readFileSync(filePath, 'utf8');
  const regex = /\$t\(\'(.*?)\'\)/g;

  let match;
  while ((match = regex.exec(content))) {
    const chinese = match[1];
    // if (!chineseObj[chinese]) {
    //   chineseObj[chinese] = '';
    // }
    chineseObj[chinese]='';
  }
}

// 调用遍历文件夹函数
traverseFolder(folderPath);

console.log("中文内容对象：", chineseObj);
