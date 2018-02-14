const pool = require('../config/db');
pool.connect();

/* GET users listing. */

let studentService = {

    get: function(id) {
        let promise = new Promise(function(resolve, reject) {
            let sql = "select * from t_student where id = " + id;
            pool.query(sql, function (error, results, fields) {
                if (error) {
                    throw error;
                }
                if (results) {
                    resolve(results);
                }
            });
        });
        return promise;
    },

    getAll: function() {
        let sql = "select * from t_student";
        let promise = new Promise(function(resolve, reject) {
            pool.query(sql, function (error, results, fields) {
                if (error) {
                    throw error;
                }
                if (results) {
                    resolve(results);
                }
            });
        });
        return promise;
    },

    getAllPage: function(page, size) {

        var offset = page * size;
        let sql = "select * from t_student limit " + size + " offset " + offset;
        let sql2 = "select count(*) from t_student";
        let promise = new Promise(function(resolve, reject) {

            pool.query(sql, function (error, results, fields) {
                if (error) {
                    throw error;
                }
                if (results) {
                    pool.query(sql2, function (error2, count, fields2) {
                        if (error2) {
                            throw error2;
                        }
                        if (count) {
                            resolve({results: results, count: count});
                        }
                    });
                }
            });
        });
        return promise;
    },

    delete: function(id) {

        let sql = "delete from t_student where id = " + id;
        let promise = new Promise(function(resolve, reject) {

            pool.query(sql, function (error, results, fields) {
                if (error) {
                    throw error;
                }
                if (results) {
                    resolve(results);
                }
            });
        });
        return promise;
    },

    add: function(student) {

        let sql = "insert into t_student (note, number, name, age) values ('" + student.note + "', '"
            + student.number + "', '" + student.name + "', " + student.age + ")";
        let promise = new Promise(function(resolve, reject) {

            pool.query(sql, function (error, results, fields) {
                if (error) {
                    throw error;
                }
                if (results) {

                    resolve(results);
                }
            });
        });
        return promise;
    },

    update: function(id, updatedParams) {

        let sql = "";

        for (let key in updatedParams) {
            let value = updatedParams[key];
            if (typeof(value) === "string") {
                sql = sql + "," + key + "='" + value + "'";
            } else {
                sql = sql + "," + key + "=" + value;
            }
        }
        if (sql.length > 0) {
            sql = sql.substring(1, sql.length);
        }
        sql = "update t_student set " + sql + " where id = " + id;

        let promise = new Promise(function(resolve, reject) {

            pool.query(sql, function (error, results, fields) {
                if (error) {
                    throw error;
                }
                if (results) {
                    resolve(results);
                }
            });
        });
        return promise;
    }
};

module.exports = studentService;