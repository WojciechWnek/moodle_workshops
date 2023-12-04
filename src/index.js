import gradesReport from './gradesReport.js';
import sendEmail from './emails/sendEmail.js';
import serializeStudents from './serializers/serializeStudents.js';
import serializeTeachers from './serializers/serializeTeachers.js';
import serializeCourses from './serializers/serializeCourses.js';

const customCourseId = '143070';
const coursesSummaryRecipients = process.env.SUMMARY_REPORT_EMAIL || [];

const init = async (courseId, recipients) => {
  const coursesWithGrades = await gradesReport(courseId);

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

await init(customCourseId, coursesSummaryRecipients);
