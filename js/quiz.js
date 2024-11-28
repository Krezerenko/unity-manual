function submitQuiz()
{
    console.log(this);
    let questionAmount = parseInt(this.parentElement.dataset.questionsAmount);
    let score = 0;

    for (const question of this.parentElement.children)
    {
        const userAnswer = question.querySelector("input:checked");
        if (userAnswer && question.dataset.answer === userAnswer.value)
        {
            score++;
        }
    }

    const result = document.getElementById("result");
    result.textContent = `Ваш счет: ${score} из ${questionAmount}!`;

    if (score === questionAmount)
    {
        result.style.color = "green";
        result.innerHTML += "<br/>Так держать!";
    } else
    {
        result.style.color = "red";
        result.innerHTML += "<br/>Не волнуйтесь, вы можете попробовать ещё раз!";
    }
}