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

// Function to prompt and add a Manager to the team
    // Name
    // Employee ID
    // Email address
    // Office number

    // Show Menu

// Function to prompt and add an Engineer to the team
    // Engineer's Name
    // ID
    // Email
    // GitHub username

    // Show Menu

// Function to prompt and add an Intern to the team
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

// Start process by calling Add Manager

