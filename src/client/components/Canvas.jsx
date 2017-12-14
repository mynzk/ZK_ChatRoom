import React, { Component } from 'react'
import { Avatar, Icon } from 'antd'
import { inject, observer } from "mobx-react"
import { colorList } from '../../../config/client.js'

@inject("store")
@observer
export default class Canvas extends Component {

    componentDidMount() {
        //     var canvas =  this.refs.canvas,
        // 	canvasCtx = canvas.getContext("2d"),
        // 	canvasWidth = canvas.width,
        // 	canvasHeight = canvas.height;

        // // 创建 audio context对象和 分析器
        //     var audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
        //         analyser = audioCtx.createAnalyser(); 

        //     // 获取播放源
        //     let audio = this.refs.audio;
        //     audio.crossOrigin = "anonymous";
        //     let audioSource = audioCtx.createMediaElementSource(audio); 

        //     // 连接节点
        //     audioSource.connect(analyser);
        //     analyser.connect(audioCtx.destination);

        //     // 设置数据格式
        //     analyser.fftSize = 256;
        //     var bufferLength = analyser.frequencyBinCount,
        //         dataArray = new Uint8Array(bufferLength); 
        //     var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame;

        //         // 即时呈现数据
        //     function draw() {

        //         analyser.getByteFrequencyData(dataArray); // 实时获取波形数据

        //         canvasCtx.fillStyle = 'rgb(0, 0, 0)';
        //         canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);

        //         var barWidth = (canvasWidth / bufferLength) * 2,
        //         barHeight = 0 ,
        //         barX = 0;

        //         for(var i = 0; i < bufferLength; i++) {
        //             //每个音阶来此处理。。。。
        //             //每个声音有128个符文
        //             barHeight = dataArray[i]/1.059463;
        //             canvasCtx.fillStyle = "#f7d54e";
        //             canvasCtx.fillRect(barX , canvasHeight-barHeight/2 , barWidth , barHeight);
        //             barX += barWidth + 1;
        //         }

        //         let drawTimer = requestAnimationFrame(draw);
        //     }
        //     draw();
        // navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
        //     || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        
        //     function gotStream(stream){
        //         //做一个兼容  webkit 的设置
        //         window.AudioContext = window.AudioContext || window.webkitAudioContext;
                
        //         var audioContext = new AudioContext();
        //             // 创建一个MediaStreamAudioSourceNode接口来关联可能来自本地计算机麦克风或其他来源的音频流MediaStream.
        //             var mediaStreamSource = audioContext.createMediaStreamSource(stream);
                
        //             // Connect it to destination to hear yourself
        //             // or any other node for processing!
        //             mediaStreamSource.connect(audioContext.destination);
        //         document.querySelector('video').src = window.URL.createObjectURL(stream);
        //     }

        // navigator.getUserMedia({ video: true }, gotStream , (err) => {});
    }
    render() {
        return (
            <video className="window" autoPlay></video>
        )
    }
};


