import { Quote } from "./Quote.js";

class Game {

 hangmanImages = [
   'img/1.png', 'img/2.png', 'img/3.png', 'img/4.png', 'img/5.png', 'img/6.png', 'img/7.png'
 ]

 currentStep = 0;
 lastStep = 6;
 attempts = 6;

  quotes = [
    {
      text: "Pan Tadeusz",
      category: "Utwór literacki",
    },
    {
      text: "Akademia Pana Kleksa",
      category: "Utwór literacki",
    },
    {
      text: "Janko Muzykant",
      category: "Utwór literacki",
    },
    {
      text: "Potop",
      category: "Utwór literacki",
    },
    {
      text: "Skazani na Shawshank",
      category: "Utwór literacki",
    },
    {
      text: "Donald Tusk",
      category: "Polityk",
    },
    {
      text: "Zinedine Zidane",
      category: "Piłkarz",
    },
    {
      text: "Patrick Kluivert",
      category: "Piłkarz",
    },
    {
      text: "Robert Lewandowski",
      category: "Piłkarz",
    },
    {
      text: "Legia Warszawa",
      category: "Drużyna",
    },
  ];
  constructor({ lettersWrapper, categoryWrapper, wordWrapper, outputWrapper}) {
    (this.lettersWrapper = lettersWrapper),
      (this.categoryWrapper = categoryWrapper),
      (this.wordWrapper = wordWrapper),
      (this.outputWrapper = outputWrapper);
      const {text, category} = this.quotes[Math.floor(Math.random()* this.quotes.length) ];
      this.categoryWrapper.innerHTML = category.toUpperCase();
      this.quote = new Quote(text.toUpperCase());


  }

  guess(e, letter) {
    e.target.disabled=true;
    if(this.quote.guess(letter)) {
      this.displayQuote();
    } else {
      this.currentStep++;
      this.attempts--;
      this.currentStepUp();
      if(this.currentStep == this.lastStep) {
        this.lettersWrapper.innerHTML='';
        this.categoryWrapper.textContent = "PRZEGRAŁEŚ";
        this.categoryWrapper.style.color = 'red';
      }
    }
   

  }
  displayQuote() {
    const content = this.quote.getText();
    this.wordWrapper.innerHTML = content; 
    if(!content.includes('_')) {
      this.categoryWrapper.textContent = 'WYGRANA !!!';
      this.categoryWrapper.style.color = 'green';
      this.lettersWrapper.innerHTML='';
    }
  }

  currentStepUp() {
    document.getElementById("imgContainer").src = this.hangmanImages[this.currentStep];
    document.getElementById("numberOfAttempts").textContent = this.attempts;
    
   
  }

  displayLetters() {
    for (let i = 10; i < 36; i++) {
      const label = i.toString(36).toUpperCase();
      const button = document.createElement("button");
      button.innerHTML = label;
      button.addEventListener("click", (e) => this.guess(e, label));
      this.lettersWrapper.appendChild(button);
    }
  }
  start() {
    document.getElementById("numberOfAttempts").textContent = this.attempts;
    this.currentStepUp();
    this.displayLetters();
    this.displayQuote();
    
  }
}

const game = new Game({
  lettersWrapper: document.getElementById("letters"),
  categoryWrapper: document.getElementById("category"),
  wordWrapper: document.getElementById("word"),
  outputWrapper: document.getElementById("output"),
});

  game.start();


document.getElementById('startButton').addEventListener('click', ()=>{
  location.reload(true)
})