var express=require("express");
var app=express();
var nodemailer = require('nodemailer');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var faker = require('faker');


var morgan = require('morgan');
var bcrypt = require('bcrypt-nodejs');
var bodyParser = require('body-parser');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var busboy = require("then-busboy");
var	fileUpload = require('express-fileupload');
var mysql=require("mysql");
var Gallery = require('express-photo-gallery');
 
var options = {
  title: 'IST Photo Gallery'
};
 
   app.use('/photos', Gallery('path_to_photos', options));
     app.use('/ICIITPhotoGallery', Gallery('ICIITGallery', options));
	
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'my_schema'
});

connection.connect();
 
global.db = connection;


var passport = require('passport');
var flash    = require('connect-flash');


app.use(require("express-jquery")('/file.js'));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.set('views', __dirname + '/views');
app.use(fileUpload());

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

// required for passport
app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


// configuration ===============================================================
// connect to our database




app.get("/",function(req,res){
    res.render("index",{ message: req.flash('loginMessage') });
});

app.get("/contact",function(req,res){
    res.render("contact");
});

app.get("/HODdesk",function(req,res){
    
    var q= "select * from people where designation='Head of the department'";
 
 connection.query(q,function(err, results) {
     if(err) throw err;
     res.render("HODdesk",{data:results});
 });
});

app.get("/people",function(req,res){
    res.render("people");
});


app.get("/students",function(req,res){
    res.render("students");
});

app.get("/nonteaching",function(req,res){
    res.render("nonteaching");
});

app.get("/teaching",function(req,res){
    var query="select * from people";
    connection.query(query,function(err,results){
        //console.log(results);
        res.render("teaching",{data: results});
    });
    
});

app.get("/staffs_pro/:id",function(req, res) {
    var id=req.params.id;
  
 var q= "select * from people where id='"+id+"'";
 
 connection.query(q,function(err, results) {
     if(err) throw err;
    
     //console.log(results);
    var result=results;
    var s_id=result[0].sid;
    var q1= "select * from p_edu where s_id='"+s_id+"'";
    var q2= "select * from p_project where s_id='"+s_id+"'";
    connection.query(q1,function(err, results) {
      if (err) throw err;
       var results=results;
      connection.query(q2,function(err, resu) {
      if (err) throw err;
     
      res.render("staffs_pro",{data:result,data2:results,data3:resu});  
    });
     
    });
     
     
     
 })
});


app.get("/edit/:id",function(req, res) {
    var id=req.params.id;
    var q= "select * from people where id='"+id+"'";
    connection.query(q,function(err, results) {
     if(err) throw err;
      var result=results;
    var s_id=result[0].sid;
    var q1= "select * from p_edu where s_id='"+s_id+"'";
    var q2= "select * from p_project where s_id='"+s_id+"'";
    connection.query(q1,function(err, results) {
      if (err) throw err;
       var results=results;
      connection.query(q2,function(err, resu) {
      if (err) throw err;
     
      res.render("edit",{data:result,data2:results,data3:resu});  
    });
     
    });

    })
});

app.post("/edit/:id", function(req, res) {
    //console.log(req.params.id);
   // console.log(req.body);
   var id=req.params.id;
   var name=req.body.name;
   var mno=req.body.mno;
   var exp=req.body.exp;
   var email=req.body.email;
   var aoe=req.body.aoe;
   var pub=req.body.pub;
   var q="update people set name=?,mobile_no=?, experience=?, email=?, area_of_exper=?,publications=? where id='"+id+"' ";
   connection.query(q,[name,mno,exp,email,aoe,pub],function(err,result){
     if(err) throw err;
     console.log("updated successfully..!!");
     res.redirect("/profile1");
   });
})


app.get("/editedu/:id",function(req, res) {
    var id=req.params.id;
    var q= "select * from people where id='"+id+"'";
    connection.query(q,function(err, results) {
     if(err) throw err;
      var result=results;
    var s_id=result[0].sid;
    var q1= "select * from p_edu where s_id='"+s_id+"'";
    
    connection.query(q1,function(err, results) {
      if (err) throw err;
       var results=results;
    
     
      res.render("editedu",{data2:results});  
    
    });

    })
});


app.get("/editedu1/:id",function(req, res) {
    var id=req.params.id;
    var q= "select * from p_edu where id='"+id+"' ";
    connection.query(q,function(err, results) {
        if(err) throw err;
        res.render("ededu",{data:results});
    })
    
})   

app.post("/ededu/:id",function(req, res) {
    var deg= req.body.deg;
    var s=req.body.spec;
    var univ=req.body.univ;
    var g= req.body.grad;
    var id=req.params.id;
    var q= "update p_edu set degree='"+deg+"',spec='"+s+"',univ='"+univ+"',graduated_in='"+g+"' where id='"+id+"'";
    connection.query(q,function(err, results) {
        if(err) throw err;
       res.redirect("/profile1");
    })
})
            

app.get("/changePass/:id",function(req, res) {
    req.flash("msg",""); 
    res.render("changePass",{id:req.params.id,data:req.flash("msg")});
})
app.post("/changePass",function(req,res){
    
    var opass=req.body.opassword;
    var npass=req.body.npassword;
    var cpass=req.body.cpassword;
    var id=req.body.id;
    console.log(id);
    var q="select password from people where id=?";
    connection.query(q,id,function(err, result) {
        if(err) throw err;
       if( !bcrypt.compareSync(opass, result[0].password))
       {
            req.flash("msg","retry with  the correct old password");     
            res.render("changePass",{id:id,data:req.flash("msg")});
       }
         //console.log("pass does not match");
       else if(!(npass==cpass))
             {
            req.flash("msg","password not confirmed..!!");     
            res.render("changePass",{data:req.flash("msg"),id:id});
       }
        else
        {
             var newpass=bcrypt.hashSync(cpass, null, null);
             req.flash("msg","Password changed..!!");     
            res.render("changePass",{id:id ,data:req.flash("msg")});
            var q="update people set password='"+newpass+"' where id='"+id+"'";
            connection.query(q,function(err, results) {
                if(err) throw err;
                console.log("Password changed");
            });
        }

        
    })
     
    
    
})
app.get('/signup', routes.index);//call for main index page
app.post('/signup', routes.index);//call for signup post 
//app.get('/profile/:id',routes.profile);//to render users profile
//Middleware
    
    
 var ran_text=faker.internet.password();
app.get("/forgot",function(req,res){
    
    res.render("forgot",{data:req.flash("msg")});
});
app.post("/forgot",function(req, res) {
    var email=req.body.email;
    var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sravi@auist.net',
    pass: 'mselvaraj'
  }
});
    var c=0;
    console.log(email);
    var q="select email from people";
    connection.query(q,function(err, results) {
        
        for(var i=0;i<results.length;i++){
            if(results[i].email==email){
                c=1;
                
                var mailOptions = {
                               from: 'IST!!',
                               to:email,
                               subject: 'hi',
                               text:"DIST  : Reset Your password using this One Time Password :  " +ran_text 
                                   };
                console.log("email matched!!");
                transporter.sendMail(mailOptions, function(error, info){
                           if (error) {
                             console.log(error);
                                   } else {
                            res.render("forgot1",{email:email});
                                         }
                                     });
            }
        }
       
       if(c===0)         
        {
             req.flash("msg","No user found"); 
             res.render("forgot",{data: req.flash("msg")});
             
        }
            
    
    })
})



app.post("/forgot1",function(req,res){
    
    var ot=req.body.ot;
    
    var email=req.body.email;
    var p=req.body.password;
    var e=bcrypt.hashSync(p, null, null);

            if(ot==ran_text){
                  var q= "UPDATE people SET password = '" + e + "' where email= '" + email + "' ";
                  connection.query(q,function(err, results) {
                      if(err) 
                         {
                         req.flash("msg","Failed to update");     
                          res.render("forgot1",{data:req.flash("msg")});
                         }
                      else
                          {
                            
                          req.flash("msg","your password has been changed");     
                          res.render("forgot",{data: req.flash("msg")});
                          }
                  });
            
            } else{
                req.flash("msg","Entered otp is not valid..!!");     
                res.render("forgot",{data: req.flash("msg")});
            }
         
        
});

app.get("/courses/:id",function(req, res) {
    var id=req.params.id;
   
   res.render("courses",{mes:id});    
})

app.get("/reg",function(req, res) {
    
    res.sendFile(__dirname + '/file-folder/R-2013.pdf');

})
app.get("/intercom",function(req, res) {
    
    res.sendFile(__dirname + '/file-folder/intercom.docx');

})
var signup_msg="";
app.get("/signup2",function(req,res){
    res.render("signup2",{data:signup_msg});
});
app.post("/signup2",function(req, res) {
  var sid=req.body.sid;
  var deg=req.body.deg;
  var univ=req.body.univ;
  var grad=req.body.grad;
  var spec=req.body.spec;
  var q="INSERT INTO `p_edu`(`s_id`,`degree`,`spec`,`univ`,`graduated_in`) VALUES ('" + sid + "','" + deg + "','" + spec + "','" + univ + "','" + grad + "')";
      connection.query(q,function(err, results) {
          if (err)  {
              signup_msg="try again";
              res.render("signup2",{data:signup_msg});
          }
          else{
              signup_msg="sucesss";
              res.render("signup2",{data:signup_msg});
          }
          
          //console.log("successfully inserted");
          
      })
})

app.get("/signup3",function(req,res){
    res.render("signup3",{data:signup_msg});
});
app.post("/signup3",function(req, res) {
  var sid=req.body.sid;
  var p_tit=req.body.ptit;
  var advisees=req.body.adv;
  var lab=req.body.lab;
  var stat=req.body.stat;
  var q="INSERT INTO `p_project`(`s_id`,`p_title`,`advisees`,`lab`,`stat`) VALUES ('" + sid + "','" + p_tit + "','" + advisees + "','" + lab + "','" + stat + "')";
      connection.query(q,function(err, results) {
          if (err)  {
              signup_msg="try again";
              res.render("signup3",{data:signup_msg});
          }
          else{
              signup_msg="sucesss";
              res.render("signup3",{data:signup_msg});
          }
          
          //console.log("successfully inserted");
          
      })
})


app.get("/courses",function(req,res){
    res.render("courses");
});





app.listen(8080,function()
{
    console.log("ser running");
});