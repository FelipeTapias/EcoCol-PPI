require('mysql2/node_modules/iconv-lite').encodingExists('foo');
const request = require('supertest');
const faker = require('faker');
const app = require('./../index');
const { cnn_mysql } = require('../database/dbMySQL');

describe('Backend controller EcoCol Test suite (core module)', () => {

    beforeAll(done => { 
        done();
    });

    afterAll(done => {
        cnn_mysql.end();
        done();
    });

    it('Verificar creacion de lugares', async() => {
        const res = await request(app)
            .post('/api/insertPlaces')
            .send({"data":[
                {
                    "name": "TestTre",
                    "codeCity": 1,
                    "hashCodeQR": 20,
                    "codeLocation": "En el morro",
                    "description": "El cerro Pan de Azúcar es una formación rocosa ubicada en el centroriente de la ciudad Medellín, Antioquia, fue el punto clave para empezar la construcción de la Villa de la Candelaria de Medellín. Junto el Cerro El Picacho, Cerro El Salvador, Cerro El Volador, Cerro La Asomadera, Cerro Las Tres Cruces, Cerro Nutibara y el Cerro Santo Domingo, conforma el grupo de los llamados cerros tutelares de la ciudad de Medellín, una red de accidentes geográficos a lo largo del Valle del Aburrá que posee un importante valor histórico, arqueológico, ecológico y turístico.",
                    "recommendations": "JEJEJEJEJ",
                    "address": "Trece de Noviembre",
                    "hours": "Libre",
                    "entryPrice": "20000",
                    "fauna": "La Estación de cría y fauna autóctona Cerro Pan de Azúcar es un parque situado muy próximo a la ciudad balnearia de Piriápolis en el departamento de Maldonado, sudeste del Uruguay. Pertenece a la intendencia municipal de Maldonado. En una superficie de 86 hectáreas, alberga unos 250 ejemplares de 53 especies de la fauna uruguaya",
                    "flora": "1​ rodeados de árboles y arbustos nativos. Es visitado anualmente por unas 300 000 personas, muchas de ellas son delegaciones estudiantiles."
                }]});
            expect(res.res.statusCode).toEqual(200);
            expect(res.text).toEqual('todo ok');
    });

    it('Verificar actualización de un lugar', async() => {
        const res = await request(app)
            .put('/api/updatePlace')
            .send({
                "id": 116,
                "name": "Reserva Natural Chorro de Las Campanas, test",
                "codeCity": 1,
                "hashCodeQR": "ASFGTY",
                "codeLocation": "Se encuentra en la montaña",
                "description": "Allí comenzar  nuestro ascenso por un potrero que nos ofrecer  la vista del Valle de Aburr  entre. Proseguiremos en medio a bosques de pinos hasta llegar al borde de la Quebrada La Miel. Abandonaremos su cauce y comenzaremos un exigente ascenso entre pinos muy empinado (si tenemos suerte podremos observar alg£n Cacique Candela, ave end‚mica de estos bosques) y con ayuda de cuerdas llegaremos hasta un mirador, donde despu‚s de tomar un peque¤o descanso, reanudaremos nuestra aventura bajando entre rocas, ayudados de cuerdas.",
                "recommendations": "Realizar el recorrido con zapatos c¢modos, ropa ligera, llevar agua, gorra o sombrero. -Usar lentes oscuros, nuestro clima es tropical todo el año. -Ser amigable con el medio ambiente, proteger el patrimonio arquitect¢nico y cultural.",
                "address": "Envigado, Antioquia",
                "hours": "Abierto las 24 horas",
                "entryPrice": "Gratis",
                "fauna": "Tapir andino, oso perezoso, armadillo, mono titi",
                "flora": "Magnolias, palmas, helechos. "
            });
            expect(res.res.statusCode).toEqual(200);
            expect(res.text).toEqual('\"Place updated successfully\"');
    });

    it('Verificar eliminación de un lugar', async() => {
        const res = await request(app)
            .delete('/api/deletePlace')
            .send({"id": 126});
            expect(res.res.statusCode).toEqual(200);
            expect(res.text).toEqual('\"Place delete successfully\"');
    });

    it('Verificar eliminación de un lugar', async() => {
        const res = await request(app)
            .get('/api/getAllPlaces')
            .send();
            console.log(res.res.statusCode);
            expect(res.res.statusCode).toEqual(200);
    });
    
});