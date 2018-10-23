import React,{ Component } from 'react';
import { Modal, Form, Input } from 'antd';

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
    if(e) e.stopPropagation();
    const { onOk, record:userId } = this.props;
    this.props.form.validataFields = (err, values) =>{
      if (!err) {
        onOk({ values,userId });
        this.hideModalHandler();
      }
    }
  }
  render(){
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { userName, age, website } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 }
    }
    return(
      <div>
        <span onClick={this.showModalHandler}>
          {children}
        </span>
        <Modal 
          title="用户信息"
          visible={this.state.visible}
          onOk={this.okHandler} 
          onCancel={this.hideModalHandler}
        >
          <Form layout="horizontal" onSubmit={this.okHandler}>
            <FormItem {...formItemLayout} label="姓名">
              {getFieldDecorator ('userName',{
                initialValue:userName,
                rule:[{required:true,message:'姓名不能为空！!'}]
              })(
                <Input placeholder='请输入姓名'/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="年龄">
              {getFieldDecorator ('age',{
                initialValue:age,
                rule:[{required:true,message:'年龄不能为空！!'}]
              })(
                <Input placeholder='请输入年龄'/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="地址">
              {getFieldDecorator ('website',{
                initialValue:website,
                rule:[{required:true,message:'地址不能为空！!'}]
              })(
                <Input placeholder='请输入地址'/>
              )}
            </FormItem>
          </Form>
        </Modal>  
      </div>
    )
  }
}

export default Form.create()(UserModal);