export const getDateString = (k = 0) => {
  // get the date k days from today
  const date = new Date();
  date.setDate(date.getDate() + k);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const getTimeString = (h = 0, m = 0) => {
  // format: HH:MM AM/PM
  const date = new Date();
  date.setHours(date.getHours() + h, date.getMinutes() + m);

  let hour = date.getHours() % 12;
  hour = hour ? hour : 12;
  const minute = String(date.getMinutes()).padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "PM" : "AM";

  cy.log(`${hour}:${minute} ${ampm}`);

  return `${hour}:${minute} ${ampm}`;
};

export const getDateTimeString = (k = 0, h = 0, m = 0) => {
  return `${getDateString(k)}${convertTo24HourFormat(getTimeString(h, m))}`;
};

const convertTo24HourFormat = (timeString) => {
  const [time, modifier] = timeString.split(' '); // Split the time and AM/PM
  let [hours, minutes] = time.split(':').map(Number); // Split hours and minutes

  if (modifier === 'PM' && hours !== 12) {
    hours += 12; // Convert PM to 24-hour format
  } else if (modifier === 'AM' && hours === 12) {
    hours = 0; // Convert 12 AM to 00
  }

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

export const parseTimeString = (timeString) => {
  const [time, modifier] = timeString.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  } else if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};
