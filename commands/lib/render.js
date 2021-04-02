const Canvas = require('canvas');
const mooncatparser = require("mooncatparser");
const fs = require('fs');

function generateMoonCatImage(catId, size){
  const data = mooncatparser(catId);

  const canvas = Canvas.createCanvas(size * data.length, size * data[0].length);
  const ctx = canvas.getContext('2d');
  
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      const color = data[i][j];
      
      if (color) {
        ctx.fillStyle = color;
        ctx.fillRect(i * size, j * size, size, size);
      }
    }
  }

  const buffer = canvas.toBuffer('image/png');
  
  fs.writeFileSync(catId + '.png', buffer);
}

module.exports = generateMoonCatImage;