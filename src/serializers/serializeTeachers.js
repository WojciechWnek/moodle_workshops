import teacherExcel from '../excel/teacherExcel.js';
import findTrend from '../helpers/findTrend.js';
import getFormatedDate from '../helpers/getFormatedDate.js';

const serializeTeachers = async (courses) => {
  const allTeachers = courses.map((course) => {
    const courseStudents = course.users.filter((user) => {
      return user.grades;
    });

    const serializedStudents = courseStudents.map((student) => {
      return {
        studentName: student.fullname,
        email: student.email,
        trend: findTrend(student.grades, 'owa'),
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

    return serializedTeachers;
  });
  const teachersObject = {};

  allTeachers.forEach((courseArray) => {
    courseArray.forEach((course) => {
      const teacherName = course.teacherName;
      if (!teachersObject[teacherName]) {
        teachersObject[teacherName] = {
          teacherName: course.teacherName,
          email: course.email,
          courses: [],
        };
      }
      teachersObject[teacherName].courses.push({
        courseName: course.courseName,
        students: course.students,
      });
    });
  });

  const teacherArray = Object.values(teachersObject);

  const preparedData = await Promise.all(
    teacherArray.map(async (teacherData) => {
      const attachment = await teacherExcel(teacherData);

      const filename = 'Raport ' + getFormatedDate() + '.xlsx';

      const mailOptions = {
        from: 'wsb@wsb.gda.pl',
        to: process.env.TEACHER_TEST_EMAIL || teacherData.email,
        subject: `Raport postępów studentów na prowadzonych kursach.`,
        template: 'teacherTemplate',
        context: {
          teacher: teacherData.teacherName,
        },
        attachments: [
          {
            filename,
            content: attachment,
            contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          },
        ],
      };
      return mailOptions;
    })
  );

  return preparedData;
};

export default serializeTeachers;
