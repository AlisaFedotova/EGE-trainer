const {Router} = require('express');
const Task = require('../models/schema');
const router = Router();

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
        Task2Answ = req.body.innerTaskAnswer1,
        Task3Answ = req.body.innerTaskAnswer1;
    console.log('Task1Answ',Task1Answ, 'type:',typeof Task1Answ);
    console.log('task.innerTaskAnswer1',task.answers.innerTaskAnswer1, 'type:',typeof task.answers.innerTaskAnswer1);
    if (Task1Answ === task.answers.innerTaskAnswer1) {
        console.log(true);
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