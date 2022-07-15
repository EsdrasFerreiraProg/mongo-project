const mongo = require('./mongo');
const express = require('express');
const app = express();
const PORT = 5000;
const routes = require('./routes');
const userSchema = require('./schema');
const bodyParser = require("body-parser");
const session = require('express-session');
const { find } = require('./schema');


app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({secret: 'marmelada',saveUninitialized: true,resave: true}));

const newItem = async (date, body)=>{

    await mongo().then(async (mongoose)=>{
        try{
            console.log("connected new item");
            await new userSchema({
                date: date,
                body: body,
            }).save();
            
        }finally{
           
        }
    })
}

const listItems = async()=>{
    let dates = [];

    await mongo().then(async (mongoose)=>{
        try{
            console.log("connected list items");
            const result = await userSchema.find({});

            result.forEach(function (diary){
                dates.push(diary.date);
            });
        
        }finally{
            
        }
    })
    
    return dates;
}

const findRegister = async(date)=>{

    let register;

    await mongo().then(async (mongoose)=>{
        try{
            console.log("connected");
            const result = await userSchema.findOne({
                date: date
            });

        register = result; 

        }finally{
            
        }
    })
    
    return register;
}

app.post("/enviar-diario", (req,res)=>{
    console.log(req.body);

    newItem(req.body.date, req.body.body);
    res.send('res.send(<script>alert("Registro feito no diário!"); window.location.href = "/diario"; </script>);')
});

app.get("/meus-registros", (req,res)=>{
    
    res.sendFile(__dirname + "/html/listar-diario.html");
});

app.get("/datas", async (req, res)=>{

    var dates = listItems();
    result = dates.then(data=>{
        res.json(data);
      }).catch(err=>{
        console.log(err);
      })
});

var date = "";


app.get('/registros', (req, res)=>{
    
    const register = findRegister(date);

    result = register.then(data=>{
        res.json(data);
      }).catch(err=>{
        console.log(err);
      })

});


app.post("/meus-registros", async (req, res)=>{
    
    date = req.body.data;
    
    res.redirect('/meus-registros');

});

app.use(routes);

app.listen(PORT, (err)=>{

    console.log(`Running on PORT ${PORT}`);
});