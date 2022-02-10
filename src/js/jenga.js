import Settings from './Player'
import {setCountPlayers, addInputForName, removeInputsForName} from './players'
import tasks from '../../jenga_first.json'

const $scene = document.querySelector('.scene')
const $controls = document.querySelector('.controls')
const $task = document.querySelector('.task')
const $text = document.querySelector('.text')
const $start = document.getElementById('start')
/* const $getTask = document.createElement('button') */
const $restart = document.createElement('button')
const $rangePlayers = document.getElementById('rangePlayers')
const $settings = document.querySelector('.settings')
const $namePlayer = document.querySelector('.player')
const $difficult = document.querySelector('.difficult')

const players = []
const getPlayer = getCurrentPlayer(players)
let numberPlayers = 2

//START 
$start.addEventListener('click', () => {
    
    return Promise.resolve(saveNames(getInputsForNames()))
            .then(sortPlayers(players))
            .then(renderGame)
            .then($scene.click())
    })


/*
================== Количество игроков ==============================
*/
new Settings (numberOfPlayers)

/*
====================================================================
*/

// Получаем задачу из массива и возвращаем номер задачи

function getTask() {
    let numberOfTask = 0
    return function (tasks) {
        let typeTask = (Math.random() < 0.5) ? 'special' : 'normal'
        let randomTask = Math.floor(Math.random() * (tasks[typeTask].length));
        return {
            text: tasks[typeTask][randomTask],
            type: typeTask
        }
    }
}

const getqTask = getTask()



function randomizeTasks(tasks) {

    for (let value of Object.values(tasks)) {
        
        for (let i = 0; i <= value.length - 1; i++) {
            value.sort(() => Math.random() - 0.5);
        }
    }
    
}

//рендер экрана игры

function renderGame() {
    $task.classList.toggle('hide')
    $restart.textContent = 'RESTART'
    $restart.id = 'normal'
    $restart.classList.add('button', 'restart')
    $settings.classList.add('hide')
    
    initGame() 
}

async function initGame() {
    randomizeTasks(tasks)
    $controls.prepend($restart)
    $start.removeEventListener('click', renderGame)
    $start.remove()
    $scene.style.flexDirection = 'column-reverse'

    $scene.addEventListener('click', iterationGame)
}

function showTask(textElement, task) {
    
    $difficult.textContent = '⭐'
    if (task.type === 'special') {
        $difficult.textContent += '⭐'
    }
    textElement.textContent = task.text
}

function iterationGame() {

    let task = getqTask(tasks)
    randomizeTasks(tasks)      
    showNamePlayer(getPlayer.next())
    showTask($text, task)
}




$restart.addEventListener('click', () => {   
    resetGame(tasks)
})


//проверяем в объекте заданий что в каждом типе выданы все задания

function gameOver() {
    $controls.append($restart)
}
//сброс игры, показ очков
function resetGame(tasks) {

    randomizeTasks(tasks)
    $task.classList.add('hide')
    $restart.classList.add('hide')
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

function* getCurrentPlayer() {
    let player = 0,
        length = players.length
    while (true) {
        yield players[player++].name
        if (player === length) player = 0
    }
}

function showNamePlayer(player) {
    $namePlayer.textContent = player.value
}

function showPointsPlayer(player) {
    return player.points
}