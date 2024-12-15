const ulEl = document.querySelector("#ul-el");
const inputEl = document.querySelector("#input-el");
const saveBtn = document.querySelector("#save-btn");
const resetBtn = document.querySelector("#reset-btn");
const saveTab = document.querySelector("#save-tab");

let myLead = [];

// Render values
function render() {
    let listItems = "";
    for (let i = 0; i < myLead.length; i++) {
        listItems += `<li>
                        <a href='${myLead[i]}' target='_blank'>
                        ${myLead[i]}
                        </a>
                    </li>`;
    }
    ulEl.innerHTML = listItems;
}

// Getting all the previous items
let storedLeads = localStorage.getItem("myLeadData");
if (storedLeads) {
    myLead = JSON.parse(storedLeads);
    render();
}

// Save Key Working
saveBtn.addEventListener("click", function () {
    const lead = inputEl.value.trim();
    myLead.push(lead);
    inputEl.value = "";
    localStorage.setItem("myLeadData", JSON.stringify(myLead));
    render();
})

// Save Tab Working
saveTab.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (!myLead.includes(tabs[0].url)) {
            myLead.push(tabs[0].url);
            localStorage.setItem("myLeadData", JSON.stringify(myLead));
            render();
        }

    })
})
// Reset Btn Working
resetBtn.addEventListener("click", function () {
    myLead = [];
    localStorage.removeItem("myLeadData");
    ulEl.innerHTML = "";
})


