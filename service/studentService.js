const pool = require('../config/db');
pool.connect();

/* GET users listing. */

let studentService = {

    get: function(id) {
        let promise = new Promise(function(resolve, reject) {
            // pool.connect();
            let sql = "select * from t_student where id = " + id;
            pool.query(sql, function (error, results, fields) {
                if (error) {
                    throw error;
                }
                if (results) {
                    resolve(results);
                }
                // pool.end();
            });
        });
        return promise;
    },

    getAll: function() {

        let promise = new Promise(function(resolve, reject) {
            // pool.connect();
            let sql = "select * from t_student";
            pool.query(sql, function (error, results, fields) {
                if (error) {
                    throw error;
                }
                if (results) {
                    resolve(results);
                }
                // pool.end();
            });
        });
        return promise;
    }
};

module.exports = studentService;