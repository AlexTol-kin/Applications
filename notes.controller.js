const chalk = require("chalk");
const Application = require("./models/Application");

async function addApplication(patient, phone, title) {
  let dateObj = new Date();
  let month = String(dateObj.getMonth() + 1).padStart(2, "0");
  let day = String(dateObj.getDate()).padStart(2, "0");
  let year = dateObj.getFullYear();
  let date = day + " " + month + "." + year;

  await Application.create({ date, patient, phone, title });

  console.log(chalk.bgGreen("Note was added!"));
}

async function getApplication() {
  const notes = await Application.find();

  return notes;
}

module.exports = {
  addApplication,
  getApplication,
};
