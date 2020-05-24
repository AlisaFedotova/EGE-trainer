const {Router} = require('express');
const Task = require('../models/schema');
const router = Router();
const help = require('./back-helper');

router.get('/', async (req, res) => {
    const tasks = await Task.find({}).lean(); //получить все таски, которые есть
    res.render('pages/index', {
        title: 'Список задач',
        isIndex: true,
        tasks,   //передаем массив задач как параметр
    });
});

router.get('/add24', (req, res) => {
    res.render('pages/addTask/add24', {
        title: 'Добавить задание типа 25',
        isAddTask: true,
    });
});

router.get('/add25', (req, res) => {
    res.render('pages/addTask/add25', {
        title: 'Добавить задание типа 25'
    });
});

router.get('/add27', (req, res) => {
    res.render('pages/addTask/add27', {
        title: 'Добавить задание типа 27'
    });
});

router.get('/training', async (req, res) => {
    const trainTask = await Task.find({}).lean(); //получить все таски, которые есть
    res.render('pages/training', {
        title: 'Тренировка',
        isTraining: true,
        trainTask
    });
});
router.post('/check', async (req, res) => {
    const task = await Task.findById(req.body.id);
    let Task1Answ = req.body.innerTaskAnswer1,
        Task2Answ = req.body.innerTaskAnswer2,
        Task3aAnsw = req.body.a,
        Task3bAnsw = req.body.b,
        corrAnswCount = 0,
        mark = 0;
    if (help.isCorrectAnswer(Task1Answ, task.answers.innerTaskAnswer1)) {
        corrAnswCount++;
        console.log('first correct');
    } else {
        console.log('first wrong');
    }
    if (help.isCorrectAnswer(Task2Answ, task.answers.innerTaskAnswer2)) {
        corrAnswCount++;
        console.log('second correct');
    } else {
        console.log('second wrong');
    }

    if (help.isCorrectAnswer(Task3aAnsw.join(' '), task.answers.innerTaskAnswer3.a.join(' '))) {
        corrAnswCount++;
        console.log('3a correct');
    } else {
        console.log('3a wrong');
    }
    if (help.isCorrectAnswer(Task3bAnsw.join(' '), task.answers.innerTaskAnswer3.b.join(' '))) {
        corrAnswCount++;
        console.log('3b correct');
    } else {
        console.log('3b wrong');
    }
    console.log('correct answers count:', corrAnswCount);
    switch (corrAnswCount) {
        case 2:
            await res.json({mark: 1});
            break;
        case 3:
            await res.json({mark: 2});
            break;
        case 4:
            await res.json({mark: 3});
            break;
        default:
            await res.json({mark: 0});

    }
});
router.post('/add24', async (req, res) => { //добавляем новую задачу в базу
    console.log('request:', req.body);
    const task = new Task({ //создаем модель задачи
        title: req.body.title,
        taskType: req.body.taskType,
        taskText: req.body.taskText,
        code: {
            codeRow: req.body.codeRow
        },
        innerTask: req.body.innerTask,
        answers: {
            innerTaskAnswer1: req.body.innerTaskAnswer1,
            innerTaskAnswer2: req.body.innerTaskAnswer2,
            innerTaskAnswer3: {
                a: req.body.a,
                b: req.body.b
            }

        },
    });
    await task.save();  //сохраняем задачу в бд
    res.redirect('/');   //редирект на главную страницу
});

router.post("/complete", async (req, res) => {
    try {
        const task = await Task.findById(req.body.id);
        task.completed = !!req.body.completed;
        await task.save();
    } catch (e) {
        console.log(e);

    }
    res.redirect('/');
});

module.exports = router;