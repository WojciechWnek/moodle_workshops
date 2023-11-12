import gradesReport from './gradesReport.js';
import sendEmail from './emails/sendEmail.js';
import serializeStudents from './serializers/serializeStudents.js';
import serializeTeachers from './serializers/serializeTeachers.js';
import serializeCourses from './serializers/serializeCourses.js';

// const courseSearchPhrase = 'Seminarium_1';
const courseSearchPhrase = 'INMN4_s1';
const coursesSummaryRecipients = process.env.TEST_EMAIL || [];

const init = async (searchPhrase, recipients) => {
  const coursesWithGrades = await gradesReport(searchPhrase);

  const studentEmails = serializeStudents(coursesWithGrades);
  // //Wysyła maile do studentów
  studentEmails.forEach((course) => course.forEach((studentOptions) => sendEmail(studentOptions)));

  const teachersEmails = await serializeTeachers(coursesWithGrades);
  //Wysyła maile do nauczycieli
  teachersEmails.forEach((teacherOptions) => sendEmail(teacherOptions));

  const coursesEmail = await serializeCourses(coursesWithGrades, recipients);
  //Wysyła maile do działu dydaktycznego
  sendEmail(coursesEmail);
};

await init(courseSearchPhrase, coursesSummaryRecipients);
