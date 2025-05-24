const Jimp = require("jimp");
const path = require("path");

async function testJimp() {
  const imagePath = path.join(__dirname, "avatarTest.png");

  try {
    console.log("Attempting to read:", imagePath);
    
    const image = await Jimp.read(imagePath);
    await image.resize(250, 250).writeAsync("resized-image.png");

    console.log("Image processed successfully! Check resized-image.png");
  } catch (err) {
    console.error("Jimp Test Error:", err);
  }
}

testJimp();
