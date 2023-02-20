let bookmarks = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const bMarksFromLocalStorage = JSON.parse(localStorage.getItem("bookmarks"))

const render = (leads) => ulEl.innerHTML = leads.map( x => `<li><a target='_blank' href='${x[1]}'>${x[0]}</a></li>` ).join('')

if (bMarksFromLocalStorage) {
    bookmarks = bMarksFromLocalStorage
    render(bookmarks)
}

tabBtn.addEventListener("click", () => {    
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        bookmarks.push([tabs[0].title, tabs[0].url])
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks) )
        render(bookmarks)
    })
})

inputBtn.addEventListener("click", () => {
    const input = inputEl.value.split("|")
    // Если тайтл не указан используем url
    input.length > 1 ? bookmarks.push(input) : bookmarks.push([input, input]);
    inputEl.value = ""
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks) )
    render(bookmarks)
})

deleteBtn.addEventListener("dblclick", () => {
    localStorage.clear()
    bookmarks = []
    render(bookmarks)
})