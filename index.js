const express = require('express')
const app = express()
const port = 3000
//Database of users
let dbUsers = [
  {
      username : "bob",
      password : "ILikeToFixIt",
      name : "BobTheBuilder",
      email : "bob@fixit.com"
  },
  {
      username : "kermit",
      password : "MissPiggie12",
      name : "KermitTheFrog",
      email : "Kermit@muppet.com"
  },
  {
      username : "red",
      password : "123456",
      name : "Elmo",
      email : "elmo@sesame.com"
  }
]

app.use(express.json());

app.get('/hello', (req, res) => {
    res.send('Hello World!')
  })

app.post('/login', (req, res) => {
    let data = req.body
    // res.send(' Post request '+ JSON.stringify(data));
    //res.send(' Post request '+ data.name +data.password)
    res.send(login(data.username,data.password));
  });

app.post('/register',(req, res)=>{
  let data = req.body
  res.send(
    register(
      data.username,
      data.password,
      data.name,
      data.email
    )
  )
})

function login(loginuser, loginpassword) {
  console.log("Alert! Alert! Someone is logging in!", loginuser, loginpassword) //Display message to ensure function is called
  //Verify username is in the database
  const user = dbUsers.find (user =>user.username == loginuser && user.password == loginpassword);
    if (user){
      return(user);
    }else {
      return({error: "User not found"});
    }
    }

function register(newusername, newpassword, newname, newemail) {
  //verify if username is already in databse
  let match = dbUsers.find(element => 
    element.username == newusername
      )
    if (match) {
      return ( "Error! username is already taken :D")
    } else {
      // add info into database
      dbUsers.push({
      username : newusername,
      password : newpassword,
      name : newname,
      email : newemail
      })
          return ( "Registration successful! :D" )
      }  
  }

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



