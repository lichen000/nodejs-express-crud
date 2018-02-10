const express = require('express');
const router = express.Router();
const studentService = require('../service/studentService');
const CommonResult = require('../dto/commonResult');

router.all('/get', function(req, res, next) {

    let id;
    if (req.method === "GET") {
        id = req.query.id;
    } else if (req.method === "POST") {
        id = req.body.id;
    }

    let studentId = parseInt(id);

    let if_ok = false;
    if (studentId === null || studentId === undefined || studentId === "" || isNaN(studentId)) {
        if_ok = false;
    } else if (typeof studentId !== "number") {
        if_ok = false;
    } else if (studentId <= 0) {
        if_ok = false;
    } else if (studentId % 1 === 0) {
        if_ok = true;
    }
    let commonResult = new CommonResult();
    if (!if_ok) {
        commonResult.code = 432;
        commonResult.message = "参数id错误：未提供或格式不正确";
        res.send(commonResult);
    } else {
        studentService.get(studentId).then(function(data) {
            commonResult.data = data;
            res.send(commonResult);
        }, function() {
            commonResult.code = 500;
            commonResult.message = "ERROR";
            res.send(commonResult);
        });
    }
});

/* GET users listing. */
router.all('/getall', function(req, res, next) {

    let commonResult = new CommonResult();
    studentService.getAll().then(function(data) {
        commonResult.data = data;
        res.send(commonResult);
    }, function() {
        commonResult.code = 500;
        commonResult.message = "ERROR";
        res.send(commonResult);
    });
});

module.exports = router;