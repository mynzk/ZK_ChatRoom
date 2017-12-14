import React from 'react'
import { Avatar, Badge } from 'antd';
import { inject, observer } from "mobx-react"
import { colorList } from '../../../config/client.js'

@inject("store")
@observer
export default class RoomDetails extends React.Component {
	render() {
		const { group, showRoomDetail, onlineUsers } = this.props.store;
		const showRoomDetailListText = [
			// {
			// 	title: '群头像',
			// 	onlineUsers: [{
			// 		//为了配合循环，故意叫做user_name   ,他的真名叫做group_name
			// 		user_name: group.group_name,
			// 		avatar_url: group.avatar_url
			// 	}],
			// 	offlineUsers: []
			// }, 
			{
				title: '管理员',
				onlineUsers: [...group.administratorList.filter(e => onlineUsers.indexOf(e.user_id) >= 0)],
				offlineUsers: [...group.administratorList.filter(e => onlineUsers.indexOf(e.user_id) == -1)]
			}, {
				title: '成员',
				onlineUsers: [...group.memberList.filter(e => onlineUsers.indexOf(e.user_id) >= 0)],
				offlineUsers: [...group.memberList.filter(e => onlineUsers.indexOf(e.user_id) == -1)]
			}
		]
		return (
			<div id='contentRoomDetails' className={`contentRoomDetails ${showRoomDetail ? 'show' : 'hide'}`}>
				<div className="showRoomDetailList">
					<span className="title">群头像:</span>
					<span className="avatarContainer">
						<span className="avatar">
							<div className='ant-badge'>
								<Avatar
									data-id={group._id}
									src={group.avatar_url}
									className="slideAvatar"
									shape="square"
									size="large" />
							</div>
							<span className="name">
								{group.group_name}
							</span>
						</span>
					</span>
				</div>
				{group.group_name && showRoomDetailListText.map((avatars, i) => (
					<div className="showRoomDetailList" key={i}>
						<span className="title">{avatars.title}:</span>
						<span className="avatarContainer">
							{[
								...avatars.onlineUsers,
								...avatars.offlineUsers
							].map((avatar, j) => (
								<span className="avatar" key={j}>
									<Badge dot className={`${j < avatars.onlineUsers.length ? "online" : 'offline'}`}>
										<Avatar
											data-id={avatar.user_id}
											src={avatar.avatar_url}
											className="slideAvatar"
											id="showMoreUserInfo"
											shape="square"
											size="large" />
									</Badge>
									<span className="name">
										{avatar.user_name}
									</span>
								</span>
							))}
						</span>
					</div>
				))}
			</div>
		)
	}
}
