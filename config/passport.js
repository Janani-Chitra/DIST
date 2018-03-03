// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);
// expose this function to our app using module.exports

module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        
        done(null, user.sid);
    });

    // used to deserialize the user
    passport.deserializeUser(function(sid, done) {
        
        connection.query("SELECT * FROM people WHERE sid = ? ",[sid], function(err, rows){
            done(err, rows[0]);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    // passport.use(
    //     'local-signup',
    //     new LocalStrategy({
    //         // by default, local strategy uses username and password, we will override with email
    //         usernameField : 'username',
    //         passwordField : 'password',
            
    //         passReqToCallback : true // allows us to pass back the entire request to the callback
    //     },
    //     function(req, username, password, done) {
    //         // find a user whose email is the same as the forms email
    //         // we are checking to see if the user trying to login already exists
    //         var sid=req.body.sid;
    //         var name=req.body.name;
    //         var desg=req.body.desg;
    //         var exp=req.body.exp;
    //         var mno=req.body.mno;
    //         var email=req.body.email;
    //         var aoe=req.body.aoe;
            
            
    //         connection.query("SELECT * FROM people WHERE username = ?",[username], function(err, rows) {
    //             if (err)
    //                 return done(err);
    //             if (rows.length) {
    //                 return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
    //             } else {
    //                 // if there is no user with that username
    //                 // create the user
    //                 var newUserMysql = {
    //                     username: username,
    //                     password: bcrypt.hashSync(password, null, null) , // use the generateHash function in our user model
    //                     sid : sid,
    //                     name:name,
    //                     designation:desg,
    //                     experience:exp,
    //                     mobile_no:mno,
    //                     email:email,
    //                     area_of_exper:aoe
                        
                        
    //                 };

    //                 var insertQuery = "INSERT INTO people ( username, password,sid,name,designation,experience,mobile_no,email,area_of_exper ) values (?,?,?,?,?,?,?,?,?)";

    //                 connection.query(insertQuery,[newUserMysql.username, newUserMysql.password,newUserMysql.sid,newUserMysql.name,newUserMysql.designation,newUserMysql.experience,newUserMysql.mobile_no,newUserMysql.email,newUserMysql.area_of_exper],function(err, rows) {
    //                     newUserMysql.id = rows.insertId;

    //                     return done(null, newUserMysql);
    //                 });
    //             }
    //         });
    //     })
    // );

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-login',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) { // callback with email and password from our form
            connection.query("SELECT * FROM people WHERE username = ?",[username], function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }

                // if the user is found but the password is wrong
                if (!bcrypt.compareSync(password, rows[0].password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, rows[0]);
            });
        })
    );
};
