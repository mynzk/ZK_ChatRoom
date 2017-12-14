//package
const http = require('http');
const path = require('path');
const IO = require('socket.io');
const mongoose = require('mongoose');

//local
const app = require('./app');
const User = require('./models/User.model');
const Token = require('./models/Token.model');
const Group = require('./models/Group.model');
const config = require('../../config/server');
const allRouter = require('./routes/index.js');

//utils
const { getCookie, getUrl } = require('./utils/get')

//app
const port = process.env.PORT || config.port;
// const datebase = config.proDatabase.gigs
const datebase = config.proDatabase.tencent
const server = http.createServer(app.callback())
const io = new IO(server);


mongoose.Promise = global.Promise;
mongoose.connect(datebase, { useMongoClient: true })
	.then(() => {
		io.on('connection', async (socket) => {
			console.log('connection',process.env.NODE_ENV,port);
			let access_token = getCookie(socket).access_token
			let urlArray = getUrl(socket).pathname.split('/')
			if (urlArray[1] == 'group' && urlArray[2]) {
				if (access_token) {
					socket.myInfo = await Token.verify({ access_token: access_token })
					if (socket.myInfo) {
						socket.emit('get myInfo', socket.myInfo)
					}
				}
				let group_name = urlArray[2]
				let groupInfo = await Group.findOnePretty({ group_name: group_name })
				socket.join(groupInfo._id.toString())
				socket.currentRoomId = groupInfo._id.toString()
				socket.emit('init group', groupInfo)
				let onlineUser = await User.find({ status: 'online' })
				let newOnlineUser = onlineUser.map(e => {
					return e.user_id
				})
				io.emit('online user', newOnlineUser)
			}

			socket.on('init group', async (json) => {
				socket.leave(socket.currentRoomId)
				let groupInfo = await Group.findOnePretty({ group_name: json.group_name })
				socket.join(groupInfo._id.toString())
				socket.currentRoomId = groupInfo._id.toString()
				socket.emit('init group', groupInfo)
			})

			socket.on('send message', async (json) => {
				let message = await Group.sendMsg(json)
				let user = await User.findOne({ user_id: json.user_id })
				message = Object.assign({}, message, {
					user_name: user.github.name,
					avatar_url: user.github.avatar_url,
					update_time: message.update_time,
					create_time: message.create_time,
				})
				io.to(socket.currentRoomId).emit('send message', message)
			})

			socket.on('user detail', async (json) => {
				let user = await User.findOne({ user_id: json.user_id })
				socket.emit('user detail', user)
			})

			socket.on('create group', async (json) => {
				let group = await Group.create({
					group_name: json.group_name,
					administratorList: [json.user_id],
					memberList: [json.user_id],
					creator: [json.user_id],
				})
				let myInfo = await User.join_group({
					group_id: group._id.toString(),
					user_id: json.user_id
				})
				socket.emit('get myInfo', myInfo)
			})

			socket.on('disconnect', async (json) => {
				console.log('disconnect');
				socket.myInfo && await User.update({
					user_id: socket.myInfo.user_id
				}, {
					status: 'offline'
				})
				let onlineUser = await User.find({ status: 'online' })
				onlineUser = onlineUser.map(e => e.user_id)
				io.emit('online user', onlineUser)
			});
		});

		server.listen(port, async () => {
			console.log(` >>> server listen on http://localhost:${port}`);
			console.log(` >>> server connect mongodb datebase ${datebase}`);
		});
	})