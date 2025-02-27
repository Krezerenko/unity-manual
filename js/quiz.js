window.addEventListener("load", initQuiz);

function initQuiz()
{
    let quiz = document.getElementById("quiz-form");
    quiz.getElementsByClassName("btn")[0].addEventListener("click", submitQuiz.bind(quiz));
    quiz.addEventListener("click", onAnswerCheck);
}

function submitQuiz()
{
    let questions = this.getElementsByClassName("question");
    let questionAmount = questions.length;
    let score = 0;

    for (const question of questions)
    {
        const userAnswer = question.querySelector("input:checked");
        if (!userAnswer) continue;
        if (question.dataset.answer === userAnswer.value)
        {
            score++;
            userAnswer.parentElement.classList.remove("wrong");
            userAnswer.parentElement.classList.add("right");
        }
        else
        {
            userAnswer.parentElement.classList.remove("right");
            userAnswer.parentElement.classList.add("wrong");
        }
    }

    let result = this.parentElement.getElementsByClassName("result")[0];
    let scoreInfo = result.children[0];
    let cheer = result.children[1];
    scoreInfo.textContent = `Ваш счет: ${score} из ${questionAmount}!`;

    if (score === questionAmount)
    {
        scoreInfo.classList.remove("wrong");
        scoreInfo.classList.add("right");
        cheer.textContent = "Так держать!";
    }
    else
    {
        scoreInfo.classList.remove("right");
        scoreInfo.classList.add("wrong");
        cheer.textContent = "Не волнуйтесь, вы можете попробовать ещё раз!";
    }
}

function onAnswerCheck(event)
{
    if (event.target.checked)
    {
        for (const label of event.target.parentElement.parentElement.children)
        {
            if (label.children[0] === event.target) continue;
            label.classList.remove("right");
            label.classList.remove("wrong");
        }
    }
}

function someNewFunction1()
{
    doSomething();
}
