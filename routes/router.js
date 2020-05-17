const {Router} = require('express');
const Task = require('../models/schema');
const router = Router();

router.get('/', async (req, res) => {
    const COneTasks = await Task.find({}) .lean(); //получить все таски, которые есть
    res.render('pages/index', {
        title: 'Home page',
        COneTasks   //передаем массив задач как параметр
    });
});

router.get('/create', (req, res) => {
    res.render('pages/create', {
        title: 'Create page'
    });
});

router.get('/addC1', (req, res) => {
    res.render('pages/addTask/addC1', {
        title: 'Добавить задание C1'
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
    const task = new Task({ //создаем модель задачи
        title: req.body.title
    });
    await task.save();  //сохраняем задачу в бд
    res.redirect('/')   //редирект на главную страницу
});

module.exports = router;