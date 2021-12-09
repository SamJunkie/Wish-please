export default class Player {

   /* static numPlayers = 0 */

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

}