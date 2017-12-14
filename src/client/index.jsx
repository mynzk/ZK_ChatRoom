//package
import React, { Component } from 'react'
import {render} from 'react-dom'
import { Route, Redirect,  } from 'react-router'
import createHistory from 'history/createBrowserHistory'
import {
	BrowserRouter as Router,
	Link,
	Switch
} from 'react-router-dom'
import {Provider,observer} from "mobx-react"

//local
import store from "./store/"
import Canvas from './components/Canvas.jsx'
import AsyncApp from './components/AsyncApp.jsx'
import GithubReport from './components/GithubReport.jsx'
import "./less/index.less"
const history = createHistory()

@observer
export default class Root extends Component{
	componentWillMount(){
		document.ondragstart= () => false
	}
	render(){
		return(
			<Provider store={store}>
				<Router>
					<div className='routerContainer' >
						<Route exact path="/" render={()=>(
							<div>
								<h1>欢迎光临Github聊天室</h1>
								<p>
									<Link to='/group'>open github chat</Link>
								</p>
							</div>
						)} />
						<Route path="/group" component={AsyncApp} />
						<Route path="/githubReport" component={GithubReport} />
						{/* <div className='window'></div> */}
						<Canvas/>
					</div>
				</Router>
			</Provider>
		)
	}
}

render(
	<Root/>,
	document.getElementById('root')
)
