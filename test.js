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



class CheckboxTest {
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
        let correctAnswers = this.answers
        let score = 0;
        for (let i = 0; i < choices.length; i++) {
            if (choices[i].checked) {
                var choice = choices[i].getAttribute("value")
                if(correctAnswers.includes(choice)) score++;
            }
        }
        return score;
    }
}

function createDragDropTest() {
    // Randomly generate a sequence of numbers
    let numbers = [];
    for (let i = 0; i < 5; i++) {
      numbers.push(Math.floor(Math.random() * 5) + 1);
    }
  
    // Display the numbers on the page
    let numbersSection = document.getElementById("numbers");
    numbers.forEach(function(number) {
      let numberDiv = document.createElement("div");
      numberDiv.innerHTML = number;
      numberDiv.classList.add("draggable");
      numbersSection.appendChild(numberDiv);
    });
  
    // Add draggable functionality to the numbers
    let draggableNumbers = document.querySelectorAll(".draggable");
    draggableNumbers.forEach(function(number) {
      number.addEventListener("dragstart", function(event) {
        event.dataTransfer.setData("text", event.target.innerHTML);
      });
    });
  
    // Add drop functionality to the answer section
    let answerSection = document.getElementById("answer");
    answerSection.addEventListener("drop", function(event) {
      event.preventDefault();
      let number = event.dataTransfer.getData("text");
      event.target.appendChild(document.createTextNode(number));
    });
  
    // Prevent default drag-and-drop behavior
    answerSection.addEventListener("dragover", function(event) {
      event.preventDefault();
    });
  
    // Evaluate the answer
    let submitButton = document.getElementById("submit");
    submitButton.addEventListener("click", function() {
      let answer = answerSection.textContent;
      let correctAnswer = numbers.sort().join("");
      let score = 0;
      for (let i = 0; i < 5; i++) {
        if (answer[i] === correctAnswer[i]) {
          score++;
        }
      }
      alert("Your score is: " + score);
    });
}


let myTest = new RadioTest("2 + 2", [4, 5, 6, 7, 8])    

form = document.getElementById("myForm")

form.innerHTML = myTest.getHtmlCode() + form.innerHTML

button = document.getElementById("myButton")
button.onclick = function(){
    console.log(myTest.evaluateAnswer())
} 


