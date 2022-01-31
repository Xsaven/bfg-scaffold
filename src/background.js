'use strict'

import { app, protocol, BrowserWindow, dialog, shell } from 'electron'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'
const fs = require('fs');
// const url = require('url');
const path = require('path');
const md5 = require('md5');
const contextMenu = require('electron-context-menu');

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
]);



import newVm from './ElectronInjector/Services/ServiceNewVm';

//require('./ElectronInjector/Emits/EmitTest');

contextMenu({
  labels: {
    cut: 'Cut',
    copy: 'Copy',
    paste: 'Paste',
    save: 'Save Image',
    saveImageAs: 'Save Image As…',
    copyLink: 'Copy Link',
    saveLinkAs: 'Save Link As…',
    inspect: 'Inspect Element'
  },
  append: () => { },
  cut: true,
  copy: true,
  paste: true,
  save: true,
  saveImageAs: true,
  copyLink: true,
  saveLinkAs: true,
  inspect: true,

  showLookUpSelection: true,
  showSearchWithGoogle: true,
  showCopyImage: true,
  showCopyImageAddress: true,
  showSaveImage: true,
  showSaveImageAs: true,
  showSaveLinkAs: true,
  showInspectElement: true,
  showServices: true,
});

app.allowRendererProcessReuse = false;


// Select project on program run
function openDir () {
  return dialog.showOpenDialog({
    properties: ['openDirectory']
  }).then(result => {
    if (result.canceled) return app.quit();
    else {
      let dir = result.filePaths[0];
      if (fs.existsSync(dir)) {
        return [dir];
      }
      return openDir()
    }
  }).catch(() => {
    return openDir()
  })
}

let pathProj = null;


async function createWindow() {
  pathProj = await openDir();
  pathProj = pathProj[0];
  process.env.DOC_ROOT_DIR = pathProj;
  let envFile = path.join(pathProj, '.env');
  process.env.DOC_ROOT_ENV = envFile;
  if (!fs.existsSync(envFile)) {
    let dot_env_file_data = `APP_NAME=${path.basename(pathProj)}\n` +
        `APP_KEY=${md5(pathProj)}`;
    fs.writeFileSync(envFile, dot_env_file_data);
  }
  require('dotenv').config({ path: envFile });

  // Create the browser window.
  const win = newVm();

  win.maximize();

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    await win.loadURL('app://./index.html')
    // await win.loadURL(url.format({
    //       pathname: path.join(__dirname, 'index.html'),
    //       protocol: 'file',
    //       slashes: true
    // }))
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', async () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) await createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  try {
      await installExtension(VUEJS_DEVTOOLS)
  } catch (e) {
    console.error('Vue Devtools failed to install:', e.toString())
  }
  await createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

app.on('web-contents-created', (e, contents) => {
  if (contents.getType() === 'webview') {
    // open link with external browser in webview
    contents.on('new-window', async (e, url) => {
      e.preventDefault()
      await shell.openExternal(url)
    })
    contents.on('new-window', (event) => {
      event.preventDefault();
      return false;
    })
    contextMenu({
      window: contents,
      labels: {
        cut: 'Cut',
        copy: 'Copy',
        paste: 'Paste',
        save: 'Save Image',
        saveImageAs: 'Save Image As…',
        copyLink: 'Copy Link',
        saveLinkAs: 'Save Link As…',
        inspect: 'Inspect Element'
      },
      append: () => { },
      cut: true,
      copy: true,
      paste: true,
      save: true,
      saveImageAs: true,
      copyLink: true,
      saveLinkAs: true,
      inspect: true,

      showLookUpSelection: true,
      showSearchWithGoogle: true,
      showCopyImage: true,
      showCopyImageAddress: true,
      showSaveImage: true,
      showSaveImageAs: true,
      showSaveLinkAs: true,
      showInspectElement: true,
      showServices: true,
      prepend: () => [
          // {
          //   label: 'capturePage',
          //   visible: true,
          //   click: async () => {
          //     let ph = await contents.capturePage();
          //     let pr = ph.toDataURL();
          //     console.log(pr);
          //   }
          // },
          {
            label: 'Reload',
            visible: true,
            click: async () => {
              contents.reload();
            }
          },
          {
            label: 'Hard reload',
            visible: true,
            click: async () => {
              contents.reloadIgnoringCache();
            }
          },
          {
            type: 'separator'
          },
          {
            label: 'Back',
            visible: true,
            click: async () => {
              contents.goBack();
            }
          },
          {
            label: 'Stop',
            visible: true,
            click: async () => {
              contents.stop();
            }
          },
          {
            label: 'Forward',
            visible: true,
            click: async () => {
              contents.goForward();
            }
          },
          {
            type: 'separator'
          },
          {
            label: 'Home',
            visible: true,
            click: async () => {
              await contents.loadURL(process.env.APP_URL);
            }
          },
          {
            label: 'Lte Admin',
            visible: true,
            click: async () => {
              await contents.loadURL(process.env.APP_URL + '/lte');
            }
          },
          {
            label: 'Books',
            visible: true,
            click: async () => {
              await contents.loadURL('http://lar.veskod.com');
            }
          },
          {
            label: 'PHP',
            visible: true,
            click: async () => {
              await contents.loadURL('https://php.net');
            }
          },
          {
            label: 'Laravel',
            visible: true,
            click: async () => {
              await contents.loadURL('https://laravel.com');
            }
          },
          {
            label: 'Faker',
            visible: true,
            click: async () => {
              await contents.loadURL('https://github.com/fzaninotto/Faker');
            }
          },
          {
            label: 'VueJs',
            visible: true,
            click: async () => {
              await contents.loadURL('https://vuejs.org');
            }
          },
          {
            label: 'LiveWire',
            visible: true,
            click: async () => {
              await contents.loadURL('https://laravel-livewire.com/');
            }
          },
          {
            label: 'AlpineJs',
            visible: true,
            click: async () => {
              await contents.loadURL('https://alpinejs.dev/');
            }
          },
          {
            label: 'NodeJs',
            visible: true,
            click: async () => {
              await contents.loadURL('https://nodejs.org/en/docs/');
            }
          },
          {
            label: 'Bootstrap',
            visible: true,
            click: async () => {
              await contents.loadURL('https://getbootstrap.com/');
            }
          },
          {
            label: 'Fontawesome',
            visible: true,
            click: async () => {
              await contents.loadURL('https://fontawesome.com/v5.15/icons');
            }
          },
      ],
    });
  }
});
