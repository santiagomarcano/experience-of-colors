// linearly maps value from the range (a..b) to (c..d)
function mapRange(value, a, b, c, d) {
  // first map value from (a..b) to (0..1)
  value = (value - a) / (b - a);
  // then map it from (0..1) to (c..d) and return it
  return c + value * (d - c);
}

const size = {
  width: 1080,
  height: 1080,
};

export default function draw({ colors, canvas, config }) {
  return new Promise(async (resolve) => {
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    canvas.width = size.width;
    canvas.height = size.height;
    canvas.width = canvas.width;
    const limit = config.type === "CIRCLE" ? 8 : 1;
    let i = colors.filter((_, index) => index % limit === 0).length;
    const filteredColors = colors.filter((_, index) => index % limit === 0);
    const rectWidth = size.width / i;
    const rectHeight = size.height / i;
    let x = 0;
    let y = 0;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let color of filteredColors) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          ctx.fillStyle = `rgba(${color})`;
          switch (config.type) {
            case "LINES": {
              x = x + rectWidth;
              y = y + rectHeight;
              ctx.fillRect(0, y, size.width, rectHeight);
              break;
            }
            case "MIXED_LINES": {
              x = x + rectWidth;
              y = y + rectHeight;
              if (i % 2 === 0) {
                ctx.fillRect(0, y, size.width, rectHeight);
                break;
              }
              ctx.fillRect(x, 0, rectWidth, size.height);
              break;
            }
            case "CIRCLES": {
              let r = mapRange(i, filteredColors.length, 0, size.width / 2, 1);
              ctx.strokeStyle = `rgba(${color})`;
              ctx.beginPath();
              x = x + rectWidth;
              y = y + rectHeight;
              ctx.arc(size.width / 2, size.height / 2, r, 0, 2 * Math.PI);
              ctx.stroke();
              break;
            }
          }
          i -= 1;
          if (i === 0) {
            resolve(canvas.toDataURL("image/png"));
          }
        }, 1);
      });
    }
  });
}
