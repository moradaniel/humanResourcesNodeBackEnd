switch (process.env.NODE_ENV) {
    case 'development':
        module.exports = require('./development');
        break;
    case 'unit_testing':
        module.exports = require('./unit_testing');
        break;
    case 'integration_testing':
        module.exports = require('./integration_testing');
        break;
    case 'staging':
        module.exports = require('./staging');
        break;
    case 'production':
        module.exports = require('./production');
        break;
    default:
        console.error("Unrecognized NODE_ENV: " + process.env.NODE_ENV);
        process.exit(1);
}
