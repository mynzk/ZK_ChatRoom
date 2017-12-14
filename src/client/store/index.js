import Prismjs from "prismjs"
import "prismjs/components/prism-jsx.js"
import "prismjs/themes/prism-okaidia.css"
import io from 'socket.io-client';
import { action, useStrict, computed, observable } from "mobx";

import config from '../../../config/project.js'


const socket = io.connect({ secure: true });
// const socket = io();

// useStrict(true)
class TodoStore {
	//我的用户信息
	@observable myInfo = {
		user_id: '',
		github: {
			name: '',
			avatar_url: ''
		},
		groups: [{
			group_id: "",
			group_name: "Moonlight",
			avatar_url: "https://assets.suisuijiang.com/group_avatar_default.jpeg?imageView2/2/w/40/h/40"
		}],
		status:'offline'
	}
	//当前房间信息
	@observable group = {
		_id: '',
		group_name: '',
		avatar_url: '',
		creator: '',
		administratorList: [],
		memberList: [],
		messageList: []
	}
	//是否显示用户详细信息
	@observable showRoomDetail = false
	//是否显示用户创建群iput
	@observable is_show_create_group_input = false
	//是否显示表情容器
	@observable showEmoji = false
	//是否显示代码编辑器
	@observable showCodeEdit = false
	//是否显示用户信息详情
	@observable showMoreUserInfo = {
		isShow: false,
		x: "30vw",
		y: "50vh",
		github: {
			name: 'Moonlight',
			avatar_url: ''
		},
		star_count: 0
	}
	@observable code = ''
	@observable scrollToBottom = false
	@observable messageType = 'text'
	@observable onlineUsers = []
	@observable doing = false
	@action socket = (state) => {
		console.log(state);
		socket.emit(state.url, state)
	}
	//写了一个通用mobx函数。。。希望能用。。。。。
	@action allHold = (left, right) => {
		if (left.split('.').length == 1) {
			this[left] = right
		} else if (left.split('.').length == 2) {
			this[
				left.split('.')[0]
			][
				left.split('.')[1]
			] = right
		} else if (left.split('.').length == 3) {
			this[left.split('.')[0]][
				left.split('.')[1]
			][
				left.split('.')[2]
			] = right
		}
	}
	constructor() {
		socket.on('get myInfo', json => {
			this.myInfo = json
		})
		socket.on('online user', json => {
			console.log('online user',json);
			this.onlineUsers = json
		})
		socket.on('init group', json => {
			if (!json) {
				this.group.name = null
				return
			}
			this.group = json
			Prism.highlightAll()
			this.doing = false
			this.scrollToBottom = true
		})

		socket.on('send message', json => {
			this.group.messageList.push(json)
			Prism.highlightAll()
			this.scrollToBottom = true
		})

		socket.on('user detail', json => {
			console.log("user detail", json);
			//同时查询该用户star总数，
			fetch(`${json.github.repos_url}`)
				.then(response => response.json())
				.then(json => {
					json.map((repos, i) => {
						this.showMoreUserInfo.star_count += repos.stargazers_count
					})
				})
				.then(() => {
					console.log('count', this.showMoreUserInfo.star_count);
				})
			//只能一个一个获取，不然会改变 showmoreuserinfo 的框框xy坐标位置。
			this.showMoreUserInfo.github = json.github
			this.showMoreUserInfo.groups = json.groups
			this.showMoreUserInfo.friends = json.friends
			this.showMoreUserInfo._id = json._id
		})
	}
}
window.store = new TodoStore
window.debug1 = "localStorage.debug = 'socket.io-client:socket'"
const store = window.store
export default store
