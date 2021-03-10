require('dotenv').config();
const {
  leerInput,
  inquirerMenu,
  pause,
  listarLugares,
} = require('./helpers/inquirer.js');
const Busquedas = require('./models/busquedas');

const main = async () => {
  const busquedas = new Busquedas();
  let opt;

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case 1:
        const termino = await leerInput('Ciudad: ');
        const lugares = await busquedas.ciudad(termino);
        const id = await listarLugares(lugares);
        const lugarSel = lugares.find((l) => l.id === id);

        console.log('\n Información de la ciudad\n'.green);
        console.log('Ciudad: ', lugarSel.nombre);
        console.log('Lat: ', lugarSel.lat);
        console.log('Lng: ', lugarSel.lng);
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
