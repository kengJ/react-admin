/**
 * create on 2018-08-15
 * create by kengj
 */
import React from 'react';
import { Input,Button,Row,Col } from 'antd';
import {apiPostPromise} from '../../axios'
class SearchInput extends React.Component{//基础输入框组件
    state={
        inputKey:''
    }
    onPressEnter(e){//回车键触发函数
        //console.log(this.refs.inputKey.input.value)
        if(this.props.onPressEnter!=undefined){
            let key = this.refs.inputKey.input.value
            let message = this.props.onPressEnter(key)
            apiPostPromise(message.url,message.json).then(value=>{
                message.fn(value)
            })
        }
    }
    checkWidth(){//输入框长度处理
        let {width} = this.props;
        let defaultWidth = '500';
        if(width==undefined||typeof(width)=='number'){
            return defaultWidth;
        }else{
            return width;
        }
    }
    clear(){
        let message = this.props.onPressEnter(null)
        apiPostPromise(message.url,message.json).then(value=>{
            message.fn(value)
        })
        this.refs.inputKey.input.value=""
    }
    render(){
        let {title,size,defaultValue,type,style,btnText} = this.props;
        let width = this.checkWidth();//获取输入框长度
        return(
            <Input.Group>
                <div style={{width:width+'px'}}>
                    <Input 
                        placeholder={title!=undefined?title:"搜索"} 
                        size={size!=undefined?size:'default'} 
                        defaultValue={defaultValue!=undefined?defaultValue:''}
                        type={type!=undefined?type:'text'}
                        style={style}
                        onPressEnter={this.onPressEnter.bind(this)}
                        ref="inputKey"/>
                </div>
                {btnText!=undefined?
                    <Button 
                        type="primary" 
                        style={{marginLeft:'20px'}} 
                        onClick={this.onPressEnter.bind(this)}>
                        {btnText}
                    </Button>:<div></div>} 
                    <Button 
                        type="primary" 
                        style={{marginLeft:'20px'}} 
                        onClick={this.clear.bind(this)}>
                        重置
                    </Button>
            </Input.Group>     
        )
    }
}

export default SearchInput