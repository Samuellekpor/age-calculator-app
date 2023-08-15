const dayField = document.getElementById('day');
const monthField = document.getElementById('month');
const yearField = document.getElementById('year');
const arrow = document.querySelector('.icon-arrow');
const reqDay = document.getElementById('reqDay');
const reqMonth = document.getElementById('reqMonth');
const reqYear = document.getElementById('reqYear');
const labels = document.querySelectorAll('.labels');
const inputs = document.querySelectorAll('.inputs');
const yearsNum = document.querySelector('.years-num');
const monthsNum = document.querySelector('.months-num');
const daysNum = document.querySelector('.days-num');

function addErrorState() {
  labels.forEach((label) => {
    label.style.color = 'hsl(0, 100%, 67%)';
  });
  inputs.forEach((input) => {
    input.style.border = '1px solid hsl(0, 100%, 67%)';
  });
}

function removeErrorState() {
  labels.forEach((label) => {
    label.style.color = 'hsl(0, 1%, 44%)';
  });
  inputs.forEach((input) => {
    input.style.border = '2px solid hsl(0, 0%, 86%)';
  });
  reqDay.innerHTML = '';
  reqMonth.innerHTML = '';
  reqYear.innerHTML = '';
}

function twoDigit(n) {
  return (n < 10 ? '0' : '') + n;
}
arrow.addEventListener('click', () => {
  const dateformat = /^(\d{1,2})-(\d{1,2})-(\d{4})$/;
  const date = `${dayField.value}-${monthField.value}-${yearField.value}`;
  const today = new Date();
  const realDate = new Date(`${yearField.value}-${monthField.value}-${dayField.value}`);
  // Create a list of days of a month
  const ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Matching the date through regular expression
  if (date.match(dateformat)) {
    const operator = date.split('-');

    // Extract the string into month, date and year
    let datepart = [];
    if (operator.length > 1) {
      datepart = date.split('-');
    }
    const day = parseInt(datepart[0], 10);
    const month = parseInt(datepart[1], 10);
    const year = parseInt(datepart[2], 10);

    if (realDate < today) {
      if (month === 1 || month > 2) {
        if (day > ListofDays[month - 1]) {
        // to check if the date is out of range
          addErrorState();
          reqDay.innerHTML = 'Must be a valid day';
          return false;
        }
      } else if (month === 2) {
        let leapYear = false;
        if ((!(year % 4) && year % 100) || !(year % 400)) leapYear = true;
        if ((leapYear === false) && (day >= 29)) {
          addErrorState();
          reqDay.innerHTML = 'Must be a valid day';
          return false;
        }
        if ((leapYear === true) && (day > 29)) {
          addErrorState();
          reqDay.innerHTML = 'Must be a valid day';
          return false;
        }
      } else {
        addErrorState();
        reqMonth.innerHTML = 'Must be a valid month';
        return false;
      }
    } else {
      addErrorState();
      reqYear.innerHTML = 'Must be in the past';
      return false;
    }
  } else {
    addErrorState();
    if (dayField.value.trim() === '') {
      reqDay.innerHTML = 'This field is required';
    }
    if (monthField.value.trim() === '') {
      reqMonth.innerHTML = 'This field is required';
    }
    if (yearField.value.trim() === '') {
      reqYear.innerHTML = 'This field is required';
    }
    return false;
  }
  removeErrorState();
  // set maximum date to today
  realDate.max = new Date().toISOString().split('T')[0];
  // calculate exact year gap
  let years;
  let months;
  let days;
  if (today.getMonth() > realDate.getMonth()
      || (today.getMonth() === realDate.getMonth()
        && today.getDate() >= realDate.getDate()
      )
  ) {
    years = today.getFullYear() - realDate.getFullYear();
  } else {
    years = today.getFullYear() - realDate.getFullYear() - 1;
  }

  // calculate exact month gap

  if (today.getDate() >= realDate.getDate()) {
    months = today.getMonth() - realDate.getMonth();
  } else if (today.getDate() < realDate.getDate()) {
    months = today.getMonth() - realDate.getMonth() - 1;
  }
  // make month positive
  months = months < 0 ? months + 12 : months;

  // calculate exact day gap
  if (today.getDate() >= realDate.getDate()) {
    days = today.getDate() - realDate.getDate();
  } else {
    days = today.getDate() - realDate.getDate() + ListofDays[realDate.getMonth()];
  }
  yearsNum.innerHTML = twoDigit(years);
  monthsNum.innerHTML = twoDigit(months);
  daysNum.innerHTML = twoDigit(days);
  return true;
});