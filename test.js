class RadioTest {
    // питання, список відповідей (впорядкований)
    // правильна відповідь - перша відповідь у списку
    constructor(question, answers) {
        this.question = question
        this.answers = answers
    }

    getHtmlCode() {
        let questionLabel = document.createElement("label")
        questionLabel.innerText = this.question
        let shuffledAnswers = Array.from(this.answers)
        shuffledAnswers.sort(() => Math.random() - 0.5)
        let formedAnswers = []
        for (let answer of shuffledAnswers) {
            let questionLabel = document.createElement("input")
            questionLabel.setAttribute("type", "radio")
            questionLabel.setAttribute("name", this.question)
            questionLabel.setAttribute("value", answer)
            let formedAnswer = questionLabel.outerHTML + " " + answer + "<br>"
            formedAnswers.push(formedAnswer)
        }
        
        let htmlCode = questionLabel.outerHTML + '<br>'
        for (let answer of formedAnswers) {
            htmlCode += "\n" + answer 
        }
        
        return htmlCode
    }

    evaluateAnswer() {
        var choices = document.getElementsByName(this.question)
        for (let i = 0; i < choices.length; i++) {
            if (choices[i].checked) {
                var choice = choices[i].getAttribute("value")
            }
        }
        if (choice == this.answers[0]) {
            return 1
        }
        return 0
    }
}

class CheckboxTest {
    // питання, список відповідей (впорядкований), кількість правильних відповідей (перші n відповідей у впорядкованому списку відповідей)
    constructor(question, answers, numberOfRightAnswers) {
        this.question = question
        this.answers = answers
        this.numberOfRightAnswers = numberOfRightAnswers
    }

    getHtmlCode() {
        let questionLabel = document.createElement("label")
        questionLabel.innerText = this.question
        let shuffledAnswers = Array.from(this.answers)
        shuffledAnswers.sort(() => Math.random() - 0.5)
        let formedAnswers = []
        for (let answer of shuffledAnswers) {
            let checkbox = document.createElement("input")
            checkbox.setAttribute("type", "checkbox")
            checkbox.setAttribute("name", this.question)
            checkbox.setAttribute("value", answer)
            let formedAnswer = checkbox.outerHTML + " " + answer + "<br>"
            formedAnswers.push(formedAnswer)
        }
        
        let htmlCode = questionLabel.outerHTML + '<br>'
        for (let answer of formedAnswers) {
            htmlCode += "\n" + answer 
        }
        
        return htmlCode
    }

    evaluateAnswer() {
        var choices = document.getElementsByName(this.question)
        let score = 0;
        let checked = 0;
        for (let i = 0; i < choices.length; i++) {
            if (choices[i].checked) {
                var choice = choices[i].getAttribute("value")
                for (let j = 0; j < this.numberOfRightAnswers; j++) {
                    if (this.answers[j] == choice) {
                        score++
                        checked--
                    }
                } 
                checked++
            }
        }
        return Math.max(score - checked, 0);
    }
}

class InputTest {
    // Питання, відповідь
    constructor(question, answer) {
        this.question = question
        this.answer = answer
    }

    getHtmlCode() {
        let questionLabel = document.createElement("label")
        questionLabel.innerText = this.question
        let input = document.createElement("input")
        input.setAttribute("type", "text")
        input.setAttribute("name", this.question)
        input.setAttribute("size", 30)
        let formedAnswer = input.outerHTML + "<br>"
        let htmlCode = questionLabel.outerHTML + '<br>' + formedAnswer
        
        return htmlCode
    }

    evaluateAnswer() {
        let testArea = document.getElementById("test-area")
        let inputValue = document.getElementsByName(this.question)[0].value

        testArea.innerHTML = inputValue + testArea.innerHTML;
        if (inputValue == this.answer) {
            return 1
        }
        return 0;
    }
}

class DropdownTest {
    // питання, список відповідей (впорядкований)
    // правильна відповідь - перша відповідь у списку
    constructor(question, answers) {
        this.question = question
        this.answers = answers
    }

    getHtmlCode() {
        let questionLabel = document.createElement("label")
        questionLabel.innerText = this.question
        questionLabel.setAttribute("for", this.question)
        let select = document.createElement("select")
        select.setAttribute("name", this.question)
        select.setAttribute("id", this.question)
        let shuffledAnswers = Array.from(this.answers)
        shuffledAnswers.sort(() => Math.random() - 0.5)
        let formedAnswers = []
        for (let answer of shuffledAnswers) {
            let questionLabel = document.createElement("option")
            questionLabel.setAttribute("value", answer)
            questionLabel.innerHTML = answer
            let formedAnswer = questionLabel.outerHTML
            formedAnswers.push(formedAnswer)
        }
        
        for (let answer of formedAnswers) {
            select.innerHTML += "\n" + answer 
        }
        let htmlCode = questionLabel.outerHTML + '<br>' + select.outerHTML + '<br>'
        
        return htmlCode
    }

    evaluateAnswer() {
        var sel = document.getElementById(this.question)
        let val = sel.value
        if (val == this.answers[0]) {
            return 1
        }
        return 0
    }
}

class DragDropTest {
    // Питання, відповіді (в вірній послідовності), ім'я тесту (унікальне, потрібно для обробки відповідей)
    constructor(question, answers, name) {
        this.question = question
        this.answers = answers
        this.name = name
    }

    getHtmlCode() {
        let questionLabel = document.createElement("label")
        questionLabel.innerText = this.question
        let shuffledAnswers = Array.from(this.answers)
        shuffledAnswers.sort(() => Math.random() - 0.5)
        let formedAnswers = []
        for (let answer of shuffledAnswers) {
            let option = document.createElement("div")
            option.setAttribute("class", "box " + this.name)
            option.setAttribute("draggable", true)
            option.innerHTML = answer

            let formedAnswer = option.outerHTML
            formedAnswers.push(formedAnswer)
        }
        
        let htmlCode = questionLabel.outerHTML + '<br>'
        for (let answer of formedAnswers) {
            htmlCode += "\n" + answer
        }
        
        return htmlCode
    }

    evaluateAnswer() {
        let choices = document.querySelectorAll('.' + this.name +'.box')
        let score = 0;
        for (let i = 0; i < choices.length; i++) {
            if (choices[i].innerHTML == this.answers[i]) {
                score++
            }
        }
        return score;
    }
}


// let myTest = new CheckboxTest("2 + 2", [4, 5, 6, 7, 8], 2)    
let myTests = []

myTests.push(new DragDropTest("2 + 2", [4, 5, 6, 7, 8], "first"))    
// let myInput = new InputTest("p with text 'roman'", "<p>roman</p>")    

form = document.getElementById("myForm")
// form.innerHTML = myTest.getHtmlCode() + form.innerHTML
form.innerHTML = myTests.getHtmlCode() + form.innerHTML
// myTests.setUp()
setUp("first")
function setUp(className) {
    function handleDragStart(e) {
        this.style.opacity = '0.4'
        dragSrcEl = this
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/html', this.innerHTML)
    }
    
    function handleDragEnd(e) {
        this.style.opacity = '1'
        items.forEach(function (item) {
            item.classList.remove('over')
        })
    }
    
    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault()
        }
        return false
    }
    
    function handleDragEnter(e) {
        this.classList.add('over')
    }
    
    function handleDragLeave(e) {
        this.classList.remove('over')
    }
    
    function handleDrop(e) {
        e.stopPropagation()
        if (dragSrcEl !== e) {
            dragSrcEl.innerHTML = this.innerHTML
            this.innerHTML = e.dataTransfer.getData('text/html')
        }
        return false
    }
    
    
    let items = document.querySelectorAll('.' + className +'.box')
    items.forEach(function(item) {
        item.addEventListener('dragstart', handleDragStart)
        item.addEventListener('dragend', handleDragEnd)
        item.addEventListener('dragover', handleDragOver)
        item.addEventListener('dragenter', handleDragEnter)
        item.addEventListener('dragleave', handleDragLeave)
        item.addEventListener('drop', handleDrop)
    })
}

button = document.getElementById("myButton")

button.onclick = function(){
    // console.log(myTest.evaluateAnswer())
    console.log(myTests.evaluateAnswer())
} 


