import autoDownloader from './imageRobot/autoDownloader';
import options from './imageRobot/imageMagickOptions';

async function init () {
    await autoDownloader();
    options.textGenerator({
        text:'aaa',
        size:{
            height:500,
            width:720
        },
        position:{
            x:0,
            y:0,
        }
    });
}

init();