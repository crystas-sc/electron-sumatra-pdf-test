const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    setTitle: async (title) => {
        const res= ipcRenderer.send('set-title', title)
      
    },
    getPrinters: async () => {
        // const res= ipcRenderer.sendSync('set-title', title)
        const res = await ipcRenderer.invoke('get-printers')
        console.log("preload: getPrinters", res)
        return res;
    },
    printDoc: async (deviceId, docUrl,pages)=>{
        const res = await ipcRenderer.invoke('print-doc',{deviceId, docUrl, pages})
        console.log("preload: printDoc", res)
        return res;
    }
})