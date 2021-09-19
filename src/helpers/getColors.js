import rgbToHsl from "./rgbToHls";

export default function getColors({ canvas, objectURL }) {
  return new Promise((resolve) => {
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = function () {
      const { naturalWidth: width, naturalHeight: height } = this;
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(this, 0, 0, width, height);
      const { data: pixels } = ctx.getImageData(0, 0, width, height);
      const map = {};
      for (let i = 0; i < pixels.length; i += 4) {
        const rgba = pixels.slice(i, i + 4);
        const key = rgba.join(",");
        map[key] = (map[key] || 0) + 1;
      }
      const colors = Object.entries(map);
      const colorsRgba = colors
        .map(([key]) => ({
          key,
          hls: rgbToHsl(key.split(",").map((i) => +i)),
        }))
        .filter(({ hls }) => {
          // saturation over 80 and light over 10
          return hls[1] > 80 && hls[2] > 10;
        })
        .sort((a, b) => {
          return a.hls[2] - b.hls[2];
        })
        .map((c) => c.key.split(","));
      resolve(colorsRgba);
    };
    img.src = objectURL;
  });
}
