
let inputBtn = document.querySelector("#input-btn");
const inputEl = document.querySelector("#input-el");
let myLeads = []
const ulEl = document.querySelector("#ul-el");


let leadsFromStorage = JSON.parse(localStorage.getItem("myLeads"))
// getting "myLeads" change it to array storing it in the variable 
console.log(leadsFromStorage)

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) ) 
    //First "myLeads" is the key we want to save our items under, second "myLeads" is the what we actually save. grabing the variable to hold myleads then we need to change to the string.

    renderLeads()
    console.log( localStorage.getItem("myLeads") )
})

function renderLeads() {
    let listItems = ""
    for (let i = 0; i < myLeads.length; i ++){
        listItems += ` 
        <li>
            <a target='_blank' href="${myLeads[i]}"> 
                ${myLeads[i]}
            </a>
        </li> `
    }
    ulEl.innerHTML = listItems
} 


