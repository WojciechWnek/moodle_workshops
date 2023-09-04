import http from 'http';
import fs from 'fs';

const saveFileFromLink = async (filename, excelURL) => {
  http.get(excelURL, function (res) {
    const fileStream = fs.createWriteStream(filename);

    res.pipe(fileStream);

    fileStream.on('finish', function () {
      fileStream.close();
    });
  });
};

export default saveFileFromLink;
