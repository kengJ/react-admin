import React from 'react';
import { Card } from 'antd';
import { Input } from 'antd';
import { Table } from 'antd';


import EditableTable from '../tables/EditableTable'

const Search = Input.Search;

class User extends React.Component{
    render(){
        return(
            <div>
                <Card title="用户管理" style={{marginTop:'20px'}}>
                  <Search
                  placeholder="input search text"
                  onSearch={value => console.log(value)}
                  style={{ width: 500 }}
                  />
                  <EditableTable/>
                  </Card>
            </div>
        )
    }
}

export default User