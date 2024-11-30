let form;
let successMessage;
window.addEventListener("load", initForm);
function initForm()
{
    form = document.getElementById('contact-form');
    successMessage = document.getElementById('success-message');

    form.addEventListener('submit', onFormSubmit)
}

function onFormSubmit(event)
{
    event.preventDefault();

    setTimeout(() =>
    {
        successMessage.style.display = 'block';
        form.reset();
    }, 500);
}