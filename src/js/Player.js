export default class Settings {

    constructor(elem) {
      this._elem = elem
      elem.onclick = this.onClick.bind(this);
      this.numPlayers = Number(numPlayers.textContent)
    }

    add() {
        
        if (this.numPlayers < 8) {
            numPlayers.textContent = ++this.numPlayers
            return
        }
        numPlayers.textContent = this.numPlayers = 2
    }

    remove() {
        if (this.numPlayers > 2) {
            numPlayers.textContent = --this.numPlayers
            return
        }
        numPlayers.textContent = this.numPlayers = 8
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