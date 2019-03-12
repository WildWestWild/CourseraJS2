/**
 * @param {Function[]} operations
 * @param {Function} callback
 */

function OnSuccess(data){
   return resultData = data;
}
function OnFail(error){
   return resultFail = error;
}
module.exports = function (operations, callback) {
    let promises = [];
    let resultData = [];
    let resultFail = null;
  operations.forEach(operation => {
    let promise = new Promise(function(resolve, reject) {
      
      let next = function(err, ms) {
        if (err !== null) {
          reject(err);          
        } else {
          resolve(ms);
        };
      };
      operation(next);      
    });
    
    promises.push(promise);
  });

    Promise.all(promises)
      .then(res => { callback(null, res)} , err => {callback(err, null)});
};
   