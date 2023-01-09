class RadioTest {
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

function f() {
    document.getElementById('crin').innerHTML += "ablabla"
}

let myTest = new RadioTest("2 + 2", [4, 5, 6, 7, 8])    

form = document.getElementById("myForm")

form.innerHTML = myTest.getHtmlCode() + form.innerHTML

button = document.getElementById("myButton")
button.onclick = function(){
    console.log(myTest.evaluateAnswer())
} 


