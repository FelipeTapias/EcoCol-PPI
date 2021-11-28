const { cnn_mysql } = require('../database/dbMySQL')
const insertQuery = require('mysql-insert-multiple')

const errorServer = (err, res) => {
  console.log(err)
  return res.status(500).json('Internal Server Error')
}

const insertPhotosPlaces = async photosPlace => {
  let query = insertQuery({
    table: 'photoPlace',
    maxRow: photosPlace.length,
    data: photosPlace
  })
  query = query.next()
  return await cnn_mysql.promise().execute(query)
}
module.exports = {
  getMain: (req, res) => {
    res
      .status(200)
      .send('<h1>Bienvenido al servidor de la aplicación EcoCol</h1>')
  },
  getAllPlaces: async (req, res) => {
    const resPlace = await cnn_mysql.promise().execute('SELECT * FROM place')
    const infoPlaces = resPlace[0]
    for (let i = 0; i < infoPlaces.length; i++) {
      const resPhotoPlace = await cnn_mysql
        .promise()
        .execute('SELECT * FROM photoPlace WHERE idPlace = ?', [
          infoPlaces[i].id
        ])
      if (resPhotoPlace) {
        const infoPhotoPlace = resPhotoPlace[0]
        const arrayPhotosPlace = []
        for (let j = 0; j < infoPhotoPlace.length; j++)
          arrayPhotosPlace.push(infoPhotoPlace[j])
        infoPlaces[i].photosPlace = arrayPhotosPlace
      }
    }
    return res.json(infoPlaces)
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
      const response = await cnn_mysql
        .promise()
        .execute(
          'INSERT INTO user(name, email, password, typeUser, birthDate) VALUES (?,?,?,?,?)',
          [name, email, password, typeUser, birthDate]
        )
      if (response[0].affectedRows === 1)
        return res.status(200).json('User created successfully')
      else return res.status(209).json('Unexpected event on server')
    } catch (err) {
      errorServer(err, res)
    }
  },
  singIn: async (req, res) => {
    const { email, password } = req.body
    try {
      const user = await cnn_mysql
        .promise()
        .execute('SELECT * FROM user WHERE email = ?', [email])
      const dataUser = user[0][0]
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
      errorServer(err, res)
    }
  },
  insertPlaces: async (req, res) => {
    try {
      const { data } = req.body
      for (let i = 0; i < data.length; i++) {
        const {
          name,
          codeCity,
          hashCodeQR,
          codeLocation,
          description,
          recommendations,
          address,
          hours,
          entryPrice,
          fauna,
          flora,
          photosPlace
        } = data[i]

        const rows = await cnn_mysql.promise().execute(
          `INSERT INTO place 
            (
              name, 
              codeCity, 
              hashCodeQR, 
              codeLocation, 
              description, 
              recommendations, 
              address, 
              hours, 
              entryPrice, 
              fauna, 
              flora
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            name,
            codeCity,
            hashCodeQR,
            codeLocation,
            description,
            recommendations,
            address,
            hours,
            entryPrice,
            fauna,
            flora
          ]
        )
        if (rows[0].affectedRows > 0) {
          if (photosPlace) {
            const photos = []
            for (let i = 0; i < photosPlace.length; i++) {
              photos.push({
                idPlace: rows[0].insertId, 
                photoPath: photosPlace[i]
              })
            }
            insertPhotosPlaces(photos)
          }
        } else return res.status(500).send('bad')
      }
      res.status(200).send('todo ok')
    } catch (err) {
      errorServer(err, res)
    }
  },
}
