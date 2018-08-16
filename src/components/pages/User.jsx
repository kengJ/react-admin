import React from 'react';
import { Card } from 'antd';
import {Divider,Icon} from 'antd';
import BasicTablePage from '../tables/BasicTablePage'
import SearchInput from '../input/SearchInput'
import {apiPost} from '../../axios'

const columns = [{
    title: 'Id',
    dataIndex: 'id',
    key: 'id  ',
    width:10
  }, {
    title: '用户名',
    dataIndex: 'userName',
    key: 'userName',
    editable: true,
  }, {
    title: '密码',
    dataIndex: 'password',
    key: 'password',
    editable: true,
  }];


class User extends React.Component{
    state={
        data:[]
    }
    constructor(props){
        super(props);
        this.findData(null);
    }
    save(index,data){
      const newData = [...this.state.data]
      newData.splice(index, 1, {
        ...data,
      });
      this.setState({data:newData})
      return true;
    }
    findData(key){
      //let url = '/User/ReactFindByKey';
      let action = null;
      if(key==null){
        action = apiPost('/User/ReactFindAll',{})
      }else{
        action = apiPost('/User/ReactFindByKey',{Key:key})
      }
      action.then(
        res=>{
          //console.log(res.data)
          let findData = res.data
          findData.map(item=>{
            item.key = item.id
          });
          //console.log(findData)
          this.setState({data:findData})
        }
      ).catch(err=>{console.log(err)})
    }
    onPressEnter(key){
      //console.log('key',key)
      this.findData(key)
    }
    render(){
        //console.log(this.state.data)
        return(
            <div>
                <Card title="用户管理" style={{marginTop:'20px'}}>
                  <SearchInput 
                    btnText="查询" 
                    title="请输入关键字"
                    onPressEnter={this.onPressEnter.bind(this)}/>
                  <br/>
                  <BasicTablePage 
                    columns={columns} 
                    data={this.state.data} 
                    save={this.save.bind(this)}/>
                </Card>
            </div>
        )
    } 
}

export default User