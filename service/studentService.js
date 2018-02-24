const pool = require('../config/db');
pool.connect();

/* GET users listing. */

let studentService = {

    // /**
    //  *
    //  * @param id
    //  * @returns {Promise<any>}
    //  */
    // get: function(id) {
    //     let sql = "select * from t_student where id = " + id;
    //     let promise = new Promise(function(resolve, reject) {
    //         pool.query(sql, function (error, results, fields) {
    //             if (error) {
    //                 reject(error);
    //             } else if (results) {
    //                 resolve(results);
    //             }
    //         });
    //     });
    //     return promise;
    // },

    /**
     *
     * @param id
     * @returns {Promise<any>}
     */
    get: async function(id) {
        let sql = "select * from t_student where id = " + id;
        let promise = new Promise(function(resolve, reject) {
            pool.query(sql, function (error, results, fields) {
                if (error) {
                    reject(error);
                } else if (results) {
                    resolve(results);
                }
            });
        });
        return promise;
    },

    /**
     *
     * @returns {Promise<any>}
     */
    getAll: function() {
        let sql = "select * from t_student";
        let promise = new Promise(function(resolve, reject) {
            pool.query(sql, function (error, results, fields) {
                if (error) {
                    reject(error);
                } else if (results) {
                    resolve(results);
                }
            });
        });
        return promise;
    },

    /**
     *
     * @param page
     * @param size
     * @returns {Promise<any>}
     */
    getAllPage: function(page, size) {

        var offset = page * size;
        let sql = "select * from t_student limit " + size + " offset " + offset;
        let sql2 = "select count(*) from t_student";
        let promise = new Promise(function(resolve, reject) {

            pool.query(sql, function (error, results, fields) {
                if (error) {
                    reject(error);
                }
                if (results) {
                    pool.query(sql2, function (error2, count, fields2) {
                        if (error2) {
                            reject(error2);
                        } else if (count) {
                            resolve({results: results, count: count});
                        }
                    });
                }
            });
        });
        return promise;
    },

    /**
     *
     * @param id
     * @returns {Promise<any>}
     */
    delete: function(id) {

        let sql = "delete from t_student where id = " + id;
        let promise = new Promise(function(resolve, reject) {

            pool.query(sql, function (error, results, fields) {
                if (error) {
                    reject(error);
                } else if (results) {
                    resolve(results);
                }
            });
        });
        return promise;
    },

    /**
     *
     * @param student
     * @returns {Promise<any>}
     */
    add: function(student) {

        let sql = "insert into t_student (note, number, name, age) values ('" + student.note + "', '"
            + student.number + "', '" + student.name + "', " + student.age + ")";
        let promise = new Promise(function(resolve, reject) {

            pool.query(sql, function (error, results, fields) {
                if (error) {
                    reject(error);
                } else if (results) {
                    resolve(results);
                }
            });
        });
        return promise;
    },

    /**
     *
     * @param id
     * @param updatedParams
     * @returns {Promise<any>}
     */
    update: function(id, updatedParams) {

        let sql = "";

        for (let key in updatedParams) {
            if (updatedParams.hasOwnProperty(key)) {
                let value = updatedParams[key];
                if (typeof(value) === "string") {
                    sql = sql + "," + key + "='" + value + "'";
                } else {
                    sql = sql + "," + key + "=" + value;
                }
            }
        }
        if (sql.length > 0) {
            sql = sql.substring(1, sql.length);
        }
        sql = "update t_student set " + sql + " where id = " + id;

        let promise = new Promise(function(resolve, reject) {

            pool.query(sql, function (error, results, fields) {
                if (error) {
                    reject(error);
                } else if (results) {
                    resolve(results);
                }
            });
        });
        return promise;
    }
};

module.exports = studentService;