// Оголошення об'єкта formData зі значеннями полів email та message
let formData = {
  email: '',
  message: '',
};
// Перевірка, чи є дані у локальному сховищіconst storedFormData = localStorage.getItem("feedback-form-state");
// Якщо є дані, завантажуємо їх у formData
if (storedFormData) {
  formData = JSON.parse(storedFormData);
  document.querySelector('input[name="email"]').value = formData.email;
  document.querySelector('textarea[name="message"]').value = formData.message;
}
// Вибір елементів форми
const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');
const errorMessage = document.createElement('div');
errorMessage.classList.add('error-message');
// Зберігання актуальних даних у локальне сховище при зміні вмісту поля
form.addEventListener('input', function (event) {
  const { name, value } = event.target;
  formData[name] = value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
});
// Обробник події для відправки форми
form.addEventListener('submit', function (event) {
  event.preventDefault();
  // Валідація полів форми
  if (formData.email.trim() === '' || formData.message.trim() === '') {
    errorMessage.textContent = 'Fill please all fields';
    form.appendChild(errorMessage);
  } else {
    // Якщо всі поля заповнені, виведення даних у консоль, очищення сховища та форми
    console.log(formData);
    localStorage.removeItem('feedback-form-state');
    formData = { email: '', message: '' };
    form.reset();
  }
});
