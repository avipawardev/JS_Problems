function manageStudents() {
    let students = ["Alice", "Bob", "Charlie"];

    // Add "David" at index 1
    students.splice(1, 0, "David");
    console.log(students)

    // Check if "Eve" is in the list
    console.log(students.includes("Eve"));  // Should return false

    // Convert the array to a string with names separated by commas
    let str = students.join(",")
    console.log(str);  // Expected: "Alice,David,Bob,Charlie"
}

manageStudents();

//Outputs:-
// [ 'Alice', 'David', 'Bob', 'Charlie' ]
// false
// Alice,David,Bob,Charlie