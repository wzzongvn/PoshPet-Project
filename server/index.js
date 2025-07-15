/*
* =======================================================================
* 파일: server/index.js (최종본)
* =======================================================================
* 설명: 서버의 시작점입니다. 모든 API 주소(라우트)를 등록하고,
* CORS 정책을 설정하며, 데이터베이스에 연결합니다.
*/
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

// CORS 설정: Vercel 프론트엔드에서의 요청을 허용합니다.
const corsOptions = {
  origin: 'https://poshpet-client.vercel.app',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());

// DB 연결
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB 데이터베이스에 성공적으로 연결되었습니다.'))
  .catch(err => console.error('MongoDB 연결 실패:', err));

// 기본 테스트 라우트
app.get('/', (req, res) => {
  res.send('PoshPet 서버가 살아있어요!');
});

// API 라우트 연결
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/pets', require('./routes/petRoutes'));
app.use('/api/reservations', require('./routes/reservationRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});