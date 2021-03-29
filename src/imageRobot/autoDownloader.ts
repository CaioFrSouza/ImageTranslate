import os from 'os';
import fs from 'fs';
import path from 'path';
import Axios from 'axios';
import {Spinner} from 'cli-spinner';
import unzipper from 'unzipper';

const MagicPath = path.resolve(__dirname,"..","imagemagick");

async function download(url: string, file: fs.WriteStream, system: string) {

    const spinner = new Spinner(`Downloading imageMagick ${system}.. %s`);
    spinner.setSpinnerString('|/-\\');
    spinner.start();

    const res = await Axios({
        url,
        method:"GET",
        responseType:"stream"
    });

    res.data.pipe(file);
    
    return new Promise((resolve,reject) => {
        file.on("finish", () => {
            resolve(null);
            spinner.stop();
        });
        
        file.on("error", (err) => {
            reject(err);
            spinner.stop();
        });
})}

async function unzip() {
    const file = fs.createReadStream(path.resolve(MagicPath,"magick"))

    file.pipe(unzipper.Extract(
        {path:path.resolve(MagicPath,"magickPath")}
        ));

    return new Promise((resolve,reject) => {
        file.on("finish", resolve);
        file.on("error", reject);
});
}

async function init() {
    if (!fs.existsSync(MagicPath)){
        const system = os.platform();
        fs.mkdirSync(MagicPath);
        const file = fs.createWriteStream(path.resolve(MagicPath,"magick"));
    
        const systemDownload = {
            win32: "https://download.imagemagick.org/ImageMagick/download/binaries/ImageMagick-7.0.11-4-portable-Q16-x64.zip",
            // darwin: "http://download.imagemagick.org/ImageMagick/download/binaries/ImageMagick-x86_64-apple-darwin20.1.0.tar.gz",
            linux: "http://download.imagemagick.org/ImageMagick/download/binaries/magick",
        }
    
        switch(system){
            case 'win32':
                await download(systemDownload[system],file, system);
                await unzip();
            break;

            case 'linux':
                await download(systemDownload[system],file, system);
                await unzip();
            break;
    }
    }
}

export default init;