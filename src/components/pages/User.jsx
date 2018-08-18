import React from 'react';
import { Card } from 'antd';
import BasicTablePage from '../tables/BasicTablePage'
import SearchInput from '../input/SearchInput'
import UserBtn from '../button/UserBtn'
import {apiPost,apiPostPromise} from '../../axios'

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
  },{
    title: '权限',
    dataIndex: 'role.memo',
    key: 'role',
    editable: false,
  }];


class User extends React.Component{
    state={
        data:[]
    }
    constructor(props){
        super(props);
        //this.findData(null);
    }
    save(index,data,reslove,reject){
      return {
        url:'/User/UpdateUser',
        json:{Id:index,UserName:data.userName,Password:data.password},
        fn: value=>{
          return value=="success"
        }
      }
    }
    findData(key){
      return key==null?{
        url:'/User/ReactFindAll',
        json:{},
        fn:value =>{
          value.map(item=>{
            item.key = item.id
          });
          this.setState({data:value})
          return true;
        }
      }:{
        url:'/User/ReactFindByKey',
        json:{Key:key},
        fn:value=>{
          value.map(item=>{
            item.key = item.id
          });
          this.setState({data:value})
          return true;
        }
      }
    }
    onPressEnter(key){
      return this.findData(key)
    }
    render(){
        return(
            <div>
                <Card title="用户管理" style={{marginTop:'20px'}}>
                  <SearchInput 
                    btnText="查询" 
                    title="请输入关键字"
                    onPressEnter={this.onPressEnter.bind(this)}/>
                  <br/>
                  <UserBtn></UserBtn>
                  <br/>
                  <BasicTablePage 
                    columns={columns} 
                    data={this.state.data} 
                    save={this.save.bind(this)}
                    findData={this.findData.bind(this)}/>
                </Card>
            </div>
        )
    } 
}

export default User