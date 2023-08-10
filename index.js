const dayField = document.getElementById('day');
const monthField = document.getElementById('month');
const yearField = document.getElementById('year');
const arrow = document.querySelector('.icon-arrow');
const reqDay = document.getElementById('reqDay');
const reqMonth = document.getElementById('reqMonth');
const reqYear = document.getElementById('reqYear');
const labels = document.querySelectorAll('.labels');
const inputs = document.querySelectorAll('.inputs');

function isDateInPast(date) {
  return new Date(date.toDateString()) < new Date(new Date().toDateString());
}

arrow.addEventListener('click', () => {
  const dateformat = /^(\d{1,2})-(\d{1,2})-(\d{4})$/;
  const date = `${dayField.value}-${monthField.value}-${yearField.value}`;

  // Matching the date through regular expression
  if (date.match(dateformat)) {
    const operator = date.split('-');

    // Extract the string into month, date and year
    let datepart = [];
    if (operator.length > 1) {
      datepart = date.split('-');
    }
    const day = parseInt(datepart[0]);
    const month = parseInt(datepart[1]);
    const year = parseInt(datepart[2]);

    // Create a list of days of a month
    const ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 1 || month > 2) {
      if (day > ListofDays[month - 1]) {
        // to check if the date is out of range
        reqDay.innerHTML = 'Must be a valid day';
        return false;
      }
    } else if (month === 2) {
      let leapYear = false;
      if ((!(year % 4) && year % 100) || !(year % 400)) leapYear = true;
      if ((leapYear === false) && (day >= 29)) {
        console.log('Invalid date');
        return false;
      }
      if ((leapYear === true) && (day > 29)) {
        reqDay.innerHTML = 'Must be a valid day';
        console.log('Invalid date format!');
        return false;
      }
    }
    if(!isDateInPast(new Date(date))) {
      reqYear.innerHTML = 'Must be in the past';
      return false;
    }
  } else {
    labels.forEach(label => {
      label.style.color = 'hsl(0, 100%, 67%)';
    });
    inputs.forEach(input => {
      input.style.border = '1px solid hsl(0, 100%, 67%)';
    });
    if (dayField.value.trim() === '') {
      reqDay.innerHTML = 'This field is required'
    }
    if (monthField.value.trim() === '') {
      reqMonth.innerHTML = 'This field is required'
    }
    if (yearField.value.trim() === '') {
      reqYear.innerHTML = 'This field is required'
    }
    console.log('Invalid date format!');
    return false;
  }
  console.log('Valid date');
  console.log(date);
  return true;
});