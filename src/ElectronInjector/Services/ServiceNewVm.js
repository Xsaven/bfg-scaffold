import browserSession from '../Inits/InitBrowserSession';
const {BrowserWindow} = require("electron");
const path = require("path");

export default function () {
    return new BrowserWindow({
        width: 800,
        height: 600,
        backgroundColor: '#fff',
        session: browserSession(),
        title: 'Bfg Scaffold',
        webPreferences: {
            // eslint-disable-next-line no-undef
            preload: path.join(__static, 'preload.js'),
            enableRemoteModule: true,
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            contextIsolation: false,
            webviewTag: true,
            spellcheck: true,
            sandbox:false,
            nativeWindowOpen: true,
            nodeIntegrationInSubFrames:true,
        }
    })
}
