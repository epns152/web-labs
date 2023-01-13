class BaseTest {
    constructor(question) {
        this.question = question
    }

    getHtmlCodeForTest() {
        return "no html"
    }
    evaluateAnswer() {
        return -1
    }
}

class RadioTest extends BaseTest {
    // питання, список відповідей (впорядкований)
    // правильна відповідь - перша відповідь у списку
    constructor(question, answers) {
        super(question)
        this.answers = answers
    }

    getHtmlCodeForTest() {
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

class CheckboxTest extends BaseTest {
    // питання, список відповідей (впорядкований), кількість правильних відповідей (перші n відповідей у впорядкованому списку відповідей)
    constructor(question, answers, numberOfRightAnswers) {
        super(question)
        this.answers = answers
        this.numberOfRightAnswers = numberOfRightAnswers
    }

    getHtmlCodeForTest() {
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

class InputTest extends BaseTest {
    // Питання, відповідь
    constructor(question, answer) {
        super(question)
        this.answer = answer
    }

    getHtmlCodeForTest() {
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

class DropdownTest extends BaseTest {
    // питання, список відповідей (впорядкований)
    // правильна відповідь - перша відповідь у списку
    constructor(question, answers) {
        super(question)
        this.answers = answers
    }

    getHtmlCodeForTest() {
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

class DragDropTest extends BaseTest {
    // Питання, відповіді (в вірній послідовності), ім'я тесту (унікальне, потрібно для обробки відповідей)
    constructor(question, answers, name) {
        super(question)
        this.answers = answers
        this.name = name
    }

    getHtmlCodeForTest() {
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
  
let myTests = []

myTests.push(new RadioTest("What is the prototype of an object in JavaScript used for?",
[
    "The prototype of an object in JavaScript is used to provide a mechanism for inheritance and to share properties and methods across multiple objects.",
    "The prototype of an object in JavaScript is used to define default values for an object.",
    "The prototype of an object in JavaScript is used to create a new object with the same properties and methods as an existing object.",
    "The prototype of an object in JavaScript is not used for anything."
]))
myTests.push(new RadioTest("How can you add a new property to the prototype of an object in JavaScript?",
[
    "You can add a new property to the prototype of an object in JavaScript by using the following syntax: objectName.prototype.newProperty = value;",
    "You can add a new property to the prototype of an object in JavaScript by using the following syntax: objectName.newProperty = value;",
    "You can add a new property to the prototype of an object in JavaScript by using the following syntax: objectName.prototype = newProperty;",
    "You can add a new property to the prototype of an object in JavaScript by using the following syntax: objectName.prototype.newProperty.value = value;"
]))    
myTests.push(new RadioTest("What is the difference between an object's prototype and its constructor in JavaScript?",
[
    "The prototype of an object in JavaScript is an object that provides a mechanism for inheritance and is shared across all instances of an object. The constructor, on the other hand, is a function that is used to create and initialize an object. The prototype is a property of the constructor, and all instances of an object will have a reference to the constructor's prototype.",
    "The prototype and the constructor of an object in JavaScript are the same thing."
])) 

myTests.push(new CheckboxTest("How can you access the prototype of an object in JavaScript?",
[
    "You can access the prototype of an object in JavaScript by using the following syntax: objectName.prototype",
    "You can access the prototype of an object in JavaScript by using the following syntax: objectName.__proto__.",
    "You can access the prototype of an object in JavaScript by using the following syntax: objectName.constructor.prototype",
    "You can access the prototype of an object in JavaScript by using the following syntax: objectName.proto"
], 2)) 
myTests.push(new CheckboxTest("Which of the following is a correct way to add a method to the prototype of an object in JavaScript?",
[
    "objectName.prototype.newMethod = function(){...}",
    "objectName.newMethod = function(){...}",
    "objectName.prototype = newMethod()",
    "objectName.prototype.methods.newMethod = function(){...}"
], 2)) 
myTests.push(new CheckboxTest("What is the difference between the __proto__ property and the prototype property in JavaScript?",
[
    "The __proto__ property is a property of an object that references its prototype, whereas the prototype property is a property of a constructor function that specifies the prototype for all objects created by that constructor. ",
    "The __proto__ property is a property of a constructor function that references its prototype, whereas the prototype property is a property of an object that specifies the prototype for all objects created by that constructor.",
    "The __proto__ property and the prototype property are the same thing in JavaScript",
    "The __proto__ property is not used in JavaScript, and the prototype property is used only for creating new objects."
], 2)) 
myTests.push(new CheckboxTest("How can you check if an object has a specific property in JavaScript?",
[
    "You can use the in operator to check if an object has a specific property, for example: propertyName in objectName",
    "You can use the hasOwnProperty() method to check if an object has a specific property, for example: objectName.hasOwnProperty(propertyName)",
    "You can use the typeof operator to check if an object has a specific property, for example: typeof objectName.propertyName",
    "You can use the isPrototypeOf() method to check if an object has a specific property, for example: objectName.isPrototypeOf(propertyName)"
], 2))

myTests.push(new DropdownTest("What is the purpose of the prototype chain in JavaScript?",
[
    "The prototype chain allows objects to inherit properties and methods from other objects.",
    "The prototype chain is used to define the order of execution for JavaScript code.",
    "The prototype chain is used to create a copy of an object.",
    "The prototype chain is not used in JavaScript."
]))

myTests.push(new InputTest("Create paragraph with text \"The university\"",
    "<p>The university</p>"
))

myTests.push(new DragDropTest("Arrange the following steps in the correct order to create an object in JavaScript using the object literal notation:",
[
    "Declare the object using curly braces {}",
    "Assign properties and values to the object",
    "Assign methods to the object",
    "Define the object's constructor function"
], "first"))
  

form = document.getElementById("myForm")
myTests.forEach(function(test) {
    form.innerHTML = test.getHtmlCodeForTest() + "<br><br>" + form.innerHTML
})

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
    mark = 0
    myTests.forEach(function(test) {
        markForTest = test.evaluateAnswer()
        console.log(test.question + " mark: " + markForTest)
        mark += markForTest
    })
    console.log("Mark for the test: " + mark)
} 


