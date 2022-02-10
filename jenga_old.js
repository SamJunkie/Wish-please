import Player from './Player'
import {setCountPlayers, addInputForName, removeInputsForName} from './players'
import tasks from '../../jenga_first.json'

const $scene = document.querySelector('.scene')
const $controls = document.querySelector('.controls')
const $task = document.querySelector('.task')
const $text = document.querySelector('.text')
const $start = document.getElementById('start')
const $getNormalTask = document.createElement('button')
const $getSpecialTask = document.createElement('button')
const $restart = document.createElement('button')
const $rangePlayers = document.getElementById('rangePlayers')
const $settings = document.querySelector('.settings')

const players = []
const massiveTasks = {}

let numberPlayers = 2

//START 
$start.addEventListener('click', () => {
    
    return Promise.resolve(saveNames(getInputsForNames()))
            .then(sortPlayers(players))
            .then(renderGame) 
    })





// Полуаем задачу из массива и возвращаем номер задачи

function getTask() {
    let numberOfTask = 0
    return function (massiveTasks, id) {

        const taskAndCountFromArray = {
            count: numberOfTask,
            arr: massiveTasks[id].tasks[numberOfTask++]
        }

        if (numberOfTask === massiveTasks[id].tasks.length) {
            numberOfTask = 0
        }
        /* console.log(massiveTasks) */
        return taskAndCountFromArray
    }
}

const getNormalTask = getTask()
const getSpecialTask = getTask()


function randomizeTasks(tasks) {

    for (let value of Object.values(tasks)) {
        for (let i = 0; i <= value.tasks.length - 1; i++) {
            value.tasks.sort(() => Math.random() - 0.5);
        }
    }
}

//рендер экрана игры

function renderGame() {
    $task.classList.toggle('hide')
    $restart.textContent = 'RESTART'
    $getNormalTask.textContent = 'EASY'
    $getNormalTask.id = 'normal'
    $getSpecialTask.textContent = 'HARD'
    $getSpecialTask.id = 'special'
    $restart.classList.add('button', 'restart')
    $getNormalTask.classList.add('button', 'active')
    $getSpecialTask.classList.add('button', 'active')
    $settings.classList.add('hide')
    
    initGame() 
    /* assigningTasksToPlayers(numberPlayers, tasks) */
}
//подсчет общего количество заданий
function countingTheNumberOfTasks(tasks) {
    let numberOfTasks = 0
    for (let val of Object.values(tasks)) {
        
        numberOfTasks += val.length
        
    }
    
    return numberOfTasks
}
//распределение заданий по игрокам
/* function assigningTasksToPlayers(numberPlayers, tasks) {
    let countTasksForPlayer = Math.ceil(countingTheNumberOfTasks(tasks) / numberPlayers),
        normalLength = tasks.normal.length,
        specialLength = tasks.special.length,
        indexOfLastNormalTask = 0,
        indexOfLastSpecialTask =0


    for (let player of players) {
        let indexOfCurrentTask = 0

        while (true) {
            if (indexOfCurrentTask === Math.ceil(countTasksForPlayer / numberPlayers)) break //выдано достаточное количество заданий

            if (normalLength - 1 < indexOfLastNormalTask) indexOfLastNormalTask = 0
            if (specialLength - 1 < indexOfLastSpecialTask) indexOfLastSpecialTask = 0

            player.tasks.normal.push(tasks.normal[normalLength - 1 - indexOfLastNormalTask])
            player.tasks.special.push(tasks.special[specialLength - 1 - indexOfLastSpecialTask])
            ++indexOfLastNormalTask
            ++indexOfLastSpecialTask
            ++indexOfCurrentTask
        }
        console.log(player.printPoints());
    }


} */

async function initGame() {
    /* const json = await getData(urlJson)
    console.log(json) */
    
    for (let [key, value] of Object.entries(tasks)) {
        massiveTasks[key] = {
            tasks: value,
            stillTasksForGame: true
        }
    }
    randomizeTasks(massiveTasks)

    $controls.prepend($getNormalTask)
    $controls.prepend($getSpecialTask)
    $start.removeEventListener('click', renderGame)
    $start.remove()
    $scene.style.flexDirection = 'column-reverse'
}

//блокирование кнопки задач, если они закончились

function blockButtonTask(typeOfTask, numberShowTasks) {

    if (numberShowTasks === massiveTasks[typeOfTask].tasks.length - 1) {

        document.getElementById(typeOfTask).classList.add('inactive')
        document.getElementById(typeOfTask).classList.remove('active')
        massiveTasks[typeOfTask].stillTasksForGame = false
        testGameOver(massiveTasks)
    }
}

function showTask(textElement, task) {
    textElement.textContent = task
}



$getNormalTask.addEventListener('click', (e) => {
    const typeOfTasks = e.target.id
    const {arr: task, count} = getNormalTask(massiveTasks, typeOfTasks)

    blockButtonTask(typeOfTasks, count)
    showTask($text, task)
})

$getSpecialTask.addEventListener('click', (e) => {
    const typeOfTasks = e.target.id
    const {arr: task, count} = getSpecialTask(massiveTasks, typeOfTasks)

    blockButtonTask(typeOfTasks, count)
    showTask($text, task)
})

$restart.addEventListener('click', () => {   
    resetGame(massiveTasks)
})


//проверяем в объекте заданий что в каждом типе выданы все задания

function testGameOver(massiveTasks) {
    const countTypeOfTasks = Object.values(massiveTasks).length
    let completedTasks = 0

    for (let value of Object.values(massiveTasks)) {
        if (value.stillTasksForGame) {
            return
        }

        completedTasks++

        if (completedTasks === countTypeOfTasks) {
            gameOver()
        }
    }

}

function gameOver() {
    $controls.append($restart)
}

function resetGame(massiveTasks) {
    
    for (let typeOfTask of Object.values(massiveTasks)) {
        typeOfTask.stillTasksForGame = true
    }

    randomizeTasks(massiveTasks)
    $restart.remove()
    $getNormalTask.classList.add('active')
    $getSpecialTask.classList.add('active')
    $getNormalTask.classList.remove('inactive')
    $getSpecialTask.classList.remove('inactive')
    $text.textContent = ''
}

$rangePlayers.addEventListener('input', (e) => {
    numberPlayers = e.target.value
    setCountPlayers(numberPlayers)
    
    let countInputs = getInputsForNames().length; //текущее кол-во инпутов с классом name

    (numberPlayers > countInputs) ? addInputForName(numberPlayers, $settings, countInputs) : removeInputsForName($settings, numberPlayers, countInputs)
    
    
})

function getInputsForNames() {
   return Array.from($settings.children).filter(elem => elem.classList.contains('name'))
} 

addInputForName($rangePlayers.value, $settings)

function saveNames(inputsCollection) {
    for (let input of inputsCollection) {
        players.push(new Player(input.value))
    }    
}

function sortPlayers(players) {
    return players.sort(() => Math.random() - 0.5)
}

function showNamePlayer(player) {
    return player.name
}

function showPointsPlayer(player) {
    return player.points
}