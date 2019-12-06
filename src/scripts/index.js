import bootstrap from 'bootstrap'
import { uuid } from 'uuidv4'
import moment from 'moment'
import '../styles/main.css'

let bugsArr = []

class UI {
    constructor() {
        this.bugList = document.querySelector('.bug-list')
        this.bugCard = document.querySelector('bug-card')
        this.newBugBtn = document.querySelector('.new-bug-btn')
        this.submitBugBtn = document.querySelector('.submit-bug-btn')
        this.newBugForm = document.querySelector('.new-bug-form')
        this.formBugName = document.getElementById('bugName')
        this.formAssignedTo = document.getElementById('assignedTo')
        this.formBugDescription = document.getElementById('bugDescription')
        this.formDeadline = document.getElementById('deadline')
        this.bugAlert = document.querySelector('.bug-alert')
    }

    generateBugDOM() {
        let bugListDiv = document.createElement('div')

        return this.bugListDiv
    }

    renderBugs(bugsList) {
        if(bugsList.length > 0) {
            bugsList.forEach((bug) => {
                const newEl = this.generateBugDOM(bug)
                console.log(newEl)
            })
        }

        let bugListHTML = `
        <a href="#">
            <div class="card bug-card text-white mb-3 w-50 h-25 d-flex justify-content-center card border-primary">
                <div class="card-header">This is a test buy case</div>
            </div>
	    </a>
        `
    }

    showAlert(message, messageclass) {
        let html = `
        <div class="alert alert-${messageclass}" role="alert">
            ${message}
        </div>
        `
        this.bugAlert.innerHTML = html
        setTimeout(() => {
            this.bugAlert.classList.add('hide-bug-alert')
        }, 3000)
    }

    submitNewBugForm() {
        let id = uuid()
        let bugName = this.formBugName.value 
        let assignedTo = this.formAssignedTo.value 
        let bugDesc = this.formBugDescription.value 
        let deadline = this.formDeadline.value
        let bugTimeCreated = moment().format("L")
        if(id === '' || bugName === '' || assignedTo === '' || bugDesc === '' || deadline === '' || bugTimeCreated === '' ) {
            this.showAlert('Please make sure all the fields are filled out', 'danger')
        }
        let newBug = ({id, bugName, assignedTo, bugDesc, deadline, bugTimeCreated} = {id, bugName, assignedTo, bugDesc, deadline, bugTimeCreated})
        bugsArr.push(newBug)
    }
}

class Bugs {
    constructor() {
        this.renderBugs
    }

    loadBugs() {
        let bugsJSON = localStorage.getItem('bugs')
        return bugsJSON ? JSON.parse(bugsJSON) : []
    }

    getBugs() {
        return bugsArr
    }

    renderBugs() {
        const bugsJSON = this.loadBugs
    }

    submitBug() {
        console.log('submit bug')
    }

    saveBug() {
        localStorage.setItem('bugs', JSON.stringify(bugsArr))
        location.assign('./')
    }

}

// app js
const bugs = new Bugs
const ui = new UI
bugsArr = bugs.loadBugs()

document.addEventListener('readystatechange', (e) => {
    if (document.readyState === "complete") {
        const bugsList = bugs.getBugs()
        ui.renderBugs(bugsList)
    }
})

ui.newBugForm.addEventListener('submit', (e) => { 
    e.preventDefault()
    ui.submitNewBugForm()
    bugs.saveBug()
})



