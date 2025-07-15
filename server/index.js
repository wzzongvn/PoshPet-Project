// 파일: server/index.js (최종 수정)
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000; // Render는 10000번 포트를 사용합니다.

// ★★★ 문제 해결: Vercel에서 오는 요청을 명시적으로 허용하도록 CORS 설정을 수정합니다. ★★★
const corsOptions = {
  origin: 'https://poshpet-client.vercel.app', // Vercel 주소를 명시적으로 허용
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
// ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★

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
