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
        if (id === '0') continue;

        const lugarSel = lugares.find((l) => l.id === id);
        busquedas.agregarHistorial(lugarSel.nombre);
        const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);

        console.clear();
        console.log('\n Información de la ciudad\n'.green);
        console.log('Ciudad: ', lugarSel.nombre);
        console.log('Lat: ', lugarSel.lat);
        console.log('Lng: ', lugarSel.lng);
        console.log('Temperatura: ', clima.temp);
        console.log('Mínima: ', clima.min);
        console.log('Máxima: ', clima.max);
        console.log('Descripción: ', clima.desc);
        break;
      case 2:
        busquedas.historial.forEach((lugar, i) => {
          const idx = `${i + 1}.`.green;
          console.log(`${idx} ${lugar}`);
        });
        break;
      case 0:
        console.log('Salir');
        break;
    }
    await pause();
  } while (opt !== 0);
};

main();
