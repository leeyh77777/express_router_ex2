// 1.필요한 모듈 require
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');

// 라우터
const boardRouter = require("./routes/board")



// 2.listen - PORT 는 설정할수있도록(.env)
dotenv.config(); // .env -> process.env 하위 속성으로 추가

const app = express();
app.set('PORT', process.env.PORT || 3000);

// 4. 필요한 미들웨어 등록
app.use(morgan('dev')); // -morgan
app.use(express.static(path.join(__dirname, 'public'))); // -express.static
//---------   -body-parser   -----------()
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
// --------------------------------------


// 라우터
app.use("/board", boardRouter);


// 3.(없는페이지) + 오류처리
app.use((req, res, next) => {
    const err = new Error(`${req.url}은 없는 페이지입니다.`);
    err.status = 404;
    next(err);
})

// 3.없는페이지 + (오류처리)
app.use((err, req, res, next) => {
    return res.status(err.status || 500).send(err.message);
})

// 2.listen - PORT 는 설정할수있도록(.env)
app.listen(app.get('PORT'), () => {
    console.log(app.get('PORT'), "번 포트에서 서버 대기중..");
});