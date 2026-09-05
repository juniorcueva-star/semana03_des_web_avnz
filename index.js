const fs = require('fs');
const readable = fs.createReadStream('datos.txt', { encoding: 'utf8' });
//readable.on('data', chunk => console.log('Fragmento recibido:', chunk));
//readable.on('end', () => console.log('Lectura completa'));
//readable.on('error', err => console.error('Error:', err));


const writable = fs.createWriteStream('salida.txt');
//writable.write('Este es un mensaje de prueba.\n');
//writable.end('Fin del mensaje.');
//writable.on('finish', () => console.log('Escritura completada.'));

//const zlib = require('zlib');
//const readStream = fs.createReadStream('entrada.txt');
//const writeStream = fs.createWriteStream('entrada.txt.gz');
//const gzip = zlib.createGzip();
//readStream.pipe(gzip).pipe(writeStream);


readable.on('data', chunk => {
    if (!writable.write(chunk)){
        readable.pause();
        console.log('pausado');
    }
});
writable.on('drain', () => {
    readable.resume();
    console.log('reanudando');
});


// TAREA 1

const { Transform } = require('stream');

const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        callback(null, chunk.toString().toUpperCase());
    }
});

const readStreamTexto = fs.createReadStream('texto.txt');
const writeStreamTexto = fs.createWriteStream('texto_mayusculas.txt');

readStreamTexto.pipe(transformStream).pipe(writeStreamTexto);

writeStreamTexto.on('finish', () => console.log('Transformacion completada'));
readStreamTexto.on('error', err => console.error('Error de lectura:', err));


