/*
* GET home page.
*/
var bcrypt = require('bcrypt-nodejs');
var mysql=require("mysql");
var db = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'my_schema'
});
 
exports.index = function(req, res){
   var message = '';
   if(req.method == "POST"){
       
      var post  = req.body;
      var username= post.username;
      var pass= post.password;
      var e_pass=bcrypt.hashSync(pass, null, null);
      var name= post.name;
      var aoe= post.aoe;
      var mob= post.mno;
      var email=post.email;
      var exp=post.exp;
      var desg=post.desg;
      var sid=post.sid;
      var pub=post.pub;
      //console.log(pub);
	  if (!req.files)
				return res.status(400).send('No files were uploaded.');

		var file = req.files.uploaded_image;
		var img_name=file.name;

	  	 if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                                 
              file.mv('public/images/upload_images/'+file.name, function(err) {
                             
	              if (err)

	                return res.status(500).send(err);
      					var sql = "INSERT INTO `people`(`sid`,`name`,`designation`,`experience`,`mobile_no`,`email`,`area_of_exper`, `username`,`password`,`image`,`publications`) VALUES ('" + sid + "','" + name + "','" + desg + "','" + exp + "','" + mob + "','" + email + "','" + aoe + "','" + username + "','" + e_pass + "','" + img_name + "',?)";

    						var query = db.query(sql,pub, function(err, result) {
    						    if (err) throw err;
    						//	 res.redirect('profile/'+result.insertId);
    						res.send('<h1>you are successfully signed up!!!!!!!</h1>');
    						});
					   });
          } else {
            message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
            res.render('index.ejs',{message: message});
          }
   } else {
      res.render('signup');
   }
 
};

exports.profile = function(req, res){
	var message = '';
	var id = req.params.id;
    var sql="SELECT * FROM `people` WHERE `id`='"+id+"'"; 
    db.query(sql, function(err, result){
	  if(result.length <= 0)
	  message = "Profile not found!";
	  
      res.render('profile.ejs',{data:result, message: message});
   });
};