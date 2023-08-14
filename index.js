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

function addErrorState(){
  labels.forEach(label => {
    label.style.color = 'hsl(0, 100%, 67%)';
  });
  inputs.forEach(input => {
    input.style.border = '1px solid hsl(0, 100%, 67%)';
  });
}

function removeErrorState() {
  labels.forEach(label => {
    label.style.color = 'hsl(0, 1%, 44%)';
  });
  inputs.forEach(input => {
    input.style.border = '2px solid hsl(0, 0%, 86%)';
  });
  reqDay.innerHTML = '';
  reqMonth.innerHTML = '';
  reqYear.innerHTML = '';
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

    const today = new Date();
    const realDate = new Date(`${yearField.value}-${monthField.value}-${dayField.value}`)

    // Create a list of days of a month
    const ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if(realDate < today){
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
    }else{
      addErrorState();
      reqMonth.innerHTML = 'Must be a valid month';
      return false;
    }
  }else {
    addErrorState();
    reqYear.innerHTML = 'Must be in the past';
    return false;
  }
    
  } else {
    addErrorState();
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
  removeErrorState();
  console.log('Valid date');
  console.log(date);
  // set maximum date to today
  realDate.max = new Date().toISOString().split('T')[0];
  // calculate exact year gap
  var years;
  if ( today.getMonth() > birthDate.getMonth() ||
      ( today.getMonth() == birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate()
      )
    ) {
    years = today.getFullYear() - birthDate.getFullYear();
  }
  else {
    years = today.getFullYear() - birthDate.getFullYear() - 1;
  }
  return true;
});