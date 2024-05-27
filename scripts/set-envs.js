
const { writeFileAsync, mkdirSync, writeFileSync } = require('fs');

require('dotenv').config();

const targetPath = './src/environments/environment.ts';

const envFileContent = `
export const environment = {
    mapbox_key: "${process.env['MAPBOX_KEY']}",
    otras_propiedades: "aqui puede agregar mas de una variable"
};
`;

mkdirSync('./src/environments', {recursive: true});
writeFileSync(targetPath, envFileContent);