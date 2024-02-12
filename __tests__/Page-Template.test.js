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
  const regex = /<html[\s\S]*<\/html>/i; // Case insensitive search for pair of HTML tags
  expect(regex.test(HTML)).toBe(true);
});


test("Can render a single Manager", () => {

  // Arrange
  const employees = []
  const objManager = new Manager("Foo-Manager", 1, "manager@test.com", 100);
  employees.push(objManager);

  // Act
  const HTML = render(employees);

  // Assert
  expect(HTML).toContain("Foo-Manager");
});

test("Can render multiple Employees", () => {

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
  expect(HTML).toContain("Foo-Engineer");
  expect(HTML).toContain("Foo-Intern");
});
