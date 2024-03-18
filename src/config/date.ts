let dateNow = new Date();
let date =
  dateNow.getUTCFullYear() +
  "-" +
  dateNow.getUTCMonth() +
  "-" +
  dateNow.getDate() +
  "T00:00:00";
console.log(dateNow.toISOString());
const currentTime = new Date().toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
});
console.log(currentTime);

const getTime = new Date("2024-03-17T00:00:00");
console.log(getTime);

const entryTime = new Date().toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
});

const [hours, minute] = entryTime.split(":");
console.log(hours, minute);

const convertTime = new Date(2000, 0, 1, parseInt(hours), parseInt(minute));
console.log(convertTime.toISOString());
console.log(convertTime.getHours(), convertTime.getMinutes());
