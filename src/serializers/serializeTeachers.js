import teacherExcel from '../excel/teacherExcel.js';

const serializeTeachers = async (courses) => {
  const allTeachers = courses.map((course) => {
    const courseStudents = course.users.filter((user) => {
      return user.grades;
    });

    const serializedStudents = courseStudents.map((student) => {
      return {
        studentName: student.fullname,
        email: student.email,
        trend: student.grades.filter((grade) => grade.includes('owa')).at(-1) || 'Brak tendencji',
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

      const filename = 'Raport ' + new Date().toLocaleDateString() + '.xlsx';

      const mailOptions = {
        from: 'wsb@wsb.gda.pl',
        to: 'wownek@gmail.com', // teacherData.email,
        subject: `Raport z postępów studentów na prowadzonych kursach.`,
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
