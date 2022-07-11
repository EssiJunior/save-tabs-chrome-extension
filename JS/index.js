let myLeads = []
const inputEl = document.querySelector("#input-el")
const button = document.querySelector("#input-btn")
const deleteButton = document.querySelector("#delete-btn")
const tabBtn = document.querySelector("#tab-btn")
const ulEl = document.querySelector("#ul-el")

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
} else {

}
button.addEventListener('click', () => {
    val = inputEl.value
    myLeads.push(val)
    inputEl.value = " "
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
        // ulEl.innerHTML += "<li>" + val + "</li>"
})

deleteButton.addEventListener("dblclick", () => {
    localStorage.clear()
    myLeads = []
    render(myLeads)

})

tabBtn.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })

})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
        <li>
            <a href='${leads[i]}' target='_blank'>
                ${leads[i]}
            </a>
        </li>`
            // const li = document.createElement("li")
            // li.textContent = leads[i]
            // ulEl.append(li)
    }
    ulEl.innerHTML = listItems
}