var app = require('express')();
var http = require('http').Server(app)
var io = require('socket.io')(http)
var cookieParser = require('cookie-parser')

const bodyParser = require('body-parser');
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())
var user_list = []
var user_name = ''
app.get('/', function(req, res) 
	{
		//res.render('index')
		res.sendFile(__dirname + '/views/login_screen/index.html')
	});
io.on('connection', function(socket)
	{
		//console.log('a user connected')
		//
		
		socket.on('disconnect', function()
			{
				console.log('user disconnected')
				//console.log(user_list[0]);
			});

		socket.on('disconnecting', function()
			{
				io.emit('chat message', document.cookie + ' disconnected');
			});


	});


app.post('/', function(req, res) 
	{
		console.log(req.body.firstname + ' connected to chat');
		console.log('Cookies: ', req)
		user_list.push(req.body.fistname)
		res.sendFile(__dirname + '/views/chat.html')
	})

http.listen(3000, function () {
  console.log('Server is running')
});
