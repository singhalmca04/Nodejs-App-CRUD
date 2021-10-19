const express=require('express')
const app=express()
const path=require('path');
const url=require('url');
const port=process.env.PORT || 3000
const hbs=require("hbs");

require("./db/conn");
const Register=require("./models/registers");
const { response } = require('express');


const static_path=path.join(__dirname,"../public");
//console.log(path.join(__dirname,"../public"));
const temp_path=path.join(__dirname,"../templates/views");
const partials_path=path.join(__dirname,"../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",temp_path);
hbs.registerPartials(partials_path);
app.get('/',(req,res)=>{
    res.render("index");
    //res.send('welcome to MIET')
});

app.get('/register',(req,res)=>{
    res.render("registration");
    //res.send('welcome to MIET')
});

app.post('/register', async (req,res)=>{
    try{
        //console.log(req.body.uname);
        //res.send(req.body.uname);
        const registerStudent=new Register({
            uname:req.body.uname,
            age:req.body.age,
            email:req.body.email,
            phone:req.body.phone
        })
        const registered = await registerStudent.save();
        res.status(201).render("index");
    }
    catch(error){
        res.status(400).send(error);
    }
});

app.get('/login/:id', (req, res) => {
    Register.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.render('./index',{
                list:doc
            });
        }
        else { console.log('Error in employee delete :' + err); }
    });
});

app.get('/login', async (req,res)=>{
    try{
            Register.find({},(err,users)=>{
                if(err) console.warn(err);
                //console.warn(users);
                res.status(201).render('./login', {
                    list: users
                });
            }) 
        //res.status(201).render("index");
    }
    catch(error){
        res.status(400).send(error);
    }
});

app.get('/update', async (req,res)=>{
    try{
          var q = url.parse(req.url, true).query;
          var id=q.id;
          Register.find({_id:id},(err,users)=>{
             if(err) console.warn(err);
               //console.warn(users);
               res.status(201).render('./update', {
                  list: users
              });
            }) 
        //res.status(201).render("index");
    }
    catch(error){
        res.status(400).send(error);
    }
});

app.post('/updateval', async (req,res)=>{
    try{
        Register.findOneAndUpdate({ _id: req.body._id }, req.body, {upsert:true,new:true}, (err, users) => {
            if(err) console.warn(err);
            res.status(201).render('./index');            
            //console.warn(req.body._id); 
        });
    }
    catch(error){
        res.status(400).send(error);
    }
});
 
app.listen(port,()=>{
    console.log(`server running on ${port}`)

})