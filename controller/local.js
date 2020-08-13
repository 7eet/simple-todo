var fs = require("fs");

exports.writeFile = function (filename, data, reWrite) {
  const cwd = process.cwd();
  if (data) {
    let jsonData = null;

    if (!fs.existsSync(`${cwd}/data/` + filename)) {
      fs.writeFileSync(`${cwd}/data/` + filename, "[]", (err) => {
        if (err) throw err;
        console.log("Failed to write data to file.");
      });
    }

    if (fs.existsSync(`${cwd}/data/` + filename)) {
      if (reWrite) { 
         fs.writeFileSync(
           `${cwd}/data/` + filename,
           JSON.stringify(data),
           (err) => {
             if (err) throw err;
             console.log("Failed to write data to file.");
           }
         );
        return;
      }
      jsonData = readJson(filename);
      jsonData.push(data);

      fs.writeFileSync(
        `${cwd}/data/` + filename,
        JSON.stringify(jsonData),
        (err) => {
          if (err) throw err;
          console.log("Failed to write data to file.");
        }
      );
    }
  }
};

exports.readFile = function (filename) {
  let jsonData = readJson(filename);
  return jsonData;
}

function readJson(filename) { 
  const cwd = process.cwd();
  let data = fs.readFileSync(`${cwd}/data/` + filename);
  let jsonData = null;

  if (data) {
    jsonData = JSON.parse(data);
  }
  return jsonData;
}