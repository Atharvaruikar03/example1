import express from "express";
import mysql from "mysql2";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user:"root",
    password:"toor",
    database:"internship",
    host:"localhost"
});

app.post('/adduser' , (req,res) => {
    const names = req.body.name;
    const email = req.body.email;
    const pass = req.body.password;

    console.log(names);
    const q = `insert into info (fullname,email,pass) values("${names}","${email}","${pass}")`;
    
    db.query(q,(err,data) => {
        if(err){
            return res.json(err);
        }
        else{
            return res.json(data);
        }
    })
})

// app.post('/checkuser', (req,res) => {
//     const checkemail = req.body.email;
//     const checkpassword = req.body.password;

//     const q1 = `select * from info where email = "${checkemail}"`;



//     console.log(checkemail);

//     // db.query(q1,(err,data) => {
//     //     if(err){
//     //         return res.json(err)
//     //     }
//     //     else{
//     //         return res.json(data)
//     //     }
//     // });

//     db.query(q1,(err,data) => {
//         if(checkpassword == data[0].pass){
//             return 1; 
//         }
//         else {
//             return 0;
//         }

    
//     })
    
// });
app.post('/checkuser', (req, res) => {
    const checkemail = req.body.email;
    const checkpassword = req.body.password;

    const q1 = `SELECT * FROM info WHERE email = "${checkemail}"`;

    db.query(q1, [checkemail], (err, data) => {
        if (err) {
            return res.json({ message: 'Server error' });
        }

        if (data.length === 0) {
            return res.json({ message: 'Authentication failed' });
        }

        const storedPassword = data[0].pass;

        if (checkpassword === storedPassword) {
            return res.json({ message: 'Authentication successful' });
        } else {
            return res.json({ message: 'Authentication failed' });
        }
    });
});


app.listen(8081,() => {
    console.log("SERVER IS ON !!!");
});