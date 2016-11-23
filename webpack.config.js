switch (process.env.NODE_ENV) {
    case 'prod':
    case 'production':
        module.exports = require('./config/webpack.production.config');
        break;

    case 'dev':
    case 'development':
    default:
        module.exports = require('./config/webpack.dev.config');
}