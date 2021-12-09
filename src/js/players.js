function setCountPlayers(countPlayers) {
    document.getElementById('players').textContent = countPlayers
}

function addInputForName(countNames, elemSettings, currentCountInput = 0, ) {
    while(countNames > currentCountInput) {
    const playerName = document.createElement('input')
    playerName.classList.add('name')
    elemSettings.append(playerName)
    countNames--
    }
    
}

function removeInputsForName(elemSettings, countPlayers, countInputs) {
    while (countPlayers != countInputs) {
        elemSettings.lastChild.remove()
        countInputs--
    }
    
}

export {setCountPlayers, addInputForName, removeInputsForName} 