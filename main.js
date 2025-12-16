const Student = require('./models');
const { fetchStudents } = require('./database');
const { calculateClassAverage, findTopStudent, filterStudents } = require('./analytics');

fetchStudents((rawData) => {
    const students = rawData.map(data => new Student(data.id, data.name, data.courses));

    console.log("Testing Immutability:");
    console.log(`Original ID: ${students[0].id}`);

    console.log("Attempting to change ID to 999...");
    try {
        students[0].id = 999;
    } catch (e) {
        // assignment will silently fail in non-strict mode
    }

    if (students[0].id === 999) {
        console.log(`Final ID: ${students[0].id} (Failed: ID changed)`);
    } else {
        console.log(`Final ID: ${students[0].id} (Success: ID did not change)`);
    }

    console.log("\n--- Analytics Report ---");

    const avg101 = calculateClassAverage(students, 101);
    console.log(`Class Average for Course 101: ${avg101}`);

    const topStudent = findTopStudent(students);
    console.log(`Top Student: ${topStudent.name} (Average: ${topStudent.getAverage()})`);

    const studentsIn102 = filterStudents(students, (student) => student.courses.some(c => c.courseId === 102));
    const namesIn102 = studentsIn102.map(s => s.name).join(", ");
    console.log(`Students in Course 102: ${namesIn102}`);
});
