const express = require('express') // 引用 Express 與 Express 路由器
const router = express.Router()

const home = require('./modules/home') // 引入 home 模組程式碼
const todos = require('./modules/todos') // 引入 todos 模組程式碼
const users = require('./modules/users')
const auth = require('./modules/auth')

const { authenticator } = require('../middleware/auth')  // 掛載 middleware

router.use('/todos', authenticator, todos) // 將網址結構符合 /todos 字串開頭的 request 導向 todos 模組，並加入驗證程序
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home) // 將網址結構符合 / 字串的 request 導向 home 模組，並加入驗證程序

module.exports = router // 匯出路由器