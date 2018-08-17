/**
 * create by kengj
 * create on 2018-08-16
 */
import React from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import {apiPostPromise} from '../../axios'

const { Option } = Select;
const FormItem = Form.Item;

class UserBtnComponent extends React.Component{
    state = { 
        visible:false,
        roles: []
    };
    constructor(props){
        super(props);
        this.getRole()
    }
    //state = { visible: false ,roles};

    showDrawer = () => {
       this.getRole()
      this.setState({
        visible: true,
      });
    };
  
    onClose = () => {
      this.setState({
        visible: false,
      });
    };
  
    getRole(){
        let roles = []
        apiPostPromise('/Role/ReactFindAll').then(value=>{
            //console.log('value',value)
            value.map(item=>{
                roles.push({name:item.roleName,id:item.id})
            })
            console.log(roles)
            this.setState({roles:roles})
        })
    }

    render() {
      const { getFieldDecorator } = this.props.form;
      const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
      };
      let {roles} = this.state;
      //console.log('render',this.state.roles)
      const  option = roles.map(item=>{
            <Option key={item.id}>{item.name}</Option>
        })
        //console.log(option)
      return (
        <div>
          <Button type="primary" onClick={this.showDrawer}>
            新增
          </Button>
          <Drawer
            title="新增数据"
            width={300}
            placement="right"
            onClose={this.onClose}
            maskClosable={false}
            visible={this.state.visible}
            style={{
              height: 'calc(100% - 55px)',
              overflow: 'auto',
              paddingBottom: 53,
            }}
          >
            <Form hideRequiredMark >
                <Form.Item label="用户名" {...formItemLayout}>
                    {getFieldDecorator('name', {
                      rules: [{ required: true, message: '请输入用户名' }],
                    })(<Input placeholder="请输入用户名" />)}
                </Form.Item>
                <Form.Item label="密码" {...formItemLayout}>
                    {getFieldDecorator('password', {
                      rules: [{ required: true, message: '请输入密码' }],
                    })(<Input placeholder="请输入密码" />)}
                </Form.Item>
                <FormItem
                    {...formItemLayout}
                    label="权限"
                    hasFeedback
                    >
                    {getFieldDecorator('role', {
                        rules: [
                        { required: true, message: '请选择权限' },
                        ],
                    })(
                        <Select placeholder="请选择权限">
                            {option}
                        </Select>
                    )}
                </FormItem>
            </Form>
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                borderTop: '1px solid #e8e8e8',
                padding: '10px 16px',
                textAlign: 'right',
                left: 0,
                background: '#fff',
                borderRadius: '0 0 4px 4px',
              }}
            >
              <Button
                style={{
                  marginRight: 8,
                }}
                onClick={this.onClose}
              >
                取消
              </Button>
              <Button onClick={this.onClose} type="primary">保存</Button>
            </div>
          </Drawer>
        </div>
      );
    }
}
const UserBtn = Form.create()(UserBtnComponent);
export default UserBtn