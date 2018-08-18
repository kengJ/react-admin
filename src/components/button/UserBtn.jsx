/**
 * create by kengj
 * create on 2018-08-16
 */
import React from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker ,Radio} from 'antd';
import {apiPostPromise} from '../../axios'

const { Option } = Select;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class UserBtnComponent extends React.Component{
    state = { 
        visible:false,
        roles: []
    };
    constructor(props){
        super(props);
        let roles = []
        new Promise((reslove, reject)=>{
          apiPostPromise('/Role/ReactFindAll').then(value=>{
            value.map(item=>{
                roles.push({label:item.memo,value:item.id})
            })
            reslove(roles)
          })
        }).then(value=>{
          this.setState({roles:value})
        })
    }

    showDrawer = () => {
      this.setState({
        visible: true,
      });
    };
  
    onClose = () => {
      this.setState({
        visible: false,
      });
    };
  
    render() {
      const { getFieldDecorator } = this.props.form;
      const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
      };
      return (
        <div>
          <Button type="primary" onClick={this.showDrawer}>
            新增
          </Button>
          <Button type="primary" style={{backgroundColor:'green',borderColor:'green'}}>
            变更权限
          </Button>
          <Drawer
            title="新增数据"
            width={350}
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
                    >
                    {getFieldDecorator('role', {
                        rules: [
                        { required: true, message: '请选择权限' },
                        ],
                    })(
                      <RadioGroup 
                        options={this.state.roles} />
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