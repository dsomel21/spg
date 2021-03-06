const express = require('express');
const router = express.Router();

const { booksIndex, bookChapters } = require('../controllers/books.controller');

const {
  chaptersIndex,
  createChapter,
  chapterFind,
  chapterChhands,
  chapterTuks,
  lastPauri,
  validateChapter,
  editChapter,
  updateChapterArtwork,
} = require('../controllers/chapters.controller');

const {
  chhandTypeIndex,
  createChhandType,
  validateChhandType,
} = require('../controllers/chhandTypes.controller');

const {
  chhandIndex,
  createChhand,
  chhandScreen,
  validateChhand,
} = require('../controllers/chhands.controller');

const {
  pauriIndex,
  showFullPauri,
  createPauri,
  editPauri,
  validatePauri,
} = require('../controllers/pauris.controller');

const {
  createKatha,
  editKatha,
  getChapterKatha,
  createChapterKatha,
  validateKatha,
} = require('../controllers/kathas.controller');

const { deleteTuk, validateTuk } = require('../controllers/tuks.controller');

const { last, chamkaur } = require('../controllers/application.controller');

// books
router.get('/books', booksIndex);
router.get('/books/:id/chapters', bookChapters);

// chapters
router.get('/chapters', chaptersIndex);
router.post('/chapters', validateChapter('createChapter'), createChapter);
router.get('/chapters/:id', chapterFind);
router.get('/chapters/:id/chhands', chapterChhands);
router.get('/chapters/:id/tuks', chapterTuks);
router.get('/chapters/:id/last-pauri', lastPauri);
router.put('/chapters/:id/edit', validateChapter('editChapter'), editChapter);
router.put('/chapters/:id/artworks', updateChapterArtwork);

// chhand_types
router.get('/chhand-types', chhandTypeIndex);
router.post(
  '/chhand-types',
  validateChhandType('createChhandType'),
  createChhandType
);

// chhands
router.get('/chhands', chhandIndex);
router.post('/chhands', validateChhand('createChhand'), createChhand);
router.get('/chhands-screen', chhandScreen);

// pauris
router.get('/pauris', pauriIndex);
router.get('/pauris/:id/full', showFullPauri);
router.post('/pauris', validatePauri('createPauri'), createPauri);
router.post('/pauris/:id', validatePauri('editPauri'), editPauri);

// tuks
router.delete('/tuks/:id', validateTuk('deleteTuk'), deleteTuk);

// kathas
router.post('/kathas', validateKatha('createKatha'), createKatha);
router.put('/kathas/:id', editKatha);
router.get('/chapters/:id/kathas', getChapterKatha);
router.post(
  '/chapters/:id/kathas',
  validateKatha('createChapterKatha'),
  createChapterKatha
);

const gianis = require('../../db/giani');
router.get('/gianis', (req, res) => {
  res.json(gianis);
});

// APPLICATIONS
router.get('/last', last);
router.get('/chamkaur', chamkaur);

module.exports = router;
