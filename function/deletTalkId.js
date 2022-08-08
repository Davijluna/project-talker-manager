const fs = require('fs/promises');

async function deletTalk(request, response, _next) {
 const { id } = request.params;
 const getTalkers = JSON.parse(await fs.readFile('./talker.json', 'utf8'));
 const filterList = getTalkers.filter((talker) => talker.id !== Number(id));
 await fs.writeFile('./talker.json', JSON.stringify(filterList));
 return response.status(204).json();
}

module.exports = { deletTalk };