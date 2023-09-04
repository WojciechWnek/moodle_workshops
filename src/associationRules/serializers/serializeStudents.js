const serializeStudents = (courses) => {
  const allStudents = courses.map((course) => {
    const courseStudents = course.users.filter((user) => {
      return user.grades;
    });

    const serializedStudents = courseStudents.map((student) => {
      return {
        courseName: course.course.courseName,
        studentName: student.fullname,
        email: student.email,
        trend: student.grades.filter((grade) => grade.includes('owa')).at(-1),
      };
    });

    const mailOptions = serializedStudents.map((student) => {
      if (!student.trend) return;
      return {
        from: 'wsb@wsb.gda.pl',
        to: 'wownek@gmail.com', // student.email,
        subject: `Oceny z przedmitu ${student.courseName}`,
        template: student.trend === 'Spadkowa' ? 'studentTemplateBad' : 'studentTemplateGood',
        context: {
          student: { fullname: student.studentName },
          grades: {
            subject: `${student.courseName}`,
            trend: student.trend,
          },
        },
      };
    });

    return mailOptions;
  });

  return allStudents;
};

export default serializeStudents;
