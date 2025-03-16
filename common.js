function filterTasks(query) {
    tasks(task => {
        const itemText = task.textContent.toLowerCase();

        if (query.startsWith('#')) {
            const tags = query.split('#').map(tag => '#' + tag.trim()).filter(Boolean);
            const matchesAllTags = tags.every(tag => itemText.includes(tag));
            task.style.display = matchesAllTags ? '' : 'none';
        } else {
            task.style.display = itemText.includes(query) ? '' : 'none';
        }
    })
}

function toggleCollapseTasks() {
    toogleCollaps(document.body);
    toggleCollapseTask();
    
    tasks(task => {
        task.removeAttribute('data-collapsed');
        task.querySelector('div').style.display = '';
    });
}

function toggleCollapseTask() {
    console.log('Toggle Collaps Task Initialized');
    
    tasks(task => {
        task.onclick = function (e) {
            const parentId = task.getAttribute('data-id');

            toogleCollaps(task);
            tasks(childTask => {
                const childId = childTask.querySelector('div').getAttribute('data-parent-task-id');

                if (childId === parentId) {
                    childTask.querySelector('div').style.display = task.getAttribute('data-collapsed') === 'true' ? 'none' : 'block';
                }
            })
        }
    })
}

function tasks(callback) {
    const TASK_ID = '[role="listitem"][data-type="0"]';

    getTaskLists().forEach(container => {
        const items = container.querySelectorAll(TASK_ID);
        items.forEach(callback);
    })
}

function getTaskLists() {
    const TASK_LIST_ID = '[data-task-list-id]';
    
    return document.querySelectorAll(TASK_LIST_ID);
}

function toogleCollaps(element) {
    if (element.getAttribute('data-collapsed') === 'true') {
        element.setAttribute('data-collapsed', 'false');
    } else {
        element.setAttribute('data-collapsed', 'true');
    }
}
