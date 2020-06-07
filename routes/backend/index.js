const coliru = require('./data-exchange');

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
function isCorrectAnswer(first, second) {
    if (first.length !== 0 && second.length !== 0) {
        first = isTrimmedEmpty(first);
        first = getArray(first);
        second = isTrimmedEmpty(second);
        second = getArray(second);
        return isSameContent(first, second);
    }
    return false;
}

class Task {
    constructor(answer, userAnswers, m) {
        this.answer = answer;
        this.userAnswers = userAnswers;
        this.m = m;
    }

    check() {
    };

}

exports.Task24 = class extends Task {
    constructor(code, answer, userAnswers) {
        super(answer, userAnswers);
        this.code = code;
    }

    check() {
        let corrAnswCount = 0;
        if (isCorrectAnswer(this.userAnswers.innerTaskAnswer1, this.answer.innerTaskAnswer1)) {
            corrAnswCount++;
            console.log('[Task24][check] first correct');
        } else {
            console.log('[Task24][check] first wrong');
        }
        if (isCorrectAnswer(this.userAnswers.innerTaskAnswer2, this.answer.innerTaskAnswer2)) {
            corrAnswCount++;
            console.log('[Task24][check] second correct');
        } else {
            if (this.isSecondTaskCorrect(this.answer.innerTaskAnswer3, this.userAnswers.innerTaskAnswer3, this.code)) {
                corrAnswCount++;
                console.log('[Task24][check] second correct');
            } else {
                console.log('[Task24][check] second wrong');
            }
        }

        console.log('[Task24][check] correct answers count:', corrAnswCount);
        return countTotalMark(corrAnswCount);
    }

    isSecondTaskCorrect(task, str, code) {
        //код, две строки из правильного кода и то, куда их вставить
        let wrongStr1 = task.a[0],
            rightStr1 = task.a[1],
            wrongStr2 = task.b[0],
            rightStr2 = task.b[1],
            N = str,
            correctCode;
        console.log('[isSecondTaskCorrect] task', task);
        //составить верный код из исходного кода и двух правильных строк
        console.log('[isSecondTaskCorrect] call composeCode');
        // correctCode = composeCode(code, wrongStr1, rightStr1, wrongStr2, rightStr2); //правильный код
        //вставить N, который задал пользователь, в правильный код
        //TODO: вставить N в правильный код

        //вставить N, который задал пользователь, в НЕправильный код
        //TODO: вставить N в неправильный код

        //отправить запрос с правильным кодом и N пользователя
        // compileCode(correctCode)

        //отправить запрос с изначальным кодом и N пользователя
        console.log('[isSecondTaskCorrect] call compileCode');
        // coliru.compileCode(code);
        coliru.compileCode(code).then((a) => {
            console.log(a);
        }).catch((e) => {
            console.log(e);
        });

        //обернуть всё в трай кетч
        //обработать ответы
        //сравнить ответы
        //вернуть верно / неверно
        return true;
    }
};

function countTotalMark(corrAnswCount) {
    let mark;
    switch (corrAnswCount) {
        case 2:
            mark = 1;
            break;
        case 3:
            mark = 2;
            break;
        case 4:
            mark = 3;
            break;
        default:
            mark = 0;
    }
    console.log('[countTotalMark] mark:', mark);
    return mark;
}


function composeCode(code, str1, newStr1, str2, newStr2) {

}

