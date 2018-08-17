/**
 * create by kengj
 * create on 2018-08-16
 * 必须传入 data columns save(row)
 */
import React from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Button  } from 'antd';
import {apiPostPromise} from '../../axios'
//data start
/**const data = [];

for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}**/
//data end

const FormItem = Form.Item;

/**
 * 当不想在组件树中通过逐层传递props或者state的方式来传递数据时，可以使用Context来实现跨层级的组件数据传递
 * 如果要Context发挥作用，需要用到两种组件
 * 一个是Context生产者(Provider)，通常是一个父节点
 * 一个是Context的消费者(Consumer)，通常是一个或者多个子节点
 * Context的使用基于生产者消费者模式
 */
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);


class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `Please Input ${title}!`,
                    }],
                    initialValue: record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}


class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        data:this.props.data, 
        editingKey: '' ,
        btnSize:"small"
    };
    this.findData(null)
  }

  isEditing = (record) => {//判断是否编辑
    //console.log('record',record)
    return record.key === this.state.editingKey;
  };

  edit(key) {//编辑事件
    //console.log('key',key)
    this.setState({ editingKey: key });
  }

  save(form, key) {//保存事件
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.props.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        let message  = this.props.save(item.key,row);
        apiPostPromise(message.url,message.json).then(value=>{
          const check = message.fn(value)
          if(check){
            this.setState({ data: newData, editingKey: '' });
            this.findData(null)
          }
        })
      } else {
        //newData.push(row);
        this.setState({ data: newData, editingKey: '' });
      }
    });
  }

  cancel = () => {//取消事件
    this.setState({ editingKey: '' });
  };

  findData(key){
    let message = this.props.findData(key)
    apiPostPromise(message.url,message.json).then(value=>{
      message.fn(value)
    })
  }

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const columns = this.props.columns.map((col) => {//设置单元格属性
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    columns.push({//增加操作列
        title: '操作',
        dataIndex: 'operation',
        width:150,
        render: (text, record) => {
          const editable = this.isEditing(record);
          return (
            <div>
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <Button 
                        type="primary"
                        size={this.state.btnSize}
                        onClick={() => this.save(form, record.key)}
                        style={{ marginRight: 8 }}
                      >
                        保存
                      </Button>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                    title="是否取消?"
                    cancelText="取消"
                    okText="确定"
                    onConfirm={() => this.cancel(record.key)}
                  >
                    <Button type="danger" size={this.state.btnSize}>取消</Button>
                  </Popconfirm>
                </span>
              ) : (
                <Button type="primary" size={this.state.btnSize} onClick={() => this.edit(record.key)}>编辑</Button>
              )}
            </div>
          );
        },
      });

    return (
      <Table
        components={components}
        bordered
        dataSource={this.props.data}
        columns={columns}
        rowClassName="editable-row"
      />
    );
  }
}

export default EditableTable