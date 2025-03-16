chrome.runtime.onMessage.addListener((request, sender) => {
    if (request.action === "searchInIframe") {
        chrome.scripting.executeScript({
            target: {tabId: sender.tab.id, allFrames: true},
            func: (query) => {
                try {
                    filterTasks(query);
                } catch (e) {}
            },
            args: [request.query]
        });
    }

    if (request.action === 'collaps') {
        chrome.scripting.executeScript({
            target: {tabId: sender.tab.id, allFrames: true},
            func: () => {
                try {
                    toggleCollapseTasks();
                } catch (e) { }
            }
        });
    }
});
