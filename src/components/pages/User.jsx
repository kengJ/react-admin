import React from 'react';
import { Card } from 'antd';
import {Divider,Icon} from 'antd';
import BasicTablePage from '../tables/BasicTablePage'
import SearchInput from '../input/SearchInput'


const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="javascript:void(0);">{text}</a>,
  }, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  }, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="javascript:;">Action 一 {record.name}</a>
        <Divider type="vertical" />
        <a href="javascript:;">Delete</a>
        <Divider type="vertical" />
        <a href="javascript:;" className="ant-dropdown-link">
          More actions <Icon type="down" />
        </a>
      </span>
    ),
  }];


class User extends React.Component{
    state={
        data:[]
    }
    constructor(props){
        super(props);
        const data = [{
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
          }, {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
          }, {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
          }];
        this.state={data:data}
    }
    click(){
        this.setState({data:[]});
    }
    reset(){
        this.setState({data:[{
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
          }]})
    }
    render(){
        //console.log(this.state.data)
        return(
            <div>
                <Card title="用户管理" style={{marginTop:'20px'}}>
                  <SearchInput btnText="查询" title="请输入关键字"/>
                  <br/>
                  <BasicTablePage columns={columns} data={this.state.data}/>
                </Card>
            </div>
        )
    } 
}

export default User