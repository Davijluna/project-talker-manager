const cripton = require('crypto');

function getLogin(request, response) {
    const { email, password } = request.body;
    if (email && password) {
        const token = cripton.randomBytes(8).toString('hex');
        return response.status(200).json({ token });
    }
}

// function isValidEmail(request, response, _next) {
//     const { email } = request.body;
//     const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!email) return response.status(400).json({ message: 'O campo "email" é obrigatório' });
// }

// function isValidPassword(request, response, next) {
//     const { password } = request.body;
// }

module.exports = { getLogin };