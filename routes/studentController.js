const express = require('express');
const router = express.Router();
const Student = require('../entity/student')
const studentService = require('../service/studentService');
const CommonResult = require('../dto/commonResult');
const MyPage = require('../dto/myPage');

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

router.all('/getallpage', function(req, res, next) {

    let commonResult = new CommonResult();
    let page, size;
    if (req.method === "GET") {
        page = req.query.page;
        size = req.query.size;
    } else if (req.method === "POST") {
        page = req.body.page;
        size = req.body.size;
    }
    if (!page || isNaN(page) || page < 0) {
        page = 0;
    }
    if (!size || isNaN(size) || size < 1) {
        size = 10;
    }
    studentService.getAllPage(page, size).then(function(data) {

        var myPage = new MyPage();
        myPage.page = page;
        myPage.size = size;
        myPage.content = data.results;
        if (data.count > 0) {
            var totalPages = (data.count - 1) / size + 1;
            myPage.totalElements = data.count;
            myPage.totalPages = totalPages;
        }

        commonResult.data = myPage;
        res.send(commonResult);
    }, function() {
        commonResult.code = 500;
        commonResult.message = "ERROR";
        res.send(commonResult);
    });
});

router.all('/delete', function(req, res, next) {
    let commonResult = new CommonResult();

    let id;
    if (req.method === "GET") {
        id = req.query.id;
    } else if (req.method === "POST") {
        id = req.body.id;
    }

    id = parseInt(id);

    studentService.delete(id).then(function(data) {
        res.send(commonResult);
    }, function() {
        commonResult.code = 500;
        commonResult.message = "ERROR";
        res.send(commonResult);
    });
});

router.all('/add', function(req, res, next) {
    let commonResult = new CommonResult();

    let student = new Student();
    if (req.method === "GET") {
        student.note = req.query.note;
        student.number = req.query.number;
        student.name = req.query.name;
        student.age = parseInt(req.query.age);
    } else if (req.method === "POST") {
        student.note = req.body.note;
        student.number = req.body.number;
        student.name = req.body.name;
        student.age = parseInt(req.body.age);
    }

    studentService.add(student).then(function(data) {
        res.send(commonResult);
    }, function() {
        commonResult.code = 500;
        commonResult.message = "ERROR";
        res.send(commonResult);
    });
});

router.all('/update', function(req, res, next) {
    let commonResult = new CommonResult();

    let id, updatedParams;
    if (req.method === "GET") {
        id = parseInt(req.query.id);
        updatedParams = JSON.parse(req.query.updatedParams);
    } else if (req.method === "POST") {
        id = parseInt(req.body.id);
        updatedParams = JSON.parse(req.body.updatedParams);
    }

    studentService.update(id, updatedParams).then(function(data) {
        res.send(commonResult);
    }, function() {
        commonResult.code = 500;
        commonResult.message = "ERROR";
        res.send(commonResult);
    });
});

module.exports = router;