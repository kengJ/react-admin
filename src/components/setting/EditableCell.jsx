import React from 'react';
import { Table, Input, InputNumber, Popconfirm, Form } from 'antd';

const FormItem = Form.Item;
const EditableContext = React.createContext();

class EditableCell extends React.Component{
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
                          message: `请输入 ${title}!`,
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