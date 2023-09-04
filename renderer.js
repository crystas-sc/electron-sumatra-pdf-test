const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')
// setButton.addEventListener('click', async () => {
//     //   const title = titleInput.value
//     //   console.log("setTitle",await window.electronAPI.setTitle(title))
//     const printerList = await window.electronAPI.getPrinters()
//     console.log("getPrinters", printerList)
// })
const printerListUl = document.getElementById("printerListUl")

async function showPrinters() {
    // printerListUl.innerHTML = "Loading..."
    // const form = document.getElementById("form")
    // const url = form.url.value
    // const pages = form.pages.value

    const printerList = await window.electronAPI.getPrinters()
    // const liItems = printerList.map(printer => {
    //     return `<li>${printer.deviceId} -> <button onclick="print('${printer.deviceId}','${url}','${pages}')">Print sample document</button> </li>`
    // })
    // printerListUl.innerHTML = liItems;
}

async function print(deviceId, docUrl, pages) {
    // printerListUl.innerHTML = ""
    console.log(await window.electronAPI.printDoc(deviceId, docUrl, pages))
    printerListUl.innerHTML = "Print initiated"
}

function nosubmit(e){
    e.preventDefault()
    e.stopPropogation()
    return false;
}