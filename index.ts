export type Options =  number | {
    devicePixelRatio?:number
    x?:number
    y?:number
    width?:number
    height?:number
}
const unifyArgs = (options)=>{
    const result:Options = {
        x:0,
        y:0,
        width:null,
        height:null,
        devicePixelRatio:window.devicePixelRatio
    }
    switch (Object.prototype.toString.call(options)) {
        case '[object Undefined]':
        case '[object Number]':
            result.devicePixelRatio = options || window.devicePixelRatio
            break
        case '[object Object]':
            Object.assign(result, options)
            break
        default:
            throw 'The options parameter is incorrect. The parameter must be number or object.'
            break
    }
    return result
}
const useCanvasImage = (image:string | HTMLImageElement | typeof Image | HTMLCanvasElement | CanvasImageSource, callback?:(info:{
    r:number
    g:number
    b:number
    a:number
    rgba:string
    x:number
    y:number
    index:number
    isStart:boolean
    isEnd:boolean,
    lng:number,
    key:number,
    canvasWidth:number
    canvasHeight:number
    max:number
})=>void, options?:Options)=>{
    const {devicePixelRatio, x:dataX, y:dataY, width, height} = unifyArgs(options)
    return new Promise<HTMLImageElement>((resolve, reject) => {
        try {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            const img:any = typeof image === 'string' ? new Image() : image
            const drawImage = ()=>{
                canvas.width = img.width * devicePixelRatio
                canvas.height = img.height * devicePixelRatio
                ctx.drawImage(img, 0,0)
                const sx = dataX || 0
                const sy = dataY || 0
                const sw = width || canvas.width
                const sh = height || canvas.height
                const imgData = ctx.getImageData(sx,sy, sw, sh).data
                const max = 4
                for(let i = 0, lng = imgData.length; i < lng; i += max){
                    const r = imgData[i]
                    const g = imgData[i+1]
                    const b = imgData[i+2]
                    const a = imgData[i+3]
                    const rgba = `rgba(${r},${g},${b},${a})`
                    const index = i / max
                    const x = index % sw + sx
                    const y = Math.floor(index / sw) + sy
                    if(typeof callback === 'function'){
                        callback?.({
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
                            key:i,
                            max,
                            isEnd: i === lng - max,
                            canvasWidth:canvas.width,
                            canvasHeight:canvas.height,
                        })
                    }
                }
                canvas.remove()
                resolve(img)
            }
            if(typeof image === 'string'){
                img.src = image
                img.onload = drawImage
            }else {
                drawImage()
            }
        }catch (e) {
            reject(e)
        }
    })
}

export default useCanvasImage
