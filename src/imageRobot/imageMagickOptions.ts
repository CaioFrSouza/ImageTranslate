import path from 'path';
import child_process from 'child_process';

interface infos {
    size?:{
        height: number,
        width: number
    },
    position:{
        x:number,
        y:number
    }
    fontSize?: number,
    text: string,
    color?: string,
    background?: string,
    input?: string,
    output?: string,
}

class options {

    magickPath: string;

    constructor() {
        this.magickPath = path.resolve(__dirname,'..','imagemagick','magickPath');
    }

    public textGenerator(infos?:infos) {
        child_process.spawnSync(path.resolve(this.magickPath,'convert'),[
            '-background',`${infos?.background || 'white'}`,
            '-fill',`${infos?.color || 'black'}`,
            `${infos?.fontSize? '-pointsize' : ''}`,`${infos?.fontSize? infos.fontSize : ''}`,
            `${infos?.size? '-size' : ''}`,`${infos?.size? `${infos.size.height}x${infos.size.width}` : ''}`,
            `label:${infos?.text}`,
            path.resolve(__dirname,'tess.png')
        ]);
    }
}

export default new options();