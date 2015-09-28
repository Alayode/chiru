//Add mongoose and bcryptjs for database schemas and API routes
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//FOR THE TVDB API THESE MODULES ARE NECESSARY

//Show mongoose schema
var showSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  airsDayOfWeek: String,
  airsTime: String,
  firstAired: Date,
  genre: [String],
  network: String,
  overview: String,
  rating: Number,
  ratingCount: Number,
  status: String,
  poster: String,
  subscribers: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  }],
  episodes: [{
      season: Number,
      episodeNumber: Number,
      episodeName: String,
      firstAired: Date,
      overview: String
  }]
});

//User Schema
var userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String
});

userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

//create mongoose models which we will be using to querying mongoDB
var User = mongoose.model('User', userSchema);
var Show = mongoose.model('Show', showSchema);

mongoose.connect('localhost');


var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//search by show title
app.get('/api/shows', function(req, res, next) {
  var query = Show.find();
  if (req.query.genre) {
    query.where({ genre: req.query.genre });
  } else if (req.query.alphabet) {
    query.where({ name: new RegExp('^' + '[' + req.query.alphabet + ']', 'i') });
  } else {
    query.limit(12);
  }
  query.exec(function(err, shows) {
    if (err) return next(err);
    res.send(shows);
  });
});

//this route will be use to add a new show to the database we will create a separate route for it.
app.post('/api/shows',function(req,res,next){
  var apiKey = 'Please grab new key';
  var parser = xml2js.Parser({
    explicitArray: false,
    normalizeTags: true
  });
  var seriesName = req.body.showName
      .toLowerCase()
      .replace(/ /g, '_')
      .replace(/[^\w-]+/g, '');

//using async waterfall  to manage multiple operations
async.waterfall([
  function(callback){
    //Get the Show ID given the Show Name and pass it on to the next function.
    request.get('http://thetvdb.com/api/GetSeries.php?seriesname=' + seriesName, function error,response, body){
      if (error) return next (error);
      parser.parseString(body , function(err,result){
        if(!result.data.series){
          return res.send(404,{ message:req.body.showName + 'was not found'});
        }
        var seriesId = result.data.seriesid || result.data.series[0].seriesid;
        callback(err,seriesId);
      });
    };
  },
  function(seriesId,callback){
    // Get the show information using the Show ID from previous step and pass the new show object on to the next function.
    request.get('http://thetvdb.com/api/' + apiKey + '/series/' + seriesId + '/all/en.xml', function(error,response,body){
      if (error) return next (error);
      parser.parseString(body.function(err,result){
        var series = result.data.series;
        var show = new show ({
          _id: series.id,
                       name: series.seriesname,
                       airsDayOfWeek: series.airs_dayofweek,
                       airsTime: series.airs_time,
                       firstAired: series.firstaired,
                       genre: series.genre.split('|').filter(Boolean),
                       network: series.network,
                       overview: series.overview,
                       rating: series.rating,
                       ratingCount: series.ratingcount,
                       runtime: series.runtime,
                       status: series.status,
                       poster: series.poster,
                       episodes: []
        });
        _.each(episodes, function (episode) {
                           show.episodes.push({
                           season: episode.seasonnumber,
                           episodeNumber: episode.episodenumber,
                           episodeName: episode.episodename,
                           firstAired: episode.firstaired,
                           overview: episode.overview
        });
      });
      callback(err,show);
    });
  });
}),
// Convert the poster image to Base64, assign it to show.poster and pass the show object to the final callback function.
      function(show,callback){
        var url = 'http://thetvdb.com/banners/'+ poster;
        request({ url: url, encoding:null } , function(error,response,body){
          show.poster = 'data:' + response.headers['content-type'] + ';base64' + body.toString('base64');
          callback(error,show);
        });
   }
],
function(err,show){
  if (err) return next (err);
  show.save(function(err){
    if(err){
      if(err.code == 11000){
        return res.send (409, { message.show.name + 'duplicate show name.'});
      }
      return next(err);
      }
      res.send(200);
  });
});
}

//FIx HTML5 pushState on the client-side issue.
app.get('*', function(req, res) {
    res.redirect('/#' + req.originalUrl);
});


app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.send(500, { message: err.message });
});

//api route to search by genre and search by letter
app.get('/api/shows/:id', function(req, res, next) {
  Show.findById(req.params.id, function(err, show) {
    if (err) return next(err);
    res.send(show);
  });
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.send(500, { message: err.message });
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
