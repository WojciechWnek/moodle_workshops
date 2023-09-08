import 'dotenv/config';
// import { buffer } from '../excel/courseExcel.js';
import courseExcel from '../excel/courseExcel.js';

const serializeCourses = async (courses, mailingList) => {
  const allCourses = courses.map((course) => {
    const courseStudents = course.users.filter((user) => {
      return user.grades;
    });

    const serializedStudents = courseStudents.map((student) => {
      return student.grades.filter((grade) => grade.includes('owa')).at(-1) || 'Brak tendencji';
    });

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

    const serializedCourses = {
      courseName: course.course.courseName,
      couresTeachers: serializedTeachers,
      trandsCount: {
        ascendingTrend: ascendingTrend,
        descendingTrend: descendingTrend,
        noTrend: noTrend,
      },
    };

    return serializedCourses;
  });

  const attachment = await courseExcel(allCourses);

  const filename = 'Raport ' + new Date().toLocaleDateString() + '.xlsx';

  const mailOptions = {
    from: 'wsb@wsb.gda.pl',
    to: mailingList, // dziekanat.email,
    subject: `Raport z postępów studentów Uniwersytetu WSB Merito.`,
    template: 'courseTemplate',
    attachments: [
      {
        filename,
        content: attachment,
        contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
    ],
  };

  return mailOptions;
};

export default serializeCourses;
