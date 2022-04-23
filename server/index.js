const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employeeSystem'
});

app.get('/employees' , (req , res) => {
    db.query("SELECT * FROM employees" , (err , result) => {
        if(err){
            throw err;
        }else{
            res.send(result);
        }
    });
});

app.post('/create' , (req , res) => {
    const {name , age , country , position , wage} = req.body;
    db.query("INSERT INTO employees (name , age , country , position , wage) VALUES(? , ? , ? , ? , ?)" , [name , age , country , position , wage] , (err , result) => {
        if(err){
            throw err;
        }else{
            res.send('Values inseryted');
        }
    });
});

app.put('/update' , (req , res) => {
    const {id , wage} = req.body;
    db.query("UPDATE employees SET wage = ? WHERE id = ?" , [wage , id] , (err , result) => {
        if(err){
            throw err;
        }else{
            res.send(result);
        }
    });
});

app.delete('/delete/:id' , (req , res) => {
    const id = req.params.id;
    db.query("DELETE FROM employees WHERE id = ?" , id , (err , result) => {
        if(err){
            throw err;
        }else{
            res.send(result);
        }
    });
});

app.listen(3000 , () => {
    console.log('Server Start...');
});