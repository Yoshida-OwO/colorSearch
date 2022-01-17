function rgbToSinHSV(r:number, g:number, b:number): number {
    r /= 255, g /= 255, b /= 255;
  
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var s: number = max;
    var d = max - min;
    s = max == 0 ? 0 : d / max;
  
    return s;
  }
  
export default rgbToSinHSV