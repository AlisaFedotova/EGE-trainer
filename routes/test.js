const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Home page'
    });
});

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create page'
    });
});
module.exports = router;