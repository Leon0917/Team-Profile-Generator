const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
let employeeList = [];

const render = require("./lib/htmlRenderer");

function displayUserChoice() {
    inquirer.prompt([
        {
            type: "list",
            name: "menu",
            message: "Leon's company HR",
            choices: ["Add Engineer", "Add Intern", "Add Manager", "Exit Application"]
        }
    ]).then(function (userChoice) {
        switch (userChoice.menu) {
            case "Add Engineer":
                addEngineer();
                break;

            case "Add Intern":
                addIntern();
                break;

            case "Add Manager":
                addManager();
                break;

            case "Exit Application":
                exitApplication()
                break;
        }
    })
}   
    async function exitApplication() {
        console.log(employeeList)
        let htmlString = await render(employeeList)
        console.log("HTML STring",htmlString)
        fs.writeFileSync(outputPath, htmlString)
    }

    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                message: "Enter engingeer name",
                name: "engineerName"
            },

            {
                type: "input",
                message: "Enter engingeer Id",
                name: "engineerId"
            },

            {
                type: "input",
                message: "Enter engingeer email",
                name: "engineerEmail"
            },

            {
                type: "input",
                message: "Enter engingeer github",
                name: "engineerGithub"
            }
        ])
            .then(function (userEntry) {
                let myEngineer = new Engineer(userEntry.engineerName, userEntry.engineerId, userEntry.engineerEmail, userEntry.engineerGithub);
                employeeList.push(myEngineer)
                displayUserChoice()
            })
    }

    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                message: "Enter intern name",
                name: "internName"
            },

            {
                type: "input",
                message: "Enter intern Id",
                name: "internId"
            },

            {
                type: "input",
                message: "Enter intern email",
                name: "internEmail"
            },

            {
                type: "input",
                message: "Enter intern school",
                name: "internSchool"
            }
        ])
            .then(function (userEntry) {
                let myIntern = new Intern(userEntry.internName, userEntry.internId, userEntry.internEmail, userEntry.internSchool);
                employeeList.push(myIntern)
                displayUserChoice()
            })
    }

    function addManager() {
        inquirer.prompt([
            {
                type: "input",
                message: "Enter manager name",
                name: "managerName"
            },

            {
                type: "input",
                message: "Enter manager Id",
                name: "managerId"
            },

            {
                type: "input",
                message: "Enter manager email",
                name: "managerEmail"
            },

            {
                type: "input",
                message: "Enter manager office number",
                name: "managerofficeNumber"
            }
        ])
            .then(function (userEntry) {
                let myManager = new Manager(userEntry.managerName, userEntry.managerId, userEntry.managerEmail, userEntry.managerOfficeNumber);
                employeeList.push(myManager)
                displayUserChoice()
            })
    }

    function teamBuilder() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(employeeList), "utf-8")
    }


displayUserChoice();



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
