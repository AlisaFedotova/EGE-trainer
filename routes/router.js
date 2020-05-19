const {Router} = require('express');
const Task = require('../models/schema');
const router = Router();

router.get('/', async (req, res) => {
    const COneTasks = await Task.find({}).lean(); //получить все таски, которые есть
    res.render('pages/index', {
        title: 'Тренер ЕГЭ',
        isIndex: true,
        COneTasks,   //передаем массив задач как параметр
    });
});

router.get('/create', (req, res) => {
    res.render('pages/create', {
        title: 'Create page'
    });
});

router.get('/addC1', (req, res) => {
    res.render('pages/addTask/addC1', {
        title: 'Тренер ЕГЭ',
        isAddTask: true,
    });
});

router.get('/addC2', (req, res) => {
    res.render('pages/addTask/addC2', {
        title: 'Добавить задание C2'
    });
});

router.get('/addC4', (req, res) => {
    res.render('pages/addTask/addC4', {
        title: 'Добавить задание C4'
    });
});
router.post('/addC1', async (req, res) => { //добавляем новую задачу в базу
    console.log('request:', req.body);
    const task = new Task({ //создаем модель задачи
        title: req.body.title,
        taskText: req.body.taskText,
        code: {
            codeRow: req.body.codeRow
        },
        innerTask: req.body.innerTask,
        answers: {
            innerTaskAnswer1: req.body.innerTaskAnswer1,
            innerTaskAnswer2: req.body.innerTaskAnswer2,
            innerTaskAnswer3: {
                a: [req.body.answer311, req.body.answer312],
                b: [req.body.answer321, req.body.answer322]
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