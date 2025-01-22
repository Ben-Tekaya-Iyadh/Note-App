export function IsLightColor(inputColor) {
    //checking if inputColor is rgba
    const rgbaValues = inputColor.match(/rgb?\((\d+), (\d+), (\d+)/);
    
    //logic if the color is rgba
    if (rgbaValues) {
        let r = parseInt(rgbaValues[1], 10); // Red value
        let g = parseInt(rgbaValues[2], 10); // Green value
        let b = parseInt(rgbaValues[3], 10); // Blue value

        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        return luminance > 0.5;
    }

    //logic if the color is hex
    const hex = inputColor.replace("#", "");
    const c_r = parseInt(hex.substr(0, 2), 16);
    const c_g = parseInt(hex.substr(2, 2), 16);
    const c_b = parseInt(hex.substr(4, 2), 16);
    const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
    return brightness > 155;
}

export async function convertImg(file, cb) {
    if(!file) {
        cb(null);
        return
    }

    let imgObj = null;
    let reader = new FileReader();

    reader.onload = (e) => {
        imgObj = {
            url: reader.result,
            fileName: file.name
        }
    }

    reader.onloadend = () => {
        cb(imgObj)
    }

    reader.readAsDataURL(file)
}

export function getDate() {
    const date = new Date();
    const dd = date.getDate();
    const mm = date.getMonth()+1;
    const yy = date.getFullYear()
    const ddmmyy = dd.toFixed().padStart(2,0) + "/" + mm.toFixed().padStart(2,0) + "/" + yy;
    return ddmmyy
}

export function sortData(sorted, initData) {
    let result
    if (!sorted) {
      result = [...initData].sort((a, b) => {
        var aa = a.lastModified.split("/").reverse().join(),
          bb = b.lastModified.split("/").reverse().join();
        return aa > bb ? -1 : aa < bb ? 1 : 0;
      });
    } else {
      result = initData;
    }

    return result
  }