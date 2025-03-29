const type = document.getElementById('type')
const constructor = document.getElementById("constructor")
const target = document.getElementById("target")
const create = document.getElementById("create")
const hidden = document.getElementById("hidden")

const triggers = new Set(["h1", "span", "p"])

function createElem(tag, content){
    const newElement = document.createElement(tag)
    newElement.classList.add("created")
    newElement.draggable = true
    newElement.dataset.id = crypto.randomUUID()
    if(tag === "input") newElement.placeholder = 'input teg'

    const pre = document.createElement('pre')
    pre.textContent = `<${tag}>`

    if(content) {
        newElement.textContent = content
        newElement.appendChild(pre)
    }

    newElement.appendChild(pre)

    return newElement
}

function pushElement(node, target){
    target.appendChild(node)
}

type.addEventListener('change', function(){
    if(triggers.has(this.value)){
        hidden.type = "text"
    } else{
        hidden.type = "hidden"
        hidden.value = ""
    }
})

create.addEventListener('click', () => {
    const newElem = createElem(type.value, hidden.value)
    pushElement(newElem, constructor)
})

constructor.addEventListener("dragstart", e => {
    if(e.target === e.currentTarget) return

    e.target.classList.add("dragging")
    e.dataTransfer.setData("text/plain", e.target.dataset.id)
})

target.addEventListener("dragover", e => e.preventDefault())

target.addEventListener("drop", e => {

    if(e.target.nodeName !== "DIV") return
    const id = e.dataTransfer.getData("text/plain")
    const droppable = document.querySelector(`[data-id="${id}"]`)

    e.target.appendChild(droppable)
    droppable.classList.remove("dragging")
    droppable.draggable = false
})

// ----------------------------------------------------------------------------------------

                         // Task Elevator

const elevators = document.querySelectorAll('.elevator div')
const floor = document.querySelector('.floor')
const floorCount = 20

const arr = [
    { elevator: 1, count: 0 },
    { elevator: 2, count: 0 },
    { elevator: 3, count: 0 },
]

function TaskElevatorCreateElem(teg, text, attribute) {
    const newElem = document.createElement(teg)
    newElem.textContent = text
    if (attribute) newElem.setAttribute("index", attribute)
    return newElem
}

for (let i = floorCount; i >= 1; i--) {
    const div = TaskElevatorCreateElem("div", `floor ${i}`)
    div.appendChild(TaskElevatorCreateElem("button", "elevator", `${i}`))
    floor.appendChild(div)
}

floor.addEventListener("click", function (e) {
    if (e.target.nodeName !== "BUTTON") return
    const currentFloor = e.target.getAttribute("index")

    const currentElevator = []

    arr.forEach((elem) => {
        let currentElement = elem.count - currentFloor
        if (currentElement < 0) currentElement = currentElement * -1
        currentElevator.push(currentElement)
    });

    const min = currentElevator.reduce((acc, elem, index) =>
            acc.count > elem ? { ind: index, count: elem } : acc,
        { ind: 0, count: currentElevator[0] }
    )

    arr[min.ind].count = currentFloor

    elevators[min.ind].style.transform = `translateY(-${currentFloor - 1}00%)`
})