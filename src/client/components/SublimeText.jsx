import React from 'react'
import {  Form, Input } from 'antd';
import { inject, observer } from "mobx-react"
const { TextArea } = Input;
let keyCombination = []

@inject("store")
@observer
export default class SublimeText extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			value:''
		}
	}

	handleChange = (e) =>{
		this.setState({
			value:e.target.value
		})
	}

	handleKeyDown = (e) =>{
		var input = e.target
		var rangeData = {text: "", start: input.selectionStart , end: input.selectionEnd };
		keyCombination.push(e.key)
		switch(keyCombination.toString()){
			case ['Control','Enter'].toString() :
				keyCombination=[]
				e.target.value.length>0 && this.props.handleMsgSubmit({
					code:e.target.value,
					type:'code',
				})
				this.setState({
					value:''
				})
				break;
			default:
		}
		switch(e.key){
			case '(':
				input.value = input.value.substring(0,rangeData.start) + ")" + input.value.substring(rangeData.end)
				input.setSelectionRange(rangeData.start , rangeData.end);
				break;
			case '{':
				input.value = input.value.substring(0,rangeData.start) + "}" + input.value.substring(rangeData.end)
				input.setSelectionRange(rangeData.start , rangeData.end);
				break;
			case ')':
				if(input.value.substring(rangeData.start-1,rangeData.start+1)=="()"){
					input.value = input.value.substring(0,rangeData.start) + input.value.substring(rangeData.end+1)
				}
				break;
			case '}':
				if(input.value.substring(rangeData.start-1,rangeData.start+1)=="{}"){
					input.value = input.value.substring(0,rangeData.start) + input.value.substring(rangeData.end+1)
				}
				break;
			case "'":
				if(input.value.substring(rangeData.start-1,rangeData.start+1)!="''"){
					// dsd --->  d''sd
					input.value = input.value.substring(0,rangeData.start) + "'" + input.value.substring(rangeData.end)
					input.setSelectionRange(rangeData.start , rangeData.end);
				}else{
					// d'I'sd --->  d''Isd
					input.value = input.value.substring(0,rangeData.start) + input.value.substring(rangeData.end+1)
				}
				break;
			case '"':
				if(input.value.substring(rangeData.start-1,rangeData.start+1)!='""'){
					// dsd --->  d''sd
					input.value = input.value.substring(0,rangeData.start) + '"' + input.value.substring(rangeData.end)
					input.setSelectionRange(rangeData.start , rangeData.end);
				}else{
					// d'I'sd --->  d''Isd
					input.value = input.value.substring(0,rangeData.start) + input.value.substring(rangeData.end+1)
				}
				break;
			case 'Backspace':
				if(
					input.value.substring( rangeData.start - 1 , rangeData.start + 1 ) == "()" ||
					input.value.substring( rangeData.start - 1 , rangeData.start + 1 ) == "{}" ||
					input.value.substring( rangeData.start - 1 , rangeData.start + 1 ) == "''" ||
					input.value.substring( rangeData.start - 1 , rangeData.start + 1 ) == '""'
				){
					input.setSelectionRange(rangeData.start-1 , rangeData.end+1);
				}
				break;
			default :
				return
		}
	}

	handleKeyUp = (e) =>{
		keyCombination = []
		var input = e.target
		var rangeData = { start: input.selectionStart , end: input.selectionEnd };
		switch(e.key){
			case 'Enter':
				if(
					input.value.substring(rangeData.start-2,rangeData.start+1)==`{\n}` ||
					input.value.substring(rangeData.start-2,rangeData.start+1)==`(\n)`
				){
					input.value = input.value.substring(0,rangeData.start-1)+ '\n\t\n' + input.value.substring(rangeData.end)
					input.setSelectionRange(rangeData.start+1 , rangeData.end+1);
				}
				break;
			default :
				return
		}
	}

	render() {
		const {value} = this.state
		return (
			<Form className={ this.props.store.showCodeEdit ? 'textAreaContainer display' : 'none textAreaContainer' }>
				<TextArea
					className = "textArea"
					id = "textArea"
					value = {value}
					placeholder = 'Ctrl + Enter to submit'
					autosize = {{ minRows: 4, maxRows: 16 }}
					onKeyDown = {this.handleKeyDown}
					onChange = {this.handleChange}
					onKeyUp = {this.handleKeyUp}
					/>
			</Form>

		);
	}
}
