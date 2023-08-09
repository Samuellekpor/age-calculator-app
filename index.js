const day_field = document.getElementById('day');
const month_field = document.getElementById('month');
const year_field = document.getElementById('year');
const arrow = document.querySelector('.icon-arrow');

arrow.addEventListener('click', () => {
  const dateformat = /^(0?[1-9]|[1-2][0-9]|3[01])[\/](0?[1-9]|1[0-2])/;
  const date = `${day_field.value}/${month_field.value}/${year_field.value}`;

  // Matching the date through regular expression
  if (date.match(dateformat)) {
    const operator = date.split('/');

    // Extract the string into month, date and year
    let datepart = [];
    if (operator.length > 1) {
      datepart = date.split('/');
    }
    const day = parseInt(datepart[0]);
    const month = parseInt(datepart[1]);
    const year = parseInt(datepart[2]);

    // Create a list of days of a month
    const ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 1 || month > 2) {
      if (day > ListofDays[month - 1]) {
        // to check if the date is out of range
        console.log('Invalid date');
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
        console.log('Invalid date format!');
        return false;
      }
    }
  } else {
    console.log('Invalid date format!');
    return false;
  }
  console.log('Valid date');
  return true;
});