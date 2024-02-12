const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

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
            message: "Enter your Name:",
        },
        // Employee ID
        {
            type: 'input',
            name: 'id',
            message: "Enter your Employee ID:",
        },
        // Email address
        {
            type: 'input',
            name: 'email',
            message: "Enter your Email Address:",
        },
        // Office number
        {
            type: 'input',
            name: 'office',
            message: "Enter your Office Number:",
        },
    ])
};
    // Show Menu

// Function to prompt and add an Engineer to the team
//const promptEngineer = () => inquirer.prompt([]);
    // Engineer's Name
    // ID
    // Email
    // GitHub username

    // Show Menu

// Function to prompt and add an Intern to the team
//const promptIntern = () => inquirer.prompt([]);
    // Intern’s name
    // ID
    // Email
    // School

    // Show Menu

// Function to Show Menu
    // Add an engineer
    // Add an intern
    // Finish building the team

// Function to Finish building the team (render the html)
async function main() {

    // Ask for manager details
    const managerData = await promptManager();
    const manager = new Manager(managerData.name, managerData.id, managerData.email, managerData.office);

    // Add manager details to employees
    employees.push(manager);

    // Render HTML
    console.log(render(employees));
}

// Start process by calling main()
main();

