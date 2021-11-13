const { cnn_mysql } = require('../database/dbMySQL')
var InsertQuery = require('mysql-insert-multiple');
const multer = require('multer');
const path = require('path');
const uuid = require('uuid/v4');


const errorServer = (err) => {
    console.log(err)
    return res.status(500).json('Internal Server Error')
}

//Establecer el lugar de almacenamiento para las imagenes de las tarjetas
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../client/public'),
    filename: (req, file, cb) => {
        cb(null, uuid() + file.originalname);
    }
})

//Carga de imagen
const uploadImg = multer({
    storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);
        var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error("Error: File upload only supports the following filetypes - " + filetypes));
    }
}).single('img');

module.exports = {
    getMain: (req, res) => {
        res
            .status(200)
            .send('<h1>Bienvenido al servidor de la aplicación EcoCol</h1>')
    },
    getAllPlaces: async (req, res) => {
        const response = await cnn_mysql.promise().execute('SELECT * FROM place')
        return res.json(response[0])
    },
    updatePlace: async (req, res) => {
        try {
            const {
                name,
                codeCity,
                description,
                recommendations,
                address,
                hours,
                entryPrice,
                fauna,
                flora,
                id
            } = req.body
            await cnn_mysql
                .promise()
                .execute(
                    `UPDATE place SET name=?, codeCity=?, description=?, recommendations=?, address=?, hours=?, entryPrice=?, fauna=?, flora=?  WHERE id=?`,
                    [
                        name,
                        codeCity,
                        description,
                        recommendations,
                        address,
                        hours,
                        entryPrice,
                        fauna,
                        flora,
                        id
                    ]
                )
            return res.status(200).json('Place update successfully')
        } catch (err) {
            errorServer(err, res)
        }
    },
    deletePlace: async (req, res) => {
        console.log(req.body)
        try {
            const response = await cnn_mysql
                .promise()
                .execute(`DELETE FROM place WHERE id = ${req.body.id}`)
            if (response[0].affectedRows === 1)
                return res.status(200).json('Place delete successfully')
            else return res.status(209).json('Unexpected event on server')
        } catch (err) {
            errorServer(err, res)
        }
    },
    getAllCities: async (req, res) => {
        const response = await cnn_mysql.promise().execute(`SELECT * FROM city`)
        return res.json(response[0])
    },
    insertUser: async (req, res) => {
        const { name, email, password, typeUser, birthDate } = req.body
        try {
            const response = await cnn_mysql.promise().execute(
                'INSERT INTO user(name, email, password, typeUser, birthDate) VALUES (?,?,?,?,?)',
                [name, email, password, typeUser, birthDate],
            )
            if (response[0].affectedRows === 1)
                return res.status(200).json('User created successfully')
            else return res.status(209).json('Unexpected event on server')
        } catch (err) {
            errorServer(err, res)
        }
    },
    singIn: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await cnn_mysql.promise().execute('SELECT * FROM user WHERE email = ?', [email]);
            const dataUser = user[0][0];
            if (user[0].length === 0) {
                return res.status(300).json('Bad email')
            } else if (dataUser.password === password) {
                return res.status(200).json({
                    id: dataUser.id,
                    name: dataUser.name,
                    typeUser: dataUser.typeUser
                })
            } else {
                return res.status(300).json('Bad password')
            }
        } catch (err) {
            errorServer(err, res);
        }
    },
    insertPlaces: async (req, res) => {
        try {
            const { data } = req.body;
            let query = InsertQuery({
                table: 'place',
                maxRow: data.length,
                data: data
            })
            query = query.next();
            const rows = await cnn_mysql.promise().execute(query);
            if (rows[0].affectedRows > 0) res.status(200).send('todo ok')
            else res.status(500).send('Se presentó un error inesperado')
        } catch (err) {
            errorServer(err, res);
        }
    },
    sendImg: async (req, res) => {
        console.log(req); 
        try {
            uploadImg(req, res, (err) => {
                if (err) {
                    return res.status(210).json({ status: 0, message: err });
                } else {
                    res.status(201).json({ status: 1, message: req.file });
                }
            })
        } catch (err) {
            console.log(err)
        }
    },
    getImages: async (req, res) => {
        const response = await cnn_mysql.promise().execute("SELECT * FROM photoPlace");
        return res.json(response[0]);
    }
}
