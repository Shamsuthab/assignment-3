const calculateClassAverage = (students, courseId) => {
    const grades = students.reduce((acc, student) => {
        const course = student.courses.find(c => c.courseId === courseId);
        if (course) acc.push(course.grade);
        return acc;
    }, []);

    if (grades.length === 0) return 0;

    const total = grades.reduce((sum, grade) => sum + grade, 0);
    return (total / grades.length).toFixed(2);
};

const findTopStudent = (students) => {
    return students.reduce((prev, current) => (prev.getAverage() > current.getAverage()) ? prev : current);
};

const filterStudents = (students, criteriaFn) => students.filter(criteriaFn);

module.exports = {
    calculateClassAverage,
    findTopStudent,
    filterStudents
};