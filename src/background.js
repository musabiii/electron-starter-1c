"use strict";

import { app, protocol, BrowserWindow, ipcMain } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS3_DEVTOOLS } from "electron-devtools-installer";
import { exec } from "child_process";
import fs from "fs";
import os from "os";
const isDevelopment = process.env.NODE_ENV !== "production";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

let winMain;

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon:process.env.PUBLIC_URL + '/favicon1.ico',
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
    },
  });

  console.log("__dirname",__dirname)
  winMain = win;

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }
  // win.webContents.send('mount',readBaseList())
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
  // winMain.webContents.send('mount',readBaseList())
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

ipcMain.on("someevent", (e, args) => {
  // console.log(e,args);
  console.log("first");
  // exec('start calc');
  // exec('"C:\\Program Files\\1cv8\\common\\1cestart.exe" ENTERPRISE /DisableStartupMessages /F "C:\\dev\\base\\Новая папка"');
  console.log(process.env.HOME);
  console.log(process.platform);
  const baseList = readBaseList();
  console.log(baseList);
  logToFront(os.userInfo());
  winMain.webContents.send('mount',readBaseList());

});

ipcMain.on('getList',()=>{
  winMain.webContents.send('mount',readBaseList());
})


function readBaseList() {
  // fs.readFile()
  // ibases.v8i

  // C:\Users\Front\AppData\Roaming\1C\1CEStart\ibases.v8i
  const pathList =
    // process.env.HOME + "\\AppData\\Roaming\\1C\\1CEStart\\ibases.v8i";
    os.userInfo().homedir + "\\AppData\\Roaming\\1C\\1CEStart\\ibases.v8i";

    // const pathList = "C:\\Users\\Front\\AppData\\Roaming\\1C\\1CEStart\\ibases.v8i";

    logToFront(process.env.HOME)
  try {
    const baseArr = fs.readFileSync(pathList, "utf-8").toString().split("\n");
    const baseObjArr = [];
    for (let line of baseArr) {
      if (line.indexOf("[") >= 0 && line.indexOf("]") >= 0) {
        const name = line.substring(1, line.length - 1);
        const baseObj = { name: name };
        baseObjArr.push(baseObj);
        continue;
      }
      if (line.includes("Connect=File=")) {
        baseObjArr[baseObjArr.length - 1].path = line.substring(13);
        continue;
      }
      const linearr = line.split("=");
      baseObjArr[baseObjArr.length - 1][linearr[0]] = linearr[1] + "";
    }

    //  console.log(baseObjArr)
    return baseObjArr;
  } catch (error) {
    console.log(error);
  }
  return {};
}


function logToFront(message) {
  winMain.webContents.send('log',message)
}