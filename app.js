const express = require('express') // 載入 express 並建構應用程式伺服器
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser') // 引用 body-parser
const methodOverride = require('method-override') // 載入 method-override
const flash = require('connect-flash')   // 引用套件

const routes = require('./routes') // 引用路由器

const usePassport = require('./config/passport') // 載入設定檔，要寫在 express-session 以後

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
} //僅在非正式環境時, 使用 dotenv

require('./config/mongoose')

const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
app.use(bodyParser.urlencoded({ extended: true })) // 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(methodOverride('_method')) // 設定每一筆請求都會透過 methodOverride 進行前置處理
usePassport(app) // 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
app.use(flash())  // 掛載套件
app.use((req, res, next) => {
  // 你可以在這裡 console.log(req.user) 等資訊來觀察
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  next()
})
app.use(routes) // 將 request 導入路由器

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})