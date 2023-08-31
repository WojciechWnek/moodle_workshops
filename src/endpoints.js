export const endpoints = {
  //Return course details
  core_course_get_courses: 'core_course_get_courses',
  //For some given input search for a course that matches
  tool_moodlenet_search_courses: 'tool_moodlenet_search_courses',
  //Get enrolled users by course id.
  core_enrol_get_enrolled_users: 'core_enrol_get_enrolled_users',
  //Returns the complete list of grade items for users in a course
  gradereport_user_get_grade_items: 'gradereport_user_get_grade_items',

  //Get course contents
  core_course_get_contents: 'core_course_get_contents',
  //Returns the courses and assignments for the users capability
  mod_assign_get_assignments: 'mod_assign_get_assignments',

  mod_assign_save_grade: 'mod_assign_save_grade',
  //Update a grade item and associated student grades.??
  core_grades_update_grades: 'core_grades_update_grades',

  core_files_get_files: 'core_files_get_files',

  mod_assign_get_submissions: 'mod_assign_get_submissions',
};
