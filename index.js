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

// Promisify fs.writeFile() to use promises
const writeFileAsync = util.promisify(fs.writeFile);

const render = require("./src/page-template.js");


// Object array of team members
const employees = [];

// Function to prompt for Manager details
const promptManager = async function() {
    return inquirer.prompt([
        // Name
        {
            type: 'input',
            name: 'name',
            message: chalk.yellow("Enter your Name:"),
        },
        // Employee ID
        {
            type: 'input',
            name: 'id',
            message: chalk.yellow("Enter your Employee ID:"),
        },
        // Email address
        {
            type: 'input',
            name: 'email',
            message: chalk.yellow("Enter your Email Address:"),
        },
        // Office number
        {
            type: 'input',
            name: 'office',
            message: chalk.yellow("Enter your Office Number:"),
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
        },
        // ID
        {
            type: 'input',
            name: 'id',
            message: chalk.yellow("Enter Engineer's Employee ID:"),
        },
        // Email
        {
            type: 'input',
            name: 'email',
            message: chalk.yellow("Enter Engineer's Email Address:"),
        },
        // GitHub username
        {
            type: 'input',
            name: 'github',
            message: chalk.yellow("Enter Engineer's GitHub username:"),
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
        },
        // ID
        {
            type: 'input',
            name: 'id',
            message: chalk.yellow("Enter Intern's Employee ID:"),
        },
        // Email
        {
            type: 'input',
            name: 'email',
            message: chalk.yellow("Enter Intern's Email Address:"),
        },
        // School
        {
            type: 'input',
            name: 'school',
            message: chalk.yellow("Enter Intern's School:"),
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

