function checkPositionColour(position) {
  function between(value, min, max) {
    return value >= min && value <= max;
  }
  const canvas = document.getElementById("game").getContext("2d");
  const pixelData = canvas.getImageData(position.x, position.y, 1, 1, {colorSpace: "srgb"}).data;
  const roadValues = [
    0, 51, 59, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86,
    87, 88, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 105, 106, 107, 108, 109, 110, 111, 112, 116,
    122, 132, 136, 140, 143, 144, 147, 151, 153, 152, 158, 159, 160, 161, 161, 162, 163, 164, 165, 166, 167, 168, 170,
    171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193,
    194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 248, 255,
  ];
  const outerValues = [
    [230, 230, 230],
    [201, 115, 145],
    [115, 115, 115],
    [193, 39, 45],
    [180, 128, 105],
    [106, 67, 69],
    [181, 161, 162],
    [210, 203, 191],
    [212, 135, 138],
    [202, 87, 91],
    [61, 62, 61],
    [170, 170, 170],
    [65, 81, 80],
    [207, 36, 41],
    [235, 255, 255],
    [173, 189, 185],
    [189, 16, 22],
    [232, 242, 242],
    [202, 8, 16],
    [148, 60, 60],
    [136, 40, 42],
    [76, 76, 76],
    [216, 154, 156],
    [192, 25, 33],
    [215, 189, 185],
    [246, 246, 246],
    [198, 63, 67],
    [223, 118, 122],
    [192, 99, 100],
    [222, 204, 203],
    [196, 78, 78],
    [211, 207, 204],
    [203, 102, 106],
    [208, 113, 117],
    [132, 142, 143],
    [216, 214, 216],
    [163, 92, 63],
    [153, 110, 69],
    [218, 170, 171],
    [177, 65, 54],
    [140, 181, 116],
    [118, 207, 118],
    [193, 222, 193],
    [122, 166, 88],
    [157, 197, 143],
    [175, 44, 99],
    [176, 44, 49],
    [179, 132, 134],
    [160, 149, 149],
    [142, 117, 118],
    [57, 144, 57],
    [111, 97, 97],
    [169, 99, 102],
    [145, 93, 95],
  ];

  let isSideRoad = false;

  outerValues.every((colour) => {
    if (
      between(pixelData[0], colour[0] - 15, colour[0] + 25) &&
      between(pixelData[1], colour[1] - 15, colour[1] + 25) &&
      between(pixelData[2], colour[2] - 15, colour[2] + 25)
    ) {
      isSideRoad = true;
      return false;
    }
    return true;
  });

  if (roadValues.includes(pixelData[0]) && pixelData[0] === pixelData[1] && pixelData[0] === pixelData[2]) {
    // ignore
    return "ok";
  } else if (isSideRoad) {
    return "speed reduce10";
  } else if (
    (between(pixelData[0], 102 - 15, 102 + 15) &&
      between(pixelData[1], 204 - 15, 204 + 15) &&
      between(pixelData[2], 102 - 15, 102 + 15)) ||
    (between(pixelData[0], 114 - 15, 114 + 15) &&
      between(pixelData[1], 182 - 15, 182 + 15) &&
      between(pixelData[2], 94 - 15, 94 + 15)) ||
    (between(pixelData[0], 154 - 15, 154 + 15) &&
      between(pixelData[1], 214 - 15, 214 + 15) &&
      between(pixelData[2], 154 - 15, 154 + 15)) ||
    (between(pixelData[0], 132 - 15, 132 + 15) &&
      between(pixelData[1], 147 - 15, 147 + 15) &&
      between(pixelData[2], 82 - 15, 82 + 15)) ||
    (between(pixelData[0], 170 - 15, 170 + 15) &&
      between(pixelData[1], 217 - 15, 217 + 15) &&
      between(pixelData[2], 170 - 15, 170 + 15)) ||
    (between(pixelData[0], 86 - 15, 86 + 15) &&
      between(pixelData[1], 172 - 15, 172 + 15) &&
      between(pixelData[2], 86 - 15, 86 + 15)) ||
    (between(pixelData[0], 50 - 15, 50 + 15) &&
      between(pixelData[1], 100 - 15, 100 + 15) &&
      between(pixelData[2], 50 - 15, 50 + 15))
  ) {
    return "speed reduce50";
  } else {
    return "speed stop";
  }
}

export {checkPositionColour};
