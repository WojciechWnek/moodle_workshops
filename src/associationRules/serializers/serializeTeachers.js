const serializeTeachers = (courses) => {
  const allTeachers = courses.map((course) => {
    const courseStudents = course.users.filter((user) => {
      return user.grades;
    });

    const serializedStudents = courseStudents.map((student) => {
      return {
        studentName: student.fullname,
        email: student.email,
        trend: student.grades.filter((grade) => grade.includes('owa')).at(-1) || 'Brak trendu',
      };
    });

    const courseTeachers = course.users.filter((user) => {
      return user.roles.some((role) => role.shortname === 'editingteacher');
    });

    const serializedTeachers = courseTeachers.map((teacher) => {
      return {
        courseName: course.course.courseName,
        teacherName: teacher.fullname,
        email: teacher.email,
        students: serializedStudents,
      };
    });

    const mailOptions = serializedTeachers.map((teacher) => {
      return {
        from: 'wsb@wsb.gda.pl',
        to: 'wownek@gmail.com', // teacher.email,
        subject: `Trendy studentów z przedmitu ${teacher.courseName}`,
        template: 'teacherTemplate',
        context: {
          subject: teacher.courseName,
          teacher: { fullname: teacher.teacherName },
          students: teacher.students,
        },
      };
    });

    return mailOptions;
  });
  return allTeachers;
};

export default serializeTeachers;
