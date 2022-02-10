export default class Settings {

    constructor(elem) {
      this._elem = elem
      elem.onclick = this.onClick.bind(this);
      this.numPlayers = Number(numPlayers.textContent) 
    }

    createInput() {
        let input = document.createElement('input')
        input.type='text'
        input.classList.add('players__name')
        input.placeholder='Enter player name'
        return input
    }

    removeInput() {
        while (players.querySelector('.body').childElementCount > Number(numPlayers.textContent)) {
            players.querySelector('.players__name').remove()
        }
        
    }

    add() {
        if (this.numPlayers < 8) {
            numPlayers.textContent = ++this.numPlayers
            while (players.querySelector('.body').childElementCount < Number(numPlayers.textContent)) {
                players.querySelector('.body').append(this.createInput())
            }
            
            return
        }
        numPlayers.textContent = this.numPlayers = 2
        this.removeInput()
    }

    remove() {
        if (this.numPlayers > 2) {
            numPlayers.textContent = --this.numPlayers
            this.removeInput()
            return
        }
        numPlayers.textContent = this.numPlayers = 8
        while (players.querySelector('.body').childElementCount < Number(numPlayers.textContent)) {
            players.querySelector('.body').append(this.createInput())
        }
    }

    onClick(event) {
      let action = event.target.dataset.action;
      if (action) {
        this[action]();
      }
    }
  }



/* export default class Player {



    constructor(name, allTasks) {
        this.name = name
        this.points = 0
    }

    sortTasks(allTasks) {

    }

    addPoints(difficultTask) {
        if(difficultTask === 'special') {
           this.points =+ 2
           return }
        this.points++
    }

    printPoints() {
        return {
            name: this.name, 
            points: this.points,
            tasks: this.tasks
        }
    }

} */