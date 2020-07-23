var fs = require("fs");

exports.writeFile = function (filename, data) {
  const cwd = process.cwd();
  console.log(JSON.stringify(data))
  if (data) {
    let jsonData = null;

    if (!fs.existsSync(`${cwd}/data/` + filename)) {
      console.log("creating it. - " + filename);
      fs.writeFileSync(`${cwd}/data/` + filename, "[]", (err) => {
        if (err) throw err;
        console.log("Failed to write data to file.");
      });
    }

    if (fs.existsSync(`${cwd}/data/` + filename)) {
      jsonData = readJson(filename);
      console.log(`${jsonData} hereis jsondata from filename`)
      console.log("adding data ");
      jsonData.push(data);

      fs.writeFileSync(
        `${cwd}/data/` + filename,
        JSON.stringify(jsonData),
        (err) => {
          if (err) throw err;
          console.log("Failed to write data to file.");
        }
      );
      console.log("added" + JSON.stringify(jsonData));
    }
  }
};

exports.readFile = function (filename) {
  let jsonData = readJson(filename);
  return jsonData;
}

function readJson(filename) { 
  console.log(process.cwd());
  const cwd = process.cwd();
  let data = fs.readFileSync(`${cwd}/data/` + filename);
  let jsonData = null;

  if (data) {
    jsonData = JSON.parse(data);
  }
  console.log("Returning data " + JSON.stringify(jsonData));
  return jsonData;
}