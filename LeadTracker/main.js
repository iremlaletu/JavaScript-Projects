
let myLeads = []
const inputBtn = document.querySelector("#input-btn");
const inputEl = document.querySelector("#input-el");
const ulEl = document.querySelector("#ul-el");
const deleteBtn = document.querySelector("#delete-btn"); 
const tabBtn = document.querySelector("#tab-btn")
const leadsFromStorage = JSON.parse(localStorage.getItem("myLeads"))
// Getting "myLeads" change it to array storing it in the variable 


if (leadsFromStorage) {
    myLeads = leadsFromStorage
    render(myLeads)
}


// For getting the current tab from Google
tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log(tabs)
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    });
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i ++){
        listItems += `
            <li>
                <a target='_blank' href="${leads[i]}"> 
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
} 

// For adding
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) ) 
    //First "myLeads" is the key we want to save our items under, second "myLeads" is the what we actually save. grabing the variable to hold myleads then we need to change to the string.

    render(myLeads)
})

//For deleting listen for double click
deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = [] // setting empty array to clear (reassign)
    render(myLeads)
})