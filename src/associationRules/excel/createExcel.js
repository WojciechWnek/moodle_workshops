import ExcelJS from 'exceljs';

const createExcel = async (serializedCourses) => {
  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet(`Raport`);
  serializedCourses.forEach((course) => {
    worksheet.addRow(['Kurs:', course.courseName]);
    worksheet.addRow(['Prowadzący:', 'Imię i nazwisko', 'Email']);
    course.couresTeachers.forEach((teacher) => {
      worksheet.addRow(['', teacher.teacherName, teacher.email]);
    });
    worksheet.addRow(['Tendencje studentów:', 'Zwyżkowa', 'Spadkowa', 'Brak trendencji']);
    worksheet.addRow([
      '',
      course.trandsCount.ascendingTrend,
      course.trandsCount.descendingTrend,
      course.trandsCount.noTrend,
    ]);
    worksheet.addRow([]);
    worksheet.addRow([]);
  });
  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
};

export default createExcel;
