import { postRequest } from './service.js';
import { endpoints } from './endpoints.js';
import saveFileFromLink from './saveFileFromLink.js';
import 'dotenv/config';

// Get assignments
// const contents = await postRequest(endpoints.core_course_get_contents, {
//   courseid: 11,
// });
// console.log(contents);

// znajdz assignmentid
// const assignments = await postRequest(endpoints.mod_assign_get_assignments, {
//   'courseids[0]': 11,
//   includenotenrolledcourses: 1,
// });
// console.log(assignments);
// console.log(assignments.courses[0].assignments);

//Działa - jest fileurl do którego trzeba dodac ?token=TOKEN i sie pobiera
// const file = await postRequest(endpoints.mod_assign_get_submissions, {
//   assignmentids: [39],
// });
// console.log(file.assignments[0].submissions[1].plugins[0].fileareas[0]);

// console.log(file.assignments[0].submissions[0].plugins[0]);
// console.log(file.assignments[0].submissions[0].plugins[0].fileareas[0].files);

// działa i dopisuje komentarz w  'plugindata[assignfeedbackcomments_editor][text]'
// const updateGrade = await postRequest(endpoints.mod_assign_save_grade, {
//   assignmentid: 39,
//   userid: 9,
//   grade: 30,
//   attemptnumber: -1,
//   addattempt: 1,
//   workflowstate: 'graded',
//   applytoall: 0,
//   'plugindata[assignfeedbackcomments_editor][text]': 'text dodany za pomocą API',
//   'plugindata[assignfeedbackcomments_editor][format]': 1,
//   'plugindata[files_filemanager]': 1,
// });

// console.log(updateGrade);

const file2 = await postRequest(endpoints.mod_assign_get_submissions, {
  assignmentids: [40],
});

const fileURL = file2.assignments[0].submissions[1].plugins[0].fileareas[0].files[0].fileurl;

console.log(file2.assignments[0].submissions[1].plugins[0].fileareas[0].files[0].fileurl);
// console.log(file.assignments[0].submissions[0].plugins[0]);

const token = process.env.API_WSTOKEN;
await saveFileFromLink('praca.pdf', fileURL + `?token=${token}`);
