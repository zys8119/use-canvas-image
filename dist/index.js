const useCanvasImage = (image, callback) => {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = typeof image === "string" ? new Image() : image;
      const drawImage = () => {
        canvas.width = img.width * window.devicePixelRatio;
        canvas.height = img.height * window.devicePixelRatio;
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, img.width, img.height).data;
        const max = 4;
        for (let i = 0, lng = imgData.length; i < lng; i += max) {
          const r = imgData[i];
          const g = imgData[i + 1];
          const b = imgData[i + 2];
          const a = imgData[i + 3];
          const rgba = `rgba(${r},${g},${b},${a})`;
          const index = i / max;
          const x = index % canvas.width;
          const y = Number(index / canvas.width);
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
