import ExcelJS from 'exceljs';

const teacherExcel = async (teacherData) => {
  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet(`Raport`);
  worksheet.addRow(['Prowadzący:', teacherData.teacherName, teacherData.email]);
  worksheet.addRow([]);

  teacherData.courses.forEach((course) => {
    worksheet.addRow(['Kurs:', course.courseName]);

    worksheet.addRow(['Studenci:', 'Imię i nazwisko', 'Email', 'Tendencja']);
    course.students.forEach((student) => {
      worksheet.addRow(['', student.studentName, student.email, student.trend]);
    });

    worksheet.addRow([]);
    worksheet.addRow([]);
  });
  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
};

export default teacherExcel;
