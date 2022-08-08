const express = require('express');
const bodyParser = require('body-parser');
const cripton = require('crypto');

const { getAllTalkers } = require('./function/getAllTalkers');
const { getTalkerId } = require('./function/getTalkerId');
const { isValidEmail, isValidPassword } = require('./function/getLogin');
const { 
  validateToken,
  talkerName,
  talkerAge, 
  isTalk, 
  isRate, 
  setUser, 
  dateTalk,
} = require('./function/getPost');

const { 
  namePut,
  agePut, 
  talPut, 
  dateTalkPut, 
  talkRatePut, 
  setUserPut, 
} = require('./function/PutId');

const { deletTalk } = require('./function/deletTalkId.js');

const { searchTalker } = require('./function/searchTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/search', validateToken, searchTalker);

app.get('/talker', getAllTalkers);

app.get('/talker/:id', getTalkerId);

app.post('/login', isValidEmail, isValidPassword, (_request, response) => { 
  const token = cripton.randomBytes(8).toString('hex');
  response.status(200).json({ token });
});

app.post('/talker', validateToken, talkerName, talkerAge, isTalk, dateTalk, isRate, setUser);

app.listen(PORT, () => {
  console.log('Online');
});

app.put(
  '/talker/:id',
  validateToken,
  namePut,
  agePut,
  talPut,
  dateTalkPut,
  talkRatePut,
  setUserPut,
);

app.delete('/talker/:id', validateToken, deletTalk);