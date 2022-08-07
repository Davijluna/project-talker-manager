const express = require('express');
const bodyParser = require('body-parser');
const cripton = require('crypto');

const { getAllTalkers } = require('./function/getAllTalkers');
const { getTalkerId } = require('./function/getTalkerId');
const { isValidEmail, isValidPassword } = require('./function/getLogin');
const { 
  getPost,
  talkerName,
  talkerAge, 
  isTalk, 
  isRate, 
  setUser, 
  dateTalk,
} = require('./function/getPost');
// const { request } = require('http');

const { 
  namePut,
  PutId, 
  agePut, 
  talPut, 
  dateTalkPut, 
  talkRatePut, 
  setUserPut, 
} = require('./function/PutId');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', getAllTalkers);

app.get('/talker/:id', getTalkerId);

app.post('/login', isValidEmail, isValidPassword, (_request, response) => { 
  const token = cripton.randomBytes(8).toString('hex');
  response.status(200).json({ token });
});

app.post('/talker', getPost, talkerName, talkerAge, isTalk, dateTalk, isRate, setUser);

app.listen(PORT, () => {
  console.log('Online');
});

app.put('/talker/:id', PutId, namePut, agePut, talPut, dateTalkPut, talkRatePut, setUserPut);
