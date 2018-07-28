const router = require('express').Router();
const studentService = require('../service/studentService');
const CommonResult = require('../common/dto/commonResult');
const commonUtil = require('../common/utils/commonUtil');
const ApiStatusCode = require('../common/code/apiStatusCode');
const CommonMessage = require('../common/code/commonMessage');

router.all('/get', function(req, res, next) {

    let commonResult = new CommonResult();
    let params = req.method === "GET" ? req.query : req.body;
    let id = params.id;
    if (!id || !/(^[1-9]\d*$)/.test(id)) {
        commonResult.code = ApiStatusCode.PARAM_ERROR;
        commonResult.message = "id格式错误";
        res.send(commonResult);
        return;
    }
    id = parseInt(id);
    studentService.get(id).then(function(data) {
        commonResult.data = data;
        res.send(commonResult);
    }, function(err) {
        commonResult.code = 500;
        commonResult.message = "ERROR: " + err.message;
        res.send(commonResult);
    });
});

router.all('/getall', function(req, res, next) {

    let commonResult = new CommonResult();
    let params = req.method === "GET" ? req.query : req.body;
    let page = params.page ? params.page : 0, size = params.size ? params.size : 20;
    if (page !== 0) {
        if (!/(^[1-9]\d*$)/.test(page) && page !== "0") {
            commonResult.code = ApiStatusCode.PARAM_ERROR;
            commonResult.message = "page格式错误";
            res.send(commonResult);
            return;
        } else {
            page = parseInt(page);
        }
    }
    if (size !== 20) {
        if (!/(^[1-9]\d*$)/.test(size)) {
            commonResult.code = ApiStatusCode.PARAM_ERROR;
            commonResult.message = "size格式错误";
            res.send(commonResult);
            return;
        } else {
            size = parseInt(size);
        }
    }
    studentService.getAll(page, size).then(function(data) {
        commonResult.data = data;
        res.send(commonResult);
    }, function() {
        commonResult.code = ApiStatusCode.INTERNAL_SERVER_ERROR;
        commonResult.message = CommonMessage.SERVER_ERROR;
        res.send(commonResult);
    });
});

router.post('/add', function(req, res, next) {

    let commonResult = new CommonResult();
    let params = req.body;
    let student = {
        note : params.note,
        number: params.number,
        name: params.name,
        age: parseInt(params.age)
    };
    studentService.add(student).then(function(data) {
        commonResult.data = data;
        res.send(commonResult);
    }, function() {
        commonResult.code = ApiStatusCode.INTERNAL_SERVER_ERROR;
        commonResult.message = CommonMessage.SERVER_ERROR;
        res.send(commonResult);
    });

});

router.get('/update', function(req, res, next) {

    let commonResult = new CommonResult();
    let params = req.body;
    let id = params.id;
    if (!id || !/(^[1-9]\d*$)/.test(id)) {
        commonResult.code = ApiStatusCode.PARAM_ERROR;
        commonResult.message = "id格式错误";
        res.send(commonResult);
        return;
    }
    id = parseInt(id);
    let updatedParams = params.updatedParams;
    if (updatedParams) {
        updatedParams = JSON.parse(updatedParams);
        delete updatedParams["id"];
        delete updatedParams["create_time"];
        delete updatedParams["update_time"];
    }
    if (commonUtil.isEmptyObject(updatedParams)) {
        commonResult.code = ApiStatusCode.PARAM_ERROR;
        commonResult.message = "参数updatedParams错误：未提供或格式不正确";
        res.send(commonResult);
        return;
    }

    //首先获取student
    studentService.get(id).then(function(data) {
        if (data) {
            let student = data;
            studentService.update(student, updatedParams).then(function(data2) {
                commonResult.data = data2;
                res.send(commonResult);
            }, function() {
                commonResult.code = ApiStatusCode.INTERNAL_SERVER_ERROR;
                commonResult.message = CommonMessage.SERVER_ERROR;
                res.send(commonResult);
            });
        } else {
            commonResult.code = ApiStatusCode.NOT_FOUND;
            commonResult.message = "您要更新的对象并不存在";
            res.send(commonResult);
        }
    }, function(){
        commonResult.code = ApiStatusCode.INTERNAL_SERVER_ERROR;
        commonResult.message = CommonMessage.SERVER_ERROR;
        res.send(commonResult);
    });
});

router.all('/delete', function(req, res, next) {
    let commonResult = new CommonResult();
    let params = ctx.request.body;
    let id = params.id;
    if (!id || !/(^[1-9]\d*$)/.test(id)) {
        commonResult.code = ApiStatusCode.PARAM_ERROR;
        commonResult.message = "id格式错误";
        res.send(commonResult);
        return;
    }
    id = parseInt(id);
    studentService.del(id).then(function(data) {
        res.send(commonResult);
    }, function() {
        commonResult.code = ApiStatusCode.INTERNAL_SERVER_ERROR;
        commonResult.message = CommonMessage.SERVER_ERROR;
        res.send(commonResult);
    });
});

module.exports = router;