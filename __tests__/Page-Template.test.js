const Manager = require("../lib/Manager");
const Engineer = require("../lib/Engineer");
const Intern = require("../lib/Intern");
const render = require("../src/page-template.js");

// Testing the render function

test("Can render HTML", () => {

  // Arrange
  const employees = []
  const objManager = new Manager("Foo-Manager", 1, "manager@test.com", 100);
  const objEngineer = new Engineer("Foo-Engineer", 2, "engineer@test.com", 'GitHubUser');
  const objIntern = new Intern("Foo-Intern", 3, "intern@test.com", "UCLA");
  employees.push(objManager);
  employees.push(objEngineer);
  employees.push(objIntern);

  // Act
  const HTML = render(employees);

  // Assert
  expect(HTML).toContain("<html");
});


test("Can render Manager", () => {

  // Arrange
  const employees = []
  const objManager = new Manager("Foo-Manager", 1, "manager@test.com", 100);
  const objEngineer = new Engineer("Foo-Engineer", 2, "engineer@test.com", 'GitHubUser');
  const objIntern = new Intern("Foo-Intern", 3, "intern@test.com", "UCLA");
  employees.push(objManager);
  employees.push(objEngineer);
  employees.push(objIntern);

  // Act
  const HTML = render(employees);

  // Assert
  expect(HTML).toContain("Foo-Manager");
});

test("Can render Engineer", () => {

  // Arrange
  const employees = []
  const objManager = new Manager("Foo-Manager", 1, "manager@test.com", 100);
  const objEngineer = new Engineer("Foo-Engineer", 2, "engineer@test.com", 'GitHubUser');
  const objIntern = new Intern("Foo-Intern", 3, "intern@test.com", "UCLA");
  employees.push(objManager);
  employees.push(objEngineer);
  employees.push(objIntern);

  // Act
  const HTML = render(employees);

  // Assert
  expect(HTML).toContain("Foo-Engineer");
});

test("Can render Intern", () => {

  // Arrange
  const employees = []
  const objManager = new Manager("Foo-Manager", 1, "manager@test.com", 100);
  const objEngineer = new Engineer("Foo-Engineer", 2, "engineer@test.com", 'GitHubUser');
  const objIntern = new Intern("Foo-Intern", 3, "intern@test.com", "UCLA");
  employees.push(objManager);
  employees.push(objEngineer);
  employees.push(objIntern);

  // Act
  const HTML = render(employees);

  // Assert
  expect(HTML).toContain("Foo-Intern");
});
