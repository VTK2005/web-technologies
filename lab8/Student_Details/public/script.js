const student = {
    id: 101,
    name: "Priya",
    department: "CSE",
    marks: 92
};

const { id, name, department, marks } = student;

const updatedStudent = {
    ...student,
    grade: "A"
};

document.getElementById("output").innerHTML =
    `ID: ${id}
Name: ${name}
Department: ${department}
Marks: ${marks}
Updated Object:
${JSON.stringify(updatedStudent, null, 2)}`;
