import gradesReport from './gradesReport.js';
import sendEmail from './emails/sendEmail.js';
import serializeStudents from './serializers/serializeStudents.js';

const init = async () => {
  const coursesWithGrades = await gradesReport();
  const studentEmails = serializeStudents(coursesWithGrades);
  studentEmails.forEach((course) => course.forEach((studentOptions) => sendEmail(studentOptions)));
};

await init();
