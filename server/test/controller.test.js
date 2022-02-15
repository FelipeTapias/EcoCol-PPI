require('mysql2/node_modules/iconv-lite').encodingExists('foo');
const request = require('supertest');
const faker = require('faker');
// const dateformat = require('dateformat');
const app = require('./../index');
const { cnn_mysql } = require('../database/dbMySQL');
// const { getMain, getAllPlaces, insertUser, deletePlace, getAllCities, 
//         updatePlace, singIn, insertPlaces, sendImg, testPrueba } = require('../routes/controller'); 

describe('Backend controller EcoCol Test suite (core module)', () => {

    beforeAll(done => {
        jest.useFakeTimers();
        jest.setTimeout(5000);
        done();
    })

    afterAll(done => {
        jest.setTimeout(5000);
        cnn_mysql.end();
        done();
    });

    it('Verificar creacion de lugares', async() => {
        const res = await request(app)
            .post('/api/insertPlaces')
            .send({"data":[
                {
                    "name": "TestOne",
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
            console.log(res);
            expect(res.statusCode).toEqual(200);
            // expect(res.body).toHaveProperty("id");
    });

    // it('', async() => {

    // });

    // it('should add the two numbers', () => {
    //     const data = testPrueba(10,10);
    //     expect(data).toBe(20);
    // });
    
});