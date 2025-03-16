// Create search input
const searchInput = document.createElement('input');
searchInput.placeholder = "Search...";
searchInput.id = "search-box";
document.body.appendChild(searchInput);

searchInput.addEventListener('input', () => {
    chrome.runtime.sendMessage({
        action: "searchInIframe",
        query: searchInput.value.toLowerCase()
    });
});


// Collaps subtasks element
const collapsElm = document.createElement("div");
collapsElm.innerHTML = '<i class="google-material-icons notranslate YPlHZ">expand_more</i>';
collapsElm.id = "collapsBtn";
document.body.appendChild(collapsElm);
collapsElm.addEventListener('click', () => {
    chrome.runtime.sendMessage({
        action: "collaps"
    });
});
