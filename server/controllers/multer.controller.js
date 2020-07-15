const fs = require("fs");

let saveFile = (req, res) => {
  let { file } = req.file;

  // console.log(req.file);

  !file
    ? (fs.createReadStream("./files/" + req.file.filename),
      res.status(200).json({
        ok: true,
        data: file,
        msg: "uploaded image",
      }))
    : res.status(500).json({
        ok: false,
        data: null,
        msg: "error",
      });
};

let getFiles = (req, res) => {
  fs.readdir("./files", (err, files) => {
    let pagina = [];
    for (let i = 0; i < files.length; i++) {
      pagina.push(files[i]);
    }
    res.send(pagina);
  });
};

module.exports = {
  saveFile,
  getFiles,
};
