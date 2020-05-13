const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('pages/index', {
        title: 'Home page'
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

module.exports = router;