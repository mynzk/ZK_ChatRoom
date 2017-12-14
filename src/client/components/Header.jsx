import React, { Component } from 'react'
import { Avatar,Spin, Icon ,Layout,Row,Col } from 'antd'
import { inject, observer } from "mobx-react"
import {colorList} from '../../../config/client.js'
const {Header} = Layout

@inject("store")
@observer
export default class header extends Component {
	render() {
		const { match } = this.props
		const {
			group,
			onlineUsers,
			myInfo,
			showRoomDetail,
		} = this.props.store;
		return (
			<Header className="header">
				<Row type="flex" justify="space-between" >
					<Col span={2}></Col>
					<Col span={16}>
						{group.group_name == null && <h1>这个房间我找不到。。。。。</h1>}
						{group.group_name && (group.group_name == '' ? <h1>github chat</h1> : <h1 className='toggleDetail'>
							{`${group.group_name}(${group.memberList.filter(e => onlineUsers.indexOf(e.user_id) >= 0).length}/${group.memberList.length})人`}
							{showRoomDetail ? <Icon type="up" /> : <Icon type="down" />}
						</h1>)}
					</Col>
					<Col span={2}>
						<iframe
							frameBorder="0" scrolling="0" width="91px" height="20px"
							src="https://ghbtns.com/github-btn.html?user=pengliheng&repo=chatroom&type=star&count=true" >
						</iframe>
					</Col>
				</Row>
			</Header>
		)
	}
};
