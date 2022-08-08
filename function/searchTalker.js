const fs = require('fs/promises');

async function searchTalker(request, response, _next) {
    const { q } = request.query;
    const getTalkers = JSON.parse(await fs.readFile('./talker.json', 'utf8'));
    if (!q || q === '') {
        return response.status(200).json(getTalkers);
    }
    const filterList = getTalkers.filter((talker) => talker.name.includes(q));
    if (!filterList) {
        return response.status(200).json([]);
    }
    return response.status(200).json(filterList);
}

module.exports = { searchTalker };