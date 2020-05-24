/*
    Removes double quote and side spaces in lower case
    @param str  type String

 */
function isTrimmedEmpty(str) {
    return str.replace(/"/g, "").replace(/,/g, "").replace(/ +/g, ' ')
        .replace(/;/g, "").toLowerCase().trim();
}

/*
    Returns Array
    @param str  type String. Contains content divided by spaces
 */
function getArray(str) {
    return str.split(' ');
}

/*
*   Returns Boolean
*   @param first    type String
*   @param secont   type String
*/
function isSameContent(first, second) {
    if (first.length === second.length) {
        for (let i = 0; i < first.length; i++) {
            if (first[i] !== second[i]) {
                return false;
            }
        }
    } else {
        return false;
    }
    return true;
}

/*
* returns boolean
* @param userAnswer type String
* @param standardAnswer type String
*/
exports.isCorrectAnswer = function (first, second) {
    if (first.length !== 0 && second.length !== 0) {
        first = isTrimmedEmpty(first);
        first = getArray(first);
        second = isTrimmedEmpty(second);
        second = getArray(second);
        return isSameContent(first, second);
    }
    return false;
};
