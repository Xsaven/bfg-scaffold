import {ipcMain} from "electron";

ipcMain.handle("test-channel", function (event, data = null) {
    console.log('>>', data);
    return {test: data};
});
