const rateLimit = require("express-rate-limit");

// Configura el middleware de límite de velocidad
const limiter1 = rateLimit({
    windowMs: 1 * 20 * 1000, // 1 minuto
    max: process.env.RT_LIMIT_STRICT,
    message: "Has excedido el límite de velocidad. Inténtalo de nuevo más tarde."
});

// Configura el middleware de límite de velocidad
const limiter10 = rateLimit({
    windowMs: 1 * 20 * 1000, // 1 minuto
    max: process.env.RT_LIMIT_LENIENT,
    message: "Has excedido el límite de velocidad. Inténtalo de nuevo más tarde."
});

module.exports = [limiter1, limiter10];