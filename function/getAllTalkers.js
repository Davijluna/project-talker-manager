const fs = require('fs/promises');

async function getAllTalkers(_request, response) {
    const getTalkers = JSON.parse(await fs.readFile('./talker.json', 'utf8'));
    if (getTalkers.length === 0) return response.status(200).json([]);
    return response.status(200).json(getTalkers);
}

module.exports = { getAllTalkers };