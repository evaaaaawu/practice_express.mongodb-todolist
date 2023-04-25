const express = require('express') // 引用 Express 與 Express 路由器
const router = express.Router()
const Todo = require('../../models/todo') // 引用 Todo model

router.get('/', (req, res) => {
  const userId = req.user._id   // 變數設定
  Todo.find({ userId }) // 加入查詢條件
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ _id: 'asc' }) // 新增這裡：根據 _id 升冪排序
    .then(todos => res.render('index', { todos })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
}) // 定義首頁路由

module.exports = router // 匯出路由模組