// Render a mockup of the HTML output with test data, using 'node mock.js"

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");
const chalk = require('chalk');

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const outputCSSPath = path.join(OUTPUT_DIR, "style.css");

// Promisify fs.writeFile() to use promises
const writeFileAsync = util.promisify(fs.writeFile);

const render = require("./src/page-template.js");


// Object array of team members
const employees = [];

const manager = new Manager('Jared', 1, 'jared@fakeemal.com', 1);
const engineer1 = new Engineer('Alec', 2, 'alec@fakeemail.com', 'aleceng');
const engineer2 = new Engineer('Grace', 3, 'grace@fakeemail.com', 'graceeng');
const engineer3 = new Engineer('Tammer', 4, 'tammer@fakeemail.com', 'tammereng');
const intern = new Intern('John', 5, 'john@fakeemail.com', '2University');

employees.push(manager, engineer1, engineer2, engineer3, intern);

writeFileAsync(outputPath, render(employees));
console.log(chalk.green(`HTML file saved to ${outputPath}`));

fs.copyFile('./src/style.css', './output/style.css', (err)=>{if (err){console.error("Error copying CSS file", err)}});
console.log(chalk.green(`CSS file saved to ${outputCSSPath}`));
