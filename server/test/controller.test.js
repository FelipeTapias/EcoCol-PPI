require('mysql2/node_modules/iconv-lite').encodingExists('foo');
const { cnn_mysql } = require('../database/dbMySQL');
const { getMain, getAllPlaces, insertUser, deletePlace, getAllCities, 
        updatePlace, singIn, insertPlaces, sendImg, testPrueba } = require('../routes/controller'); 

describe('Backend controller EcoCol Test suite', () => {

    beforeAll(done => {
        jest.useFakeTimers();
        done();
    })

    afterAll(done => {
        cnn_mysql.end();
        done();
    });

    it('should add the two numbers', () => {
        const data = testPrueba(10,10);
        expect(data).toBe(20);
    });
    
});