var express = require("express");
var router = express.Router();
var QRCode = require("qrcode");
var GeneratorExcel = require("../utils/generator-excel");

/**
 * @method get
 * @param {String} text 二维码的内容
 */
router.get("/getQR", (req, res) => {
  const { text } = req.query;
  QRCode.toDataURL(text, function(err, base64Url) {
    const imgBuffer = Buffer.from(base64Url.replace(/.+,/, ""), "base64");
    res.writeHead("200", { "Content-Type": "image/jpeg" });
    res.end(imgBuffer, "binary");
  });
});

/**
 * @method post
 * @param {String} name Excel表格名称
 * @param {Object} data Excel表格源数据，格式如下：
 * {
 *      Sheet1: [
 *          ['姓名', '学号', '籍贯'],
 *          ['lxz', '10131911', 'hunan']
 *      ]
 * }
 */
router.post("/getExcel", (req, res) => {
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
});

module.exports = router;
