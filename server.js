const http = require('http');
const ExcelJS = require('exceljs');

const PORT = 3000;

const ventas = [
    { producto: 'Teclado mecanico', cantidad: 12, precio: 149.90 },
    { producto: 'Mouse inalambrico', cantidad: 25, precio: 79.50 },
    { producto: 'Monitor 24 pulgadas', cantidad: 8, precio: 899.00 },
    { producto: 'Laptop gamer', cantidad: 5, precio: 4599.00 },
    { producto: 'Audifonos bluetooth', cantidad: 30, precio: 129.90 },
    { producto: 'Webcam HD', cantidad: 15, precio: 189.00 },
    { producto: 'Disco SSD 500GB', cantidad: 20, precio: 259.90 },
    { producto: 'Memoria RAM 8GB', cantidad: 18, precio: 219.00 },
    { producto: 'Cable HDMI 2m', cantidad: 40, precio: 29.90 },
    { producto: 'Hub USB 4 puertos', cantidad: 22, precio: 59.90 },
    { producto: 'Silla ergonomica', cantidad: 6, precio: 749.00 },
    { producto: 'Escritorio de madera', cantidad: 4, precio: 599.00 },
    { producto: 'Impresora multifuncional', cantidad: 7, precio: 649.90 },
    { producto: 'Router WiFi 6', cantidad: 10, precio: 329.00 },
    { producto: 'Microfono de escritorio', cantidad: 9, precio: 199.90 },
    { producto: 'Parlantes 2.1', cantidad: 11, precio: 249.00 },
    { producto: 'Tablet 10 pulgadas', cantidad: 6, precio: 1099.00 },
    { producto: 'Cargador tipo C', cantidad: 35, precio: 49.90 },
    { producto: 'Mochila para laptop', cantidad: 16, precio: 139.00 },
    { producto: 'Estabilizador de voltaje', cantidad: 13, precio: 179.90 }
];

async function generarExcel() {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Junior Cueva';
    workbook.created = new Date();

    const hoja = workbook.addWorksheet('Ventas');

    hoja.columns = [
        { header: 'Producto', key: 'producto', width: 30 },
        { header: 'Cantidad', key: 'cantidad', width: 12 },
        { header: 'Precio', key: 'precio', width: 12 }
    ];

    hoja.getRow(1).font = { bold: true };

    ventas.forEach(v => hoja.addRow(v));

    hoja.getColumn('precio').numFmt = '0.00';

    return workbook;
}

const server = http.createServer(async (req, res) => {
    if (req.url === '/reporte') {
        try {
            const workbook = await generarExcel();

            res.writeHead(200, {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': 'attachment; filename="reporte_ventas.xlsx"'
            });

            await workbook.xlsx.write(res);
            res.end();

            console.log('Reporte enviado correctamente');
        } catch (error) {
            console.error('Error al generar el Excel:', error);
            if (!res.headersSent) {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('Error al generar el archivo Excel');
            } else {
                res.end();
            }
        }
    } else {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Visita /reporte para descargar el Excel');
    }
});

server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// para descargar el exel xd 
// http://localhost:3000/reporte