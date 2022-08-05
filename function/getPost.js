const fs = require('fs/promises');

function getPost(request, response, next) {
    try {
        const { authorization } = request.headers;
        if (!authorization) {
            return response.status(401).json({ message: 'Token não encontrado' });
        }
        if (authorization.length !== 16) {
            return response.status(401).json({ message: 'Token inválido' });
        }
        return next();
    } catch (erro) {
        return request.status(500).end();
    }
}

function talkerName(request, response, next) {
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

function talkerAge(request, response, next) {
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

// validação de data tirada desta URL:
// https://www.guj.com.br/t/resolvido-como-validar-data-com-java-script/276656
function isTalk(request, response, next) {
    try {
        const { talk } = request.body;
        if (!talk) {
            return response.status(400).json({ message: 'O campo "talk" é obrigatório' });
        }
        return next();  
    } catch (erro) {
        return request.status(500).end();
    }
}
// const number = Number(rate) >= 1 && Number(rate) <= 5;

function dateTalk(request, response, next) {
    const { talk } = request.body;
    try {
        const format = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
        if (!talk.watchedAt) {
            return response.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
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

function isRate(request, response, next) {
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

 async function setUser(request, response) {
    const { name, age, talk: { watchedAt, rate } } = request.body;
    const getTalkers = JSON.parse(await fs.readFile('./talker.json', 'utf8'));
    const newUser = {
        id: getTalkers.length + 1,
        name,
        age,
        talk: { watchedAt, rate },
    };
    getTalkers.push(newUser);
    await fs.writeFile('./talker.json', JSON.stringify(getTalkers));
    return response.status(201).json(newUser);
} 

module.exports = { getPost, talkerName, talkerAge, isTalk, isRate, setUser, dateTalk };