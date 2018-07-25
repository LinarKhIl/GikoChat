var app = require('express')();
var http = require('http').Server(app)
var io = require('socket.io')(http)
var user_name = ''
var user_names = new Map();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) 
	{
		//res.render('index')
		res.sendFile(__dirname + '/views/login_screen/index.html')
	});
io.on('connection', function(socket)
	{
		user_names[socket.id] = user_name;
		socket.on('disconnect', function()
			{
				console.log('user disconnected')
				//console.log(user_list[0]);
			});
		socket.on('chat message', function(msg)
		{
			io.emit('chat message', user_names[socket.id] + ': ' + msg);
		});
	});
app.post('/', function(req, res) 
	{
		console.log(req.body.firstname + ' connected to chat');
		user_name = req.body.firstname;
		res.sendFile(__dirname + '/views/chat.html')
	});
http.listen(3000, function () {
  console.log('Server is running')
});
