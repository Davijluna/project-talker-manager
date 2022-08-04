const fs = require('fs/promises');

async function getTalkerId(_request, response, next) {
    const TalkerId = JSON.parse(await fs.readFile('./talker.json', 'utf-8'));
    const { id } = _request.params;
    const IdTalker = TalkerId.find((person) => person.id === Number(id));
    if (!IdTalker) { 
        return response.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 
    }
response.status(200).json(IdTalker);

   next();
}

module.exports = { getTalkerId };