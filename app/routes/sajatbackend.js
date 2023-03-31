const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  
  var connection
  function kapcsolat(){
    var mysql = require('mysql')

    connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 's66_db'
    })
    
    connection.connect()
    
  }
  
  
  app.get('/film', (req, res) => {

    db_connect()
      connection.query('SELECT * from film', function (err, rows, fields) {
        if (err) throw err
      
        console.log(rows)
        res.send(rows)
      })
      
      connection.end()
   })

   
  
   app.get('/szereplok', (req, res) => {
    kapcsolat()
    connection.query('SELECT starwars.id, name, side, birth_year, birth_planet, death_year, death_planet, gender, height, mass, eye_color, hair_color, skin_color, homeworld, image, WikipediaLink, WookiepediaLink, KaminopediaLink, created, edited, COUNT(name) AS "velemenyek" from starwars LEFT JOIN sw_velemenyek ON starwars.id = sw_velemenyek.Character_id GROUP BY name ORDER BY starwars.id', (err, rows, fields) => {
      if (err) throw err
    
      res.send(rows)
      console.log("[Star Wars adatbázis - 2022.12.15.] \"szereplok\" végpont megnyitva.")
      console.log("[Star Wars adatbázis - 2022.12.15.] Szereplők lekérdezve.")
    })
    
    connection.end()
  })

  app.post('/felvitel', (req, res) => {
    kapcsolat()
    connection.query('insert into starwars values (null, '+req.body.bevitel1+', '+req.body.bevitel2+', '+req.body.bevitel3+', '+req.body.bevitel4+', '+req.body.bevitel5+', '+req.body.bevitel6+', '+req.body.bevitel7+', '+req.body.bevitel8+', '+req.body.bevitel9+', '+req.body.bevitel10+', '+req.body.bevitel11+', '+req.body.bevitel12+', '+req.body.bevitel13+', '+req.body.bevitel14+', '+req.body.bevitel15+', '+req.body.bevitel16+', '+req.body.bevitel17+', )', (err, rows, fields) => {
      if (err) console.log(err)
		else
		res.send("Sikerült a felvitel!")
    })/**/
    connection.end()
  })

  app.delete('/torles_szereplo', (req, res) => {
    const connection = mysql.createConnection({
      host: 'http://nodejs.dszcbaross.edu.hu:24008',
      user: 'u66_rm3DDq2u28',
      password: 'E!dUvUeQ53Tc+=.3LfO3Fbgr',
      database: 's66_db'
    })
    kapcsolat()
    connection.query('DELETE FROM starwars WHERE starwars.id = '+req.body.bevitel1, (err, rows, fields) => {
      if (err) console.log(err)
		else
		res.send("Sikerült a törlés! A megadott azonosítójú szereplő törölve lett.")
    })/**/
    connection.end()
  })

};
