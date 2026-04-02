const express = require('express');
const { getAll, getById, create, update, remove } = require('../controllers/articleController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);

router.post('/', authMiddleware, roleMiddleware(['author', 'admin']), create);
router.put('/:id', authMiddleware, roleMiddleware(['author', 'admin']), update);
router.delete('/:id', authMiddleware, roleMiddleware(['author', 'admin']), remove);

module.exports = router;