const express = require('express');
const bodyparser=require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.listen(cors);
app.use(bodyparser.json());



// database conection

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Root',
    database:'table_movies',
    port:3306
});

// check database connection

db.connect(err=>{
    if(err) {console.log(err,'dberr');}
    console.log('database connected ...');
})

// get data

app.get('/movie',(req, res)=>{
    
    let qr = 'select * from movie';

    db.query(qr,(err,result)=>{
        if (err) {
            console.log(err,'err');
        }

        if (result.length>0) {
            res.send(
                // {
                // message: 'all movie data',
                // data:
                result
            // }
            );

        }
    })
});


// get single movie 

app.get('/movie/:id',(req,res)=>{
    console.log(req.params.id)
    let gID= req.params.id;
    let qr= `select * 
             from movie 
             where mov_id = ${gID}`

    db.query(qr,(err,result)=>{
        if(err) {console.log(err);}

        if(result.length>0){
            res.send(
                // {
                // message:'get single data',
                // data:
                result
            // }
            );
        
        }else{
            res.send(
                {
                message:'get npt found'
            }
            )
        }
    })
})


// create data

app.post('/movie',(req,res)=>{
    
    console.log(req.body,'createdata')

    let id = req.body.mov_id;
    let title = req.body.mov_title;
    let year = req.body.mov_year;
    let time = req.body.mov_time;
    let lang = req.body.mov_lang;
    let dt_rel = req.body.mov_dt_rel;
    let rel_country = req.body.mov_rel_country;

    let qr =`insert into 
             movie(
                 mov_id,
                 mov_title,
                 mov_year,
                 mov_time,
                 mov_lang,
                 mov_dt_rel,
                 mov_rel_country
                 ) 
            values(
                '${id}',
                '${title}',
                '${year}',
                '${time}',
                '${lang}',
                '${dt_rel}',
                '${rel_country}'
                ) `;

    db.query(qr,(err,result)=>{
        if(err){console.log(err);}

       res.send({
           message:'data inserted'  
       });
    });

});

// update single data

app.put('/movie/:id',(req,res)=>{
    console.log(req.body,'updatedata')
     
    let gID = req.params.id;
    console.log(req.params.id)
    let id = req.body.mov_id;
    let title = req.body.mov_title;
    let year = req.body.mov_year;
    let time = req.body.mov_time;
    let lang = req.body.mov_lang;
    let dt_rel = req.body.mov_dt_rel;
    let rel_country = req.body.mov_rel_country;

  
    let qr = `update movie set 
                        mov_id = '${id}', 
                        mov_title = '${title}', 
                        mov_year = '${year}', 
                        mov_time = '${time}', 
                        mov_lang = '${lang}', 
                        mov_dt_rel = '${dt_rel}', 
                        mov_rel_country = '${rel_country}'
                        where mov_id = ${gID}`;
     
    db.query(qr,(err,result)=>{
        if (err) {console.log(err);}
        res.send({
            message:'data update'
        })
    })                    
     

})


// delete movie

app.delete('/movie/:id',(req,res)=>{

    let qID = req.params.id;
    
    let qr = `delete from movie where mov_id = ${qID}`
    db.query(qr,(err,result)=>{
        if (err) {console.log(err);}

        res.send({
            message:'data delete'
        });
    });
});

const port = (process.env.PORT || 3002)
app.set('port',port);

app.listen(app.get('port'),(error)=>{
        if(error) {
        console.error('Failed to start')
    }
    else {
        console.log('Server started on port: '+ app.get('port'))
    }
})