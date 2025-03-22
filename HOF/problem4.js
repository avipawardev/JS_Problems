function evaluateEmployees(employees) {
    
    let filteredEmployees = employees.filter(emp => emp.tasksCompleted > 5);

   
    let performanceMapped = filteredEmployees.map(emp => ({
        name: emp.name,
        performance: emp.rating > 4.5 ? "Excellent" :
                     emp.rating >= 3 ? "Good" :
                     "Needs Improvement"
    }));

   
    let sortedEmployees = performanceMapped.sort((a, b) => {
        let order = { "Excellent": 3, "Good": 2, "Needs Improvement": 1 };
        return order[b.performance] - order[a.performance];
    });


    return sortedEmployees;
}


let employees = [
    { name: "Alice", tasksCompleted: 8, rating: 4.7 },
    { name: "Bob", tasksCompleted: 4, rating: 4.0 },
    { name: "Charlie", tasksCompleted: 6, rating: 3.5 },
    { name: "David", tasksCompleted: 10, rating: 4.9 },
    { name: "Eve", tasksCompleted: 7, rating: 2.8 }
];

console.log(evaluateEmployees(employees));


