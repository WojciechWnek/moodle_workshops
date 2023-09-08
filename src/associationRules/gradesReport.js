import { postRequest } from '../service.js';
import { endpoints } from '../endpoints.js';

const getCousresIds = async (phrase) => {
  const response = await postRequest(endpoints.tool_moodlenet_search_courses, {
    searchvalue: phrase,
  });
  const courseInfo = response.courses.map((course) => ({
    id: course.id,
    courseName: course.fullname,
  }));
  return courseInfo;
};

const assignUsersToCourse = async (courses) => {
  const assignedUsers = await Promise.all(
    courses.map(async (course) => {
      const response = await postRequest(endpoints.core_enrol_get_enrolled_users, {
        courseid: course.id,
      });
      const unassignedUsers = response.map((user) => {
        return {
          id: user.id,
          email: user.email,
          fullname: user.fullname,
          roles: user.roles,
        };
      });
      return {
        course: course,
        users: unassignedUsers,
      };
    })
  );
  return assignedUsers;
};

const assignGradesToStudents = async (coursesUsers) => {
  const studentsWithGrades = await Promise.all(
    coursesUsers.map(async (courseInfo) => {
      const response = await Promise.all(
        courseInfo.users.map(async (user) => {
          if (!user.roles.some((role) => role.shortname === 'student')) return user;
          const res = await postRequest(endpoints.gradereport_user_get_grade_items, {
            courseid: courseInfo.course.id,
            userid: user.id,
          });
          if (!res.usergrades) return { ...user, grades: null };
          const grades = res.usergrades[0].gradeitems
            .filter((grade) => grade.itemtype !== 'course')
            .map((grade) => grade.gradeformatted);
          return {
            ...user,
            grades: grades,
          };
        })
      );
      return {
        course: courseInfo.course,
        users: response,
      };
    })
  );
  return studentsWithGrades;
};

const gradesReport = async () => {
  const courses = await getCousresIds('Seminarium_');
  const coursesUsers = await assignUsersToCourse(courses);
  const coursesUsersWithGrades = await assignGradesToStudents(coursesUsers);
  return coursesUsersWithGrades;
};

export default gradesReport;
