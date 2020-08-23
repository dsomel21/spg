const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

// CORS
// var whitelist = ['http://localhost:8080', 'http://localhost:3000'];
// var corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.includes(origin)) {
//       callback(null, true);
//     } else {
//       console.log(origin);
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// };

const app = express();

// Middleware
app.use(morgan('tiny'));
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to SPG 📖',
  });
});

// app.use('/api/v1', api);

// app.use(middlewares.notFound);
// app.use(middlewares.errorHandler);

app.get('/chapters', async (req, res) => {
  const chapters = await db.select('*').from('chapters');
  res.json({ chapters });
});

// Doing query params might get messy
app.get('/chapters/:id', async (req, res) => {
  const id = req.params.id;
  const chapter = await db.select('*').from('chapters').where('id', id).first();
  res.json({ chapter });
});

app.get('/chapters/:id/chhands', async (req, res) => {
  const chapterId = req.params.id;
  const chhands = await db
    .select('*')
    .from('chhands')
    .where('chapter_id', chapterId);
  res.json({ chhands });
});

// NOTE: This will never be public facing...
app.get('/chapters/:id/tuks', async (req, res) => {
  const chapterId = req.params.id;
  const chapter = await db
    .select('*')
    .from('chapters')
    .where('id', chapterId)
    .first();

  let chhands = await db
    .select('*')
    .from('chhands')
    .where('chapter_id', chapterId);

  for (let chhand of chhands) {
    let pauris =
      (await db.select('*').from('pauris').where('chhand_id', chhand.id)) || [];
    for (let pauri of pauris) {
      let tuks =
        (await db.select('*').from('tuks').where('pauri_id', pauri.id)) || [];
      pauri.tuks = tuks;
    }
    chhand.pauris = pauris;
  }

  res.json({ chapter, chhands });
});

app.get('/chhands', async (req, res) => {
  const chhands = await db.select('*').from('chhands');
  res.json({ chhands });
});

app.get('/chhand_types', async (req, res) => {
  const chhandTypes = await db.select('*').from('chhand_types');
  res.json({ chhandTypes });
});

app.post('/chhand_types', async (req, res) => {
  const { chhand_name_unicode, chhand_name_english, chhand_name_gs } = req.body;
  if (isNewChhandType(chhand_name_english) === true) {
    const chhandTypes = await db.select('*').from('chhand_types');
    res.json({ chhandTypes });
  } else {
    res.json({
      message: 'This already an existing chhang_type in the database.',
    });
  }
});
