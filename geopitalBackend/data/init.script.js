const initService = require('../services/init.service');
const uploadService = require('../services/upload.service');


console.log('Starting init');
initService.connectToDatabase();
uploadService.storeJsonImport();
initService.terminateConnection();
