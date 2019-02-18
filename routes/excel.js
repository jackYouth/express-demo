const GeneratorExcel = require("../utils/generator-excel");

module.exports = (req, res) => {
  const { name, data } = req.body;
  const excelData = {
    Sheet1: data
  };
  const excel = new GeneratorExcel(excelData);
  excel.writeFile(`public/excel/${name}.xlsx`);
  res.json({
    code: 0,
    message: "sucess! ",
    url: `//${req.headers.host}/excel/${name}.xlsx`
  });
};
