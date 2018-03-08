// app/routes.js
module.exports = function(app, passport) {
	var mysql=require("mysql");
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'my_schema'
});
	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile1', // redirect to the secure profile section
            failureRedirect : '/', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
            
		}),
        function(req, res) {
            

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
        
    });

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	// app.get('/signup', function(req, res) {
	// 	// render the page and pass in any flash data if it exists
	// 	res.render('signup.ejs', { message: req.flash('signupMessage') });
	// });

	// // process the signup form
	// app.post('/signup', passport.authenticate('local-signup', {
	// 	successRedirect : '/profile1', // redirect to the secure profile section
	// 	failureRedirect : '/signup', // redirect back to the signup page if there is an error
	// 	failureFlash : true // allow flash messages
	// }));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile1', isLoggedIn, function(req, res) {
		res.render('profile1', {
			user : req.user // get the user out of session and pass to template
		});
	});
	app.get("/edit/:id",isLoggedIn,function(req, res) {
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

app.get("/editedu/:id",isLoggedIn,function(req, res) {
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

app.get("/changePass/:id",isLoggedIn, function(req, res) {
    req.flash("msg",""); 
    res.render("changePass",{id:req.params.id,data:req.flash("msg")});
})
app.get("/editedu1/:id",isLoggedIn, function(req, res) {
    var id=req.params.id;
    var q= "select * from p_edu where id='"+id+"' ";
    connection.query(q,function(err, results) {
        if(err) throw err;
        res.render("ededu",{data:results});
    })
    
})   
var signup_msg="";
app.get("/signup2",isLoggedIn, function(req,res){
    res.render("signup2",{data:signup_msg});
});
	app.get("/imageins",isLoggedIn,function(req,res){
    res.render("imageins");
});


	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
