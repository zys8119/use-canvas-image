const unifyArgs = (options) => {
  const result = {
    x: 0,
    y: 0,
    width: null,
    height: null,
    devicePixelRatio: window.devicePixelRatio
  };
  switch (Object.prototype.toString.call(options)) {
    case "[object Number]":
      result.devicePixelRatio = options;
      break;
    case "[object Object]":
      Object.assign(result, options);
      break;
    default:
      throw "The options parameter is incorrect. The parameter must be number or object.";
      break;
  }
  return result;
};
const useCanvasImage = (image, callback, options) => {
  const { devicePixelRatio, x: dataX, y: dataY, width, height } = unifyArgs(options);
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = typeof image === "string" ? new Image() : image;
      const drawImage = () => {
        canvas.width = img.width * devicePixelRatio;
        canvas.height = img.height * devicePixelRatio;
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(dataX || 0, dataY || 0, width || canvas.width, height || canvas.height).data;
        const max = 4;
        for (let i = 0, lng = imgData.length; i < lng; i += max) {
          const r = imgData[i];
          const g = imgData[i + 1];
          const b = imgData[i + 2];
          const a = imgData[i + 3];
          const rgba = `rgba(${r},${g},${b},${a})`;
          const index = i / max;
          const x = index % canvas.width;
          const y = Number((index / canvas.width).toFixed(0));
          if (typeof callback === "function") {
            callback == null ? void 0 : callback({
              r,
              g,
              b,
              a,
              rgba,
              index,
              x,
              y,
              isStart: i === 0,
              lng,
              key: i,
              max,
              isEnd: i === lng - max,
              canvasWidth: canvas.width,
              canvasHeight: canvas.height
            });
          }
        }
        canvas.remove();
        resolve(img);
      };
      if (typeof image === "string") {
        img.src = image;
        img.onload = drawImage;
      } else {
        drawImage();
      }
    } catch (e) {
      reject(e);
    }
  });
};
export default useCanvasImage;
