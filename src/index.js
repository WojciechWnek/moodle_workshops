import gradesReport from './gradesReport.js';
import sendEmail from './emails/sendEmail.js';
import serializeStudents from './serializers/serializeStudents.js';
import serializeTeachers from './serializers/serializeTeachers.js';
import serializeCourses from './serializers/serializeCourses.js';

const init = async () => {
  const coursesWithGrades = await gradesReport('Seminarium_');

  // const studentEmails = serializeStudents(coursesWithGrades);
  // //Wysyła maile do studentów
  // studentEmails.forEach((course) => course.forEach((studentOptions) => sendEmail(studentOptions)));

  const teachersEmails = await serializeTeachers(coursesWithGrades);
  //Wysyła maile do nauczycieli
  teachersEmails.forEach((teacherOptions) => sendEmail(teacherOptions));

  // const coursesEmail = await serializeCourses(coursesWithGrades, [
  //   process.env.DIDACTIC_DEPARTMENT_EMAIL,
  // ]);
  //Wysyła maile do działu dydaktycznego
  // sendEmail(coursesEmail);
};

await init();
