export type Options = number | {
    devicePixelRatio?: number;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
};
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
}) => void, options?: Options) => Promise<HTMLImageElement>;
export default useCanvasImage;
