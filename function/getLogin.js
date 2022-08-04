// function getLogin(request, response) {
//     const { email, password } = request.body;
//     if (email && password) {
//         const token = cripton.randomBytes(8).toString('hex');
//         return response.status(200).json({ token });
//     }
// }

function isValidEmail(request, response, next) {
    const { email } = request.body;
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        return response.status(400).json({ message: 'O campo "email" é obrigatório' });
    } 
    if (!validEmail.test(email)) {
        return response.status(400)
        .json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    next();
}

function isValidPassword(request, response, next) {
    const { password } = request.body;
    if (!password) {
        return response.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
        return response.status(400)
        .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next();
}

module.exports = { isValidEmail, isValidPassword };