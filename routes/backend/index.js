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

exports.check24 = function (req, standardAnswer) {
    let Task1Answ = req.body.innerTaskAnswer1,
        Task2Answ = req.body.innerTaskAnswer2,
        Task3aAnsw = req.body.a,
        Task3bAnsw = req.body.b,
        corrAnswCount = 0;

    if (isCorrectAnswer(Task1Answ, standardAnswer.answers.innerTaskAnswer1)) {
        corrAnswCount++;
        console.log('[check24] first correct');
    } else {
        console.log('[check24] first wrong');
    }
    if (isCorrectAnswer(Task2Answ, standardAnswer.answers.innerTaskAnswer2)) {
        corrAnswCount++;
        console.log('[check24] second correct');
    } else {
        checkInnerTask2(standardAnswer, Task2Answ);
        console.log('[check24] second wrong');
    }

    if (isCorrectAnswer(Task3aAnsw.join(' '), standardAnswer.answers.innerTaskAnswer3.a.join(' '))) {
        corrAnswCount++;
        console.log('[check24] 3a correct');
    } else {
        console.log('[check24] 3a wrong');
    }
    if (isCorrectAnswer(Task3bAnsw.join(' '), standardAnswer.answers.innerTaskAnswer3.b.join(' '))) {
        corrAnswCount++;
        console.log('[check24] 3b correct');
    } else {
        console.log('[check24] 3b wrong');
    }

    console.log('[check24] correct answers count:', corrAnswCount);
    return countCorrectAnswers(corrAnswCount);
};

function countCorrectAnswers(corrAnswCount) {
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
    console.log('[countCorrectAnswers] mark:', mark);
    return mark;
}

function checkInnerTask2(task, str) {
    //код, две строки из правильного кода и то, куда их вставить
    let wrongStr1 = task.answers.innerTaskAnswer3.a[0],
        rightStr1 = task.answers.innerTaskAnswer3.a[1],
        wrongStr2 = task.answers.innerTaskAnswer3.b[0],
        rightStr2 = task.answers.innerTaskAnswer3.b[1],
        code = task.code.codeRow,
        N = str,
        correctCode;
    console.log('[checkInnerTask2] task', task);
    //составить верный код из исходного кода и двух правильных строк
    console.log('[checkInnerTask2] call composeCode');
    // correctCode = composeCode(code, wrongStr1, rightStr1, wrongStr2, rightStr2); //правильный код
    //вставить N, который задал пользователь, в правильный код
    //TODO: вставить N в правильный код

    //вставить N, который задал пользователь, в НЕправильный код
    //TODO: вставить N в неправильный код

    //отправить запрос с правильным кодом и N пользователя
    // compileCode(correctCode)

    //отправить запрос с изначальным кодом и N пользователя
    console.log('[checkInnerTask2] call compileCode');
    // coliru.compileCode(code);
    coliru.compileCode(code)
        // .then(function (response) {
        //     console.log('Its OK', response);
        // })
        // .catch(function (errorText) {
        //     console.log('Error:', errorText);
        // });

    //обернуть всё в трай кетч
    //обработать ответы
    //сравнить ответы
    //вернуть верно / неверно


}

function composeCode(code, str1, newStr1, str2, newStr2) {

}

