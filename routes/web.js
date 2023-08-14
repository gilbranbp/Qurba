var express = require('express');
var router = express.Router();
const func = rootRequire('/app/libs/func');
const sessionChecker = rootRequire('/app/libs/sessionChecker');
const path = require('path');
const glob = require( 'glob' );

const multer = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/global_assets/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
 
var upload = multer({ storage: storage })

let Models={}
glob.sync( './app/models/**/*.js' ).map((file)=>{
	let key=file.replace('.js','').substring(file.lastIndexOf('/')+1)
	Models[key]=require(path.resolve(file));
});

router

.get('/', function(req, res, next) {
  res.redirect('/login');
})

.get('/login',(req, res, next) =>{
  res.render('login/login', { page: 'Login', menuId: 'Login' });
})
.post('/login-data',Models.Login.login)
.post('/login-register',Models.Login.data)
.get('/login-load',Models.Login.load)

.get('/logout',(req,res) => {
  if (req.session.user && req.cookies.user_sid) {
      req.session.destroy()
      res.clearCookie('user_sid');
      res.redirect('/login');
  } else {
      res.redirect('/login'); 
  }
})

.get('/store', sessionChecker,function(req, res, next) {
  res.render('store/store', {page:'Store', menuId:'Store', submenuId:null, usr:req.session.user});
})
// .get('/search', sessionChecker ,(req, res, next) =>{
//   res.render('home/search', {page:'Search', menuId:'Search', submenuId:null, usr:req.session.user});
// })
.post('/store-data',Models.Store.data)
.get('/store-load',Models.Store.load)


.get('/sales', sessionChecker ,(req, res, next) =>{
  res.render('sales/sales', {page:'Sales', menuId:'Sales', submenuId:null, usr:req.session.user});
})
.get('/sales-details', sessionChecker ,(req, res, next) =>{
  res.render('sales/sales-details', {page:'Sales', menuId:'Sales', submenuId:null, usr:req.session.user});
})
.post('/sales-data',Models.Sales.data)
.get('/sales-load',Models.Sales.load)

.get('/report', sessionChecker ,(req, res, next) =>{
  res.render('report/report', {page:'Report', menuId:'Report', submenuId:null, usr:req.session.user});
})
.post('/report-data',Models.Report.data)
.get('/report-load',Models.Report.load)

// .get('/all-bundle', sessionChecker ,(req, res, next) =>{
//   res.render('bundle/all-bundle', {page:'Bundle', menuId:'Bundle', submenuId:null, usr:req.session.user});
// })
// .get('/bundle', sessionChecker ,(req, res, next) =>{
//   res.render('bundle/bundle', {page:'Bundle', menuId:'Bundle', submenuId:null, usr:req.session.user});
// })
// .post('/bundle-data',Models.Bundle.data)
// .get('/bundle-load',Models.Bundle.load)

.get('/profile', sessionChecker ,(req, res, next) =>{
  res.render('profile/profile', {page:'Profile', menuId:'Profile', submenuId:null, usr:req.session.user});
})
.post('/profile-data',Models.Profile.data)
.get('/profile-load',Models.Profile.load)
.post('/profile-upload', upload.single("file"),Models.Profile.upload)


module.exports = router;
    