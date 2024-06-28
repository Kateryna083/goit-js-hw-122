import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const datePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('button[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

startButton.disabled = true;

flatpickr(datePicker, {
  enableTime: true,
  time_24hr: true,
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Будь ласка, оберіть дату у майбутньому',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

let countdownTimer;

startButton.addEventListener('click', () => {
  const selectedDate = flatpickr.parseDate(datePicker.value);
  datePicker.disabled = true;
  startButton.disabled = true;

  function updateTimer() {
    const currentTime = new Date().getTime();
    const difference = selectedDate - currentTime;

    if (difference <= 0) {
      clearInterval(countdownTimer);
      iziToast.success({
        title: 'Finished',
        message: 'Таймер завершено',
      });
      datePicker.disabled = false;
      startButton.disabled = false;
    } else {
      const timeLeft = convertMs(difference);
      timerDays.textContent = addLeadingZero(timeLeft.days);
      timerHours.textContent = addLeadingZero(timeLeft.hours);
      timerMinutes.textContent = addLeadingZero(timeLeft.minutes);
      timerSeconds.textContent = addLeadingZero(timeLeft.seconds);
    }
  }

  updateTimer();
  countdownTimer = setInterval(updateTimer, 1000);
});
