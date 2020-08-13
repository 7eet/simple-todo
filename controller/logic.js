const localStorage = require("./local");

exports.removeOldData = function (parm, filename) {
  filteredArray = localStorage
    .readFile(filename)
    .filter((item) => item.id != parm.id);
  return filteredArray;
}

exports.getTask = function (parm, filename, status) {
  array = localStorage.readFile(filename);
  oldData = array.find((item) => item.id == parm.id);
  oldData.status = status;
  result = oldData;
  return result;
};