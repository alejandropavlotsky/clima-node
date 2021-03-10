require('dotenv').config();
const { leerInput, inquirerMenu, pause } = require('./helpers/inquirer.js');
const Busquedas = require('./models/busquedas');

const main = async () => {
  const busquedas = new Busquedas();
  let opt;

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case 1:
        const lugar = await leerInput('Ciudad: ');
        await busquedas.ciudad(lugar);

        console.log('\n Información de la ciudad\n'.green);
        console.log('Ciudad:');
        console.log('Lat:');
        console.log('Lng:');
        console.log('Temperatura:');
        console.log('Mínima:');
        console.log('Máxima:');
        break;
      case 2:
        console.log('Historial');
        break;
      case 0:
        console.log('Salir');
        break;
    }
    await pause();
  } while (opt !== 0);
};

main();
