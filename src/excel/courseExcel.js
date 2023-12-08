import ExcelJS from 'exceljs';
import getFormatedDate from '../helpers/getFormatedDate.js';

const courseExcel = async (serializedCourses) => {
  const workbook = new ExcelJS.Workbook();

  const headerStyle = {
    font: { bold: true, color: { argb: 'FFFFFF' } },
    fill: {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '333333' },
    },
    border: {
      top: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
    },
  };

  // Create a style for data rows
  const dataStyle = {
    font: { color: { argb: '000000' } },
    border: {
      top: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
    },
  };

  const worksheet = workbook.addWorksheet(`Raport`);

  worksheet.getColumn(1).width = 20;
  worksheet.getColumn(2).width = 20;
  worksheet.getColumn(3).width = 20;

  worksheet.addRow(['Raport z dnia:', getFormatedDate()]).eachCell((cell) => {
    cell.fill = headerStyle.fill;
    cell.font = headerStyle.font;
    cell.border = headerStyle.border;
  });

  worksheet.addRow([]);

  serializedCourses.forEach((course) => {
    worksheet.addRow(['Kurs:']).eachCell((cell) => {
      cell.fill = headerStyle.fill;
      cell.font = headerStyle.font;
      cell.border = headerStyle.border;
    });
    worksheet.addRow([course.courseName]).eachCell((cell) => {
      cell.font = dataStyle.font;
      cell.border = dataStyle.border;
    });
    worksheet.addRow([]);

    worksheet.addRow(['Prowadzący:']).eachCell((cell) => {
      cell.fill = headerStyle.fill;
      cell.font = headerStyle.font;
      cell.border = headerStyle.border;
    });
    worksheet.addRow(['Imię i nazwisko', 'Email']).eachCell((cell) => {
      cell.fill = headerStyle.fill;
      cell.font = headerStyle.font;
      cell.border = headerStyle.border;
    });

    course.couresTeachers.forEach((teacher) => {
      worksheet.addRow([teacher.teacherName, teacher.email]).eachCell((cell) => {
        cell.font = dataStyle.font;
        cell.border = dataStyle.border;
      });
    });
    worksheet.addRow([]);
    worksheet.addRow(['Tendencje studentów:']).eachCell((cell) => {
      cell.fill = headerStyle.fill;
      cell.font = headerStyle.font;
      cell.border = headerStyle.border;
    });

    worksheet.addRow(['Zwyżkowa', 'Spadkowa', 'Brak trendencji']).eachCell((cell) => {
      cell.fill = headerStyle.fill;
      cell.font = headerStyle.font;
      cell.border = headerStyle.border;
    });
    worksheet
      .addRow([
        course.trandsCount.ascendingTrend,
        course.trandsCount.descendingTrend,
        course.trandsCount.noTrend,
      ])
      .eachCell((cell) => {
        cell.font = dataStyle.font;
        cell.border = dataStyle.border;
      });
    worksheet.addRow([]);
    worksheet.addRow([]);
  });
  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
};

export default courseExcel;
