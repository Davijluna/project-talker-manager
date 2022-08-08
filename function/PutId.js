const fs = require('fs/promises');
// const getAllTalkers = require('./getAllTalkers.js');

function namePut(request, response, next) {
    try {
        const { name } = request.body;
        if (!name) {
            return response.status(400)
            .json({ message: 'O campo "name" é obrigatório' });
        }
        if (name.length < 3) {
            return response.status(400)
            .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
        }
        return next();
    } catch (erro) {
        return request.status(500).end();
    }
}

function agePut(request, response, next) {
try {
    const { age } = request.body;
    if (!age) {
        return response.status(400)
        .json({ message: 'O campo "age" é obrigatório' });
    }
    if (age < 18) {
        return response.status(400)
        .json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    return next();
    } catch (erro) {
        return request.status(500).end();
    }
}

function talPut(request, response, next) {
    try {
        const { talk } = request.body;
        if (!talk) {
            return response.status(400)
            .json({ message: 'O campo "talk" é obrigatório' });
        }
        return next();
    } catch (erro) {
        return request.status(500).end();
    }
}

function dateTalkPut(request, response, next) {
    try {
        const { talk } = request.body;
        const format = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/; 
        if (!talk.watchedAt) {
            return response.status(400)
            .json({ message: 'O campo "watchedAt" é obrigatório' });
        }
        if (!format.test(talk.watchedAt)) {
            return response.status(400)
            .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
        }
        return next();  
    } catch (erro) {
        return request.status(500).end();
    }
}

function talkRatePut(request, response, next) {
    const { talk } = request.body;
    if (!talk.rate && talk.rate !== 0) {
        return response.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }
    if (talk.rate > 5 || talk.rate < 1) {
        return response.status(400)
        .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
 next();
}

async function setUserPut(request, response) {
    const { id } = request.params;
    const { name, age, talk: { watchedAt, rate } } = request.body;
    const getTalker = JSON.parse(await fs.readFile('./talker.json', 'utf8'));
    const listTalker = getTalker.filter((talker) => talker.id !== Number(id));
    const newUse = {
        id: Number(id),
        name,
        age,
        talk: { watchedAt, rate },
    };
    listTalker.push(newUse);
    await fs.writeFile('./talker.json', JSON.stringify(listTalker));
    return response.status(200).json(newUse);
} 
module.exports = { namePut, agePut, talPut, dateTalkPut, talkRatePut, setUserPut };

// async function setUserPut(request, response) {
//         const { name, age, talk: { watchedAt, rate } } = request.body;
//         const getTalkers = getAllTalkers();
//         const { id } = request.params;
//         const filterTalke = getTalkers.filter((paletranteId) => paletranteId.id !== Number(id));
//         const newUser = {
//                 id: filterTalke,
//                 name,
//                 age,
//                 talk: { watchedAt, rate },
//             };
//             filterTalke.push(newUser);
//             await fs.writeFile('./talker.json', JSON.stringify(filterTalke));
//             return response.status(200).json(newUser);
//         } 