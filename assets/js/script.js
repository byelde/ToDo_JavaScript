let tasksList = []

const addTask = () => {

    let tasksInput = document.querySelector('input.taskName')
    let task = tasksInput.value
    if (task === '') {
        window.alert('Insert a valid task')
    } else {

        tasksList.push({
            task: task,
            done: false
        })

        tasksInput.value = ''
        
        saveData()

        reloadData()
    }
}

const showTasks = () => {
    const outputModel = (task, index) => `<li class=${task.done && 'done'}>
                                            <img src="/assets/img/check.png" onclick="completeTask(${index})">
                                            <p>${task.task}</p>
                                            <img src="./assets/img/trash-bin.png" onclick="delTask(${index})"> 
                                        </li>` 

    let tasksOutput = document.querySelector('.taskList') 
    tasksOutput.innerHTML = ''

    for ([index, task] of tasksList.entries()) {
        tasksOutput.innerHTML += outputModel(task, index)
    }
}

const delTask = (index) => {
    tasksList.splice(index,1)
    saveData()
    showTasks()
}

const completeTask = (index) => {
    tasksList[index].done = !tasksList[index].done
    // showTasks()
    saveData()
    showTasks()
}

const reloadData = () => {
    const data = localStorage.getItem('List of tasks')

    if (data) {
        tasksList = JSON.parse(data)
    }

    showTasks()
}

const saveData = () => {
    localStorage.setItem('List of tasks', JSON.stringify(tasksList))
}

reloadData()