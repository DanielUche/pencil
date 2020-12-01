const fs = require('fs');
const { writeFile } = fs;
// Configure Angular `environment.ts` file path
let targetPath = './src/environments/environment.ts'

// Load node modules
const colors = require('colors');
require('dotenv').config({path: './.env'});
// `environment.ts` file structure
const envConfigFile = `export const environment = {
    production: '${process.env.NODE_ENV}',
    firebaseConfig: {
        apiKey: '${process.env.FIRESTORE_APIKEY}',
        authDomain: '${process.env.FIRESTORE_AUTH_DOMAIN}',
        databaseURL: '${process.env.FIRESTORE_DB_URL}',
        projectId: '${process.env.FIRESTORE_PROJECT_ID}',
        storageBucket: '${process.env.FIRESTORE_STORAGE_BUCKET}',
        messagingSenderId: '${process.env.FIRESTORE_MESSAAGING_SENDER_ID}',
        appId: '${process.env.FIRESTORE_APP_ID}',
        measurementId: '${process.env.FIRESTORE_MEASUREMENT_ID}'
    }
};
`;
console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));
console.log(colors.grey(envConfigFile));
writeFile(targetPath, envConfigFile, function (err) {
   if (err) {
       throw console.error(err);
   } else {
       console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
   }
})