const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { print, getPrinters } = require("pdf-to-printer");
const fs = require('fs');
const { Readable } = require('stream');
const { finished } = require('stream/promises');


function createWindow() {
    const mainWindow = new BrowserWindow({
        show: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    mainWindow.maximize();
    mainWindow.show();
    // mainWindow.setMenu(null)

    ipcMain.handle('get-printers', async (event, title) => {
        // const result = await doSomeWork(someArgument)
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        win.webContents.print({
            silent: true,
            // margins:{
            //     marginType : "custom",
            //     left:100,
            //     right:100,
            //     top:100,
            //     bottom:50,
            // },
            // scaleFactor : 3
           
        },(success, failureReason)=>{
            console.log("print res",success, failureReason)
        })
        // const list = await win.webContents.getPrintersAsync();
        const list = await getPrinters()
        console.log(" ipcMain.handle get printers", list)
        return list;
    })
    ipcMain.handle('print-doc', async (event, { deviceId, docUrl, pages }) => {
        try {
            await dowloadPdf(docUrl)
            print("tmpdoc.pdf", { printer: deviceId, pages }).then(console.log);
        } catch (err) {
            return err.message
        }
        return "successful"
    })



    //   ipcMain.on('set-title', (event, title) => {
    //     const webContents = event.sender
    //     const win = BrowserWindow.fromWebContents(webContents)
    //     win.setTitle(title)
    //     console.log("return")
    //     return "retruned-test-string"
    //   })

    mainWindow.loadFile('index.html')
}



app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})



async function dowloadPdf(url) {
    const stream = fs.createWriteStream('tmpdoc.pdf');
    const { body } = await fetch(url);
    await finished(Readable.fromWeb(body).pipe(stream));
}