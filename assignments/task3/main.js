function quiz() {
  let score = 0;
  // let num; -- is this meant to be a red herring? am I missing something???
  let question;
  let answer;
  let quiz_questions = [
    "How many moons does Earth have?",
    "How many moons does Saturn have?",
    "How many moons does Venus have?",
  ];
  let quiz_answers = [1, 82, 0];

  //get total number of questions
  let totalQuestion = quiz_questions.length;

  //generate random number for question -- full disclosure, I have no idea why this is here so I cut it.
  // num = Math.floor(Math.random() * 3);

  for (let count = 0; count < totalQuestion; count++) {
    // console.log(count);
    question = quiz_questions[count];
    // console.log(question);
    answer = prompt(question);

    if (answer == quiz_answers[count]) {
      score++;
      alert("Correct!");
    } else {
      alert("Wrong");
    }

    // Still don't know what this is supposed to be doing
    // num++;
    // if (num === totalQuestion) {
    //   num = 0;
    // }
  }

  let endText = `You got ${score} out of ${totalQuestion} questions correct.`;
  // console.log(endText);
  document.getElementById("input").textContent = endText;
}
