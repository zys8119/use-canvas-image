declare const useCanvasImage: (image: string | HTMLImageElement | typeof Image | HTMLCanvasElement | CanvasImageSource, callback?: (info: {
    r: number;
    g: number;
    b: number;
    a: number;
    rgba: string;
    x: number;
    y: number;
    index: number;
    isStart: boolean;
    isEnd: boolean;
    lng: number;
    key: number;
    canvasWidth: number;
    canvasHeight: number;
    max: number;
}) => void, devicePixelRatio?: number) => Promise<HTMLImageElement>;
export default useCanvasImage;
