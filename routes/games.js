var express = require('express');
var router = express.Router();
var multer = require('multer');
var Firebase = require('firebase');
var upload = multer({dest:'./public/images/uploads'});
var fbRef = require('fbRef');
router.get('/', function(req, res, next) {
  	res.render('games/index');
});


router.get('/add', function (req, res, next) {
    console.log(express);
    var genreRef = fbRef.child('genres');
	genreRef.once('value', function(snapshot){
		var data = [];
		snapshot.forEach(function(childSnapshot){
			var key = childSnapshot.key();
			var childData = childSnapshot.val();
			data.push({
				id: key,
				name: childData.name
			});
		});
		res.render('games/add',{genres: data});
	});

});

router.post('/add', upload.single('cover'),function(req, res, next) {
	// Check File Upload
	if(req.file){
	  	console.log('Uploading File...');
	  	var cover = req.file.filename;
	} else {
	  	console.log('No File Uploaded...');
	  	var cover = 'noimage.jpg';
	}

	// Build Album Object
	var game = {
		artist: req.body.artist,
		title: req.body.title,
		genre: req.body.genre,
		info: req.body.info,
		year: req.body.year,
		label: req.body.label,
		tracks: req.body.tracks,
		cover: cover,
	}

	// Create Reference
	var game = express.fbRef.child("games");

	// Push Album
  	gameRef.push().set(game);

  	req.flash('success_msg', 'Game Saved');
  	res.redirect('/games');
});

module.exports = router;
