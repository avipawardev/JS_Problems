function createEmployee(name, role, salary) {
  return {
    name,
    role,
    salary,
    introduce: function () {
      console.log(`Hello, I am ${name}, working as a ${role}.`);
    },
  };
}
let user1 = createEmployee("AP", "SDE1", 80000);
user1.introduce();
