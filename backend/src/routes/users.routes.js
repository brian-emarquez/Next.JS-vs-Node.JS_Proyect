const { Router } = require('express');
const { getUsers, createUser } = require('../controllers/users.controller');

const router = Router();

router.get('/', getUsers);   // ✅ GET
router.post('/', createUser); // ✅ POST

module.exports = router;
