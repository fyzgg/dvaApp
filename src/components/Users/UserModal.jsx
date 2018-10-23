import React,{ Component } from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';

const FormItem = Form.Item;
class UserModal extends Component{
  constructor(props){
    super(props);
    this.state = { visible:false };
  }

  showModalHandler = e =>{
    if(e) e.stopPropagation();
    this.setState({visible: true});
  }
  hideModalHandler = e =>{
    if(e) e.stopPropagation();
    this.setState({visible: false});
  }

  okHandler = e =>{
    if(e) e.preventDefault();
    const { onOk, record:{ id } } = this.props;
    console.log(this.props)
    this.props.form.validateFieldsAndScroll((err, values) =>{
      console.log(values)
      if (!err) {
        onOk({ values,id });
        this.hideModalHandler();
      }
    });
  }
  render(){
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { name, age, address } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 }
    }
    return(
      <span onClick={this.showModalHandler}>
        {children}
        <Modal 
          title="用户信息"
          visible={this.state.visible}
          onOk={this.okHandler} 
          onCancel={this.hideModalHandler}
        >
          <Form layout="horizontal" onSubmit={this.okHandler}>
            <FormItem {...formItemLayout} label="姓名">
              {
                  getFieldDecorator('name',{
                    validateTrigger: ['onChange', 'onBlur'],
                    initialValue: name,
                    rules: [
                      { required : true, message: '姓名不能为空！' }
                    ]
                  })(<Input placeholder="请输入姓名！" />)
                }
            </FormItem>
            <FormItem {...formItemLayout} label="年龄">
              {
                getFieldDecorator('age',{
                initialValue:age,
                rules:[
                  {
                    type:'regexp',
                    pattern: new RegExp(/^(\d)(\d?)$/),
                    required:true,
                    max:2,
                    message: '请填写正确的年龄！'
                   }
                ]
              })(<Input placeholder='请输入年龄(如:18)' width="100%"/>)
            }
            </FormItem>
            <FormItem {...formItemLayout} label="地址">
              {getFieldDecorator('address',{
                initialValue:address,
                validateTrigger: ['onChange', 'onBlur'],
                rules:[{required:true,message:'地址不能为空！!'}]
              })(
                <Input placeholder='请输入地址'/>
              )}
            </FormItem>
          </Form>
        </Modal>  
      </span>
    )
  }
}

export default Form.create()(UserModal);