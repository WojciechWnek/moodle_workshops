import 'dotenv/config';

const serializeCourses = (courses) => {
  const allCourses = courses.map((course) => {
    const courseStudents = course.users.filter((user) => {
      return user.grades;
    });

    const serializedStudents = courseStudents.map((student) => {
      return student.grades.filter((grade) => grade.includes('owa')).at(-1) || 'Brak tendencji';
    });

    console.log(serializedStudents);

    const ascendingTrend = serializedStudents.filter((trend) => trend === 'Zwyzkowa').length;
    const descendingTrend = serializedStudents.filter((trend) => trend === 'Spadkowa').length;
    const noTrend = serializedStudents.filter((trend) => trend === 'Brak tendencji').length;

    const courseTeachers = course.users.filter((user) => {
      return user.roles.some((role) => role.shortname === 'editingteacher');
    });

    const serializedTeachers = courseTeachers.map((teacher) => {
      return {
        teacherName: teacher.fullname,
        email: teacher.email,
      };
    });

    const mailOptions = {
      from: 'wsb@wsb.gda.pl',
      to: process.env.DIDACTIC_DEPARTMENT_EMAIL, // dziekanat.email,
      subject: `Podsumowanie trendów z przedmoitu ${course.course.courseName}`,
      template: 'courseTemplate',
      context: {
        subject: course.course.courseName,
        teachers: serializedTeachers,
        trandsCount: {
          ascendingTrend: ascendingTrend,
          descendingTrend: descendingTrend,
          noTrend: noTrend,
        },
      },
    };

    return mailOptions;
  });
  return allCourses;
};

export default serializeCourses;
