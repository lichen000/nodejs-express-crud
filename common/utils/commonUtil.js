let commonUtil = {

    /**
     *
     * @param obj
     * @returns {boolean}
     */
    isEmptyObject: function(obj) {
        if (obj === null || obj === undefined || obj === "" || obj === {} || obj === []) {
            return true;
        }
        let name;
        for ( name in obj) {
            return false;
        }
        return true;
    }
};

module.exports = commonUtil;