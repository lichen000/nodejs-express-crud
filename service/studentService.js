const pool = require('../config/db');
const MyPage = require('../common/dto/myPage');
pool.connect();

let studentService = {

    /**
     *
     * @param id
     * @returns {Promise<any>}
     */
    get: function(id) {
        let sql = "select * from t_student where id = " + id;
        let promise = new Promise(function(resolve, reject) {
            // pool.connect();
            pool.query(sql, function (error, results, fields) {
                if (error) {
                    reject(error);
                } else if (results && results.length > 0) {
                    resolve(results[0]);
                } else {
                    resolve(null);
                }
                // pool.end();
            });
        });
        return promise;
    },

    /**
     *
     * @returns {Promise<any>}
     */
    getCount: function() {
        let sql = "select count(id) as count from t_student";
        let promise = new Promise(function(resolve, reject) {
            // pool.connect();
            pool.query(sql, function (error, results, fields) {
                if (error) {
                    throw error;
                }
                if (results && results.length > 0) {
                    resolve(results[0].count);
                }
                // pool.end();
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
    getAll: function(page, size) {
        let _this = this;
        let offset = page * size;
        let sql = "select * from t_student limit " + size + " offset " + offset;
        let myPage = new MyPage();
        myPage.page = page;
        myPage.size = size;
        let promise = new Promise(function(resolve, reject) {

            _this.getCount().then(function(count){
                if (count === 0) {
                    resolve(myPage);
                } else {
                    myPage.totalElements = count;
                    myPage.totalPages = parseInt((myPage.totalElements - 1) / size) + 1;
                    // pool.connect();
                    pool.query(sql, function (error, results, fields) {
                        if (error) {
                            throw error;
                        }
                        if (results) {
                            myPage.content = results;
                            resolve(myPage);
                        }
                        // pool.end();
                    });
                }

            }, function(err){
                reject(err)
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
        let _this = this;
        let sql = "insert into t_student (note, number, name, age) values (?, ?, ?, ?)";
        let params = [student.note, student.number, student.name, student.age];
        let promise = new Promise(function(resolve, reject) {
            // pool.connect();
            pool.query(sql, params, function (error, result, fields) {
                if (error) {
                    throw error;
                }
                if (result && result.affectedRows === 1) {
                    let insertId = result.insertId;
                    _this.get(insertId).then(function(data){
                        resolve(data);
                    }, function(){
                        reject();
                    });
                }
                // pool.end();
            });
        });
        return promise;
    },

    /**
     *
     * @param student
     * @param updatedParams
     * @returns {Promise<any>}
     */
    update: function(student, updatedParams) {
        let _this = this;
        for (let key in updatedParams) {
            if (updatedParams.hasOwnProperty(key)) {
                student[key] = updatedParams[key];
            }
        }
        let sql = "update t_student set note = ?, number = ?, name = ?, age = ? where id = ?";
        let params = [student.note, student.number, student.name, student.age, student.id];
        let promise = new Promise(function(resolve, reject) {
            // pool.connect();
            pool.query(sql, params, function (error, result, fields) {
                if (error) {
                    throw error;
                }
                if (result) {
                    _this.get(student.id).then(function(data){
                        resolve(data);
                    }, function(){
                        reject();
                    });
                }
                // pool.end();
            });
        });
        return promise;

    },


    /**
     *
     * @param id
     * @returns {Promise<any>}
     */
    del: function(id) {
        let sql = "delete from t_student where id = " + id;
        let promise = new Promise(function(resolve, reject) {
            // pool.connect();
            pool.query(sql, function (error, result, fields) {
                if (error) {
                    throw error;
                }
                if (result) {
                    resolve();
                }
                // pool.end();
            });
        });
        return promise;
    }
};

module.exports = studentService;