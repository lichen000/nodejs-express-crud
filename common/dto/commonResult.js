"use strict";

const ApiStatusCode = require('../code/apiStatusCode');
const CommonMessage = require('../code/commonMessage');

class CommonResult {
    constructor() {
        this.code = ApiStatusCode.OK;
        this.message = CommonMessage.OK;
        this.data = null;
        this.timestamp = new Date().getTime();
    }
}

module.exports = CommonResult;