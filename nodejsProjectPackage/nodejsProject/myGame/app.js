const express = require('express');
const app = express();
const port = 3000;

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cmp5360"
});

//set up game
app.use(express.static('myGame'));

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("SELECT * FROM user", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});

app.get('/getScore/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = "SELECT score FROM user WHERE id = ?";
  
  con.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching score:", err);
      res.status(500).send("Error fetching score");
      return;
    }
    
    if (result.length > 0) {
      res.status(200).json({ score: result[0].score });
    } else {
      res.status(404).send("User not found");
    }
  });
});

// Update user score
app.post('/updateScore', (req, res) => {
  const { userId, score } = req.body;
  
  if (!userId || score === undefined) {
    res.status(400).send("Invalid request: userId and score are required");
    return;
  }

  const query = "UPDATE user SET score = ? WHERE id = ?";
  
  con.query(query, [score, userId], (err, result) => {
    if (err) {
      console.error("Error updating score:", err);
      res.status(500).send("Error updating score");
      return;
    }
    
    if (result.affectedRows > 0) {
      res.status(200).send("Score updated successfully!");
    } else {
      res.status(404).send("User not found");
    }
  });
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/some', (req, res) => {
    res.send('Change a word!')
  })

  app.get('/test', (req, res) => {
    res.send('This is test page')
  })

  //the 404 route
app.get('*', function(req, res){
  __dirname
  console.log(__dirname);
  res.status(404).sendFile(__dirname +'/404page.html');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})