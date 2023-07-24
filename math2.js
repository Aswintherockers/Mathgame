// Array of math operations to randomly select from
const mathOps = ["+", "-", "*", "/"];

// Function to generate a random math problem
function generateQuestion() {
  const num1 = Math.floor(Math.random() * 10) + 2;
  const num2 = Math.floor(Math.random() * 10) + 2;
  const num3 = Math.floor(Math.random() * 10) + 2;
  const op = mathOps[Math.floor(Math.random() * mathOps.length)];
  let question = "";
  switch (op) {
    case "+":
      question = `${num1} + ${num2}+ ${num3}`;
      break;
    case "-":
      question = `${num1} - ${num2}- ${num3}`;
      break;
    case "*":
      question = `${num1} * ${num2}* ${num3}`;
      break;
    case "/":
      question = `${num1 * num2 * num3} / ${num3}`;
      break;
  }
  return question;
}
const start = () => {
  setTimeout(function() {
      confetti.start()
  }, 1000); // 1000 is time that after 1 second start the confetti ( 1000 = 1 sec)
};

//  for stopping the confetti 

const stop = () => {
  setTimeout(function() {
      confetti.stop()
  }, 5000); // 5000 is time that after 5 second stop the confetti ( 5000 = 5 sec)
};
let streak = 0;
let b=0;
// Function to check the user's answer
function checkAnswer() {
  const userAnswer = parseInt(document.getElementById("answer").value);
  const question = document.getElementById("question").textContent;
  const correctAnswer = eval(question);
  if (userAnswer === correctAnswer) {
     b++;
     streak++;
    document.getElementById("streak").textContent = streak;
    document.getElementById("answer").value = "";
    document.getElementById("question").textContent = generateQuestion();
    
    start();
    stop();
    
  } else {
    streak = 0;
    document.getElementById("streak").textContent = streak;
    document.getElementById("answer").value = "";
    document.getElementById("question").textContent = generateQuestion();
    alert("your current streak  "+ b);

  }
}

// Initialize the game with a random math problem
document.getElementById("question").textContent = generateQuestion();

// Add event listener to the submit button
document.getElementById("submit-btn").addEventListener("click", checkAnswer);



class Timer {
  constructor(root) {
    root.innerHTML = Timer.getHTML();

    this.el = {
      minutes: root.querySelector(".timer__part--minutes"),
      seconds: root.querySelector(".timer__part--seconds"),
      control: root.querySelector(".timer__btn--control"),
      reset: root.querySelector(".timer__btn--reset")
    };

    this.interval = null;
    this.remainingSeconds = 0;

    this.el.control.addEventListener("click", () => {
      if (this.interval === null) {
        this.start();
      } else {
        this.stop();
      }
    });

    this.el.reset.addEventListener("click", () => {
      const inputMinutes = prompt("Enter number of minutes:");

      if (inputMinutes < 60) {
        this.stop();
        this.remainingSeconds = inputMinutes * 60;
        this.updateInterfaceTime();
      }
    });
  }

  updateInterfaceTime() {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;

    this.el.minutes.textContent = minutes.toString().padStart(2, "0");
    this.el.seconds.textContent = seconds.toString().padStart(2, "0");
  }

  updateInterfaceControls() {
    if (this.interval === null) {
      this.el.control.innerHTML = `<span class="material-icons">play_arrow</span>`;
      this.el.control.classList.add("timer__btn--start");
      this.el.control.classList.remove("timer__btn--stop");
    } else {
      this.el.control.innerHTML = `<span class="material-icons">pause</span>`;
      this.el.control.classList.add("timer__btn--stop");
      this.el.control.classList.remove("timer__btn--start");
    }
  }

  start() {
    if (this.remainingSeconds === 0) return;

    this.interval = setInterval(() => {
      this.remainingSeconds--;
      this.updateInterfaceTime();

      if (this.remainingSeconds === 0) {
        this.stop();
      }
    }, 1000);

    this.updateInterfaceControls();
  }

  stop() {
    clearInterval(this.interval);

    this.interval = null;

    this.updateInterfaceControls();
  }

  static getHTML() {
    return `
			<span class="timer__part timer__part--minutes">00</span>
			<span class="timer__part">:</span>
			<span class="timer__part timer__part--seconds">00</span>
			<button type="button" class="timer__btn timer__btn--control timer__btn--start">
				<span class="material-icons">play_arrow</span>
			</button>
			<button type="button" class="timer__btn timer__btn--reset">
				<span class="material-icons">timer</span>
			</button>
		`;
  }
}

new Timer(
	document.querySelector(".timer")
);