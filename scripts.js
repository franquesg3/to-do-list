const button = document.querySelector('.add-task')
const input = document.querySelector('.input-task')
const taskList = document.querySelector('.task-list')

let myTaskList = []

function addNewTask() {
        if (input.value) {
            myTaskList.push({
                item: input.value,
                complete: false
            })
        } else {
            alert('Please, write a task.')
        }
        showTaskList()
        input.value = ''
}

function showTaskList() {
    let newListItem = ''
    myTaskList.forEach((task, index) => {
        newListItem = newListItem + `
        <li class="task ${task.complete && "done"}">
            <img src="./img/checked.png" alt="tarefa-concluida" title="Mark as done" onclick="completeTask(${index})">
            <p>${task.item}</p>
            <img src="./img/trash.png" alt="excluir-tarefa" title="Delete task" onclick="deleteListItem(${index})">
        </li>
        `
    })

    taskList.innerHTML = newListItem

    localStorage.setItem('list', JSON.stringify(myTaskList))

}

function completeTask(index) {
    myTaskList[index].complete = !myTaskList[index].complete
    showTaskList()
}

function deleteListItem(index) {
    myTaskList.splice(index, 1)
    showTaskList()
}

function reloadTasks() {
    const localStorageTasks = localStorage.getItem('list')
    myTaskList = JSON.parse(localStorageTasks)
    showTaskList()
}



reloadTasks()

button.addEventListener('click', addNewTask)

