import React, {Component} from 'react'
import {Avatar, Icon} from 'antd'
import {inject, observer} from "mobx-react"
import {colorList} from '../../../config/client.js'

@inject("store")
@observer
export default class GithubReport extends Component {
  render() {
    return (
      <div>
          <h1>Github 分析报告~~！</h1>
      </div>
    )
  }
};


