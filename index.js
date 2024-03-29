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

// Validate an email address
function validateEmail(value) {
    if (!value.trim()){
      return chalk.red('Email Address is required.');
    }
    // Checking for valid email using regex
    // From https://emailregex.com/ 
    // General Email Regex (RFC 5322 Official Standard)
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(value)){
      return chalk.red('Please enter a valid email address.');
    }
    return true;
  } 

// Function to prompt for Manager details
const promptManager = async function() {
    return inquirer.prompt([
        // Name
        {
            type: 'input',
            name: 'name',
            message: chalk.yellow("Enter your Name:"),
            validate: value => value.trim() ? true : chalk.red('Name is required.'),
        },
        // Employee ID
        {
            type: 'input',
            name: 'id',
            message: chalk.yellow("Enter your Employee ID:"),
            validate: value => value.trim() ? true : chalk.red('Employee ID is required.'),
        },
        // Email address
        {
            type: 'input',
            name: 'email',
            message: chalk.yellow("Enter your Email Address:"),
            validate: function(email){return validateEmail(email)},
        },
        // Office number
        {
            type: 'input',
            name: 'office',
            message: chalk.yellow("Enter your Office Number:"),
            validate: value => value.trim() ? true : chalk.red('Office Number is required.'),
        },
    ])
};

// Function to prompt and add an Engineer to the team
const promptEngineer = async function() {
    return inquirer.prompt([
        // Engineer's Name
        {
            type: 'input',
            name: 'name',
            message: chalk.yellow("Enter Engineer's Name:"),
            validate: value => value.trim() ? true : chalk.red('Name is required.'),
        },
        // ID
        {
            type: 'input',
            name: 'id',
            message: chalk.yellow("Enter Engineer's Employee ID:"),
            validate: value => value.trim() ? true : chalk.red('Employee ID is required.'),
        },
        // Email
        {
            type: 'input',
            name: 'email',
            message: chalk.yellow("Enter Engineer's Email Address:"),
            validate: function(email){return validateEmail(email)},
        },
        // GitHub username
        {
            type: 'input',
            name: 'github',
            message: chalk.yellow("Enter Engineer's GitHub username:"),
            validate: value => value.trim() ? true : chalk.red('GitHub username is required.'),
        },
    ])
};

// Function to prompt and add an Intern to the team
const promptIntern = async function() {
    return inquirer.prompt([
        // Intern’s name
        {
            type: 'input',
            name: 'name',
            message: chalk.yellow("Enter Intern's Name:"),
            validate: value => value.trim() ? true : chalk.red('Name is required.'),
        },
        // ID
        {
            type: 'input',
            name: 'id',
            message: chalk.yellow("Enter Intern's Employee ID:"),
            validate: value => value.trim() ? true : chalk.red('Employee ID is required.'),
        },
        // Email
        {
            type: 'input',
            name: 'email',
            message: chalk.yellow("Enter Intern's Email Address:"),
            validate: function(email){return validateEmail(email)},    
        },
        // School
        {
            type: 'input',
            name: 'school',
            message: chalk.yellow("Enter Intern's School:"),
            validate: value => value.trim() ? true : chalk.red('School is required.'),
        },
    ])
};


// Function to Show Menu
async function showMenu(){

    const choices = [
        {name: chalk.green('Add an engineer...'), value: 'engineer'},
        {name: chalk.green('Add an intern...'), value: 'intern'},
        {name: chalk.green('Finish building the team.'), value: 'finish'},
    ];

    console.clear();
    console.log(""); // Add space

    inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: chalk.yellow("What would you like to do now?"),
            choices: choices
        }
    ])
    .then(async function (answers) {

        switch (answers.menu) {
        case 'engineer':
            // Ask for engineer details
            const engineerData = await promptEngineer();
            const engineer = new Engineer(engineerData.name, engineerData.id, engineerData.email, engineerData.github);

            // Add engineer details to employees
            employees.push(engineer);

            showMenu();
            break;

        case 'intern':
        
            // Ask for intern details
            const internData = await promptIntern();
            const intern = new Intern(internData.name, internData.id, internData.email, internData.school);

            // Add intern details to employees
            employees.push(intern);

            showMenu();        
            break;

        default: 
            // 'Finish building the team.'

            console.clear();
            console.log(chalk.blue("\nRendering HTML..."));

            // Render HTML
            await writeFileAsync(outputPath, render(employees));

            console.log(chalk.green(`HTML file saved to ${outputPath}`));

            // Copy the css from style
            fs.copyFile('./src/style.css', './output/style.css', (err)=>{if (err){console.error(chalk.red("Error copying CSS file"), err)}});

            console.log(chalk.green(`CSS file saved to ${outputCSSPath}`));

            break;

        }

    })
    // Catch errors and write to console
    .catch(function (err) {

        // Check if error was unable to open the output directory
        if ((err.code === 'ENOENT') && (err.syscall === 'open') && (err.path).includes(outputPath)) {
            console.error(chalk.red("\nError: The output directory doesn't exist."));
        } else {
            console.error(chalk.red("\nAn error occurred\n"), err);
        }

    })

}

// Function to start collecting team information
async function main() {

    console.log(chalk.underline.magenta("\nTeam Profile Generator\n"));
    console.log(chalk.green("Add Manager"));
    // Ask for manager details
    const managerData = await promptManager();
    const manager = new Manager(managerData.name, managerData.id, managerData.email, managerData.office);

    // Add manager details to employees
    employees.push(manager);

    showMenu();

}

// Start process by calling main()
main();

