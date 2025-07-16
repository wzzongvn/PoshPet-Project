/*
* 2.3. 파일 수정: server/index.js
* -----------------------------------------------------------------------
* 설명: 메인 서버 파일에 새로 만든 대시보드 라우트를 연결합니다.
*/
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

const corsOptions = {
  origin: 'https://poshpet-client.vercel.app',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB 데이터베이스에 성공적으로 연결되었습니다.'))
  .catch(err => console.error('MongoDB 연결 실패:', err));

app.get('/', (req, res) => {
  res.send('PoshPet 서버가 살아있어요!');
});

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/pets', require('./routes/petRoutes'));
app.use('/api/reservations', require('./routes/reservationRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));

// ★★★ 대시보드 API 라우트 연결 (추가) ★★★
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

// ★★★ 리뷰 API 라우트 연결 (추가) ★★★
app.use('/api/reviews', require('./routes/reviewRoutes'));

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});