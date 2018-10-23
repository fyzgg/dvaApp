/*  采用antd的UI组件*/
import React,{ Component } from 'react';
import {Table,Popconfirm} from 'antd';
import { connect } from 'dva';
import 'antd/dist/antd.css';
/*  采用stateless的写法*/
class UserList extends Component{
  pageChangeHandle = page => {
    this.props.dispatch({
      type:'users/fetch',
      payload:{page:page}
    })
  }
  deleteHandle = ({userId}) => {
    this.props.dispatch({
      type:'users/delete',
      payload:{userId}
    })
  }
  /**
    columns表格列的配置描述，具体项见下表.
    dataSource数据数组
    loading页面是否加载中
    rowKey表格行 key 的取值，可以是字符串或一个函数
    pagination分页器，参考配置项或 pagination，设为 false 时不展示和进行分页
  */
  render(){
    const { list:dataSource, total, loading, current } = this.props;

    const columns=[{
      title:'姓名',
      dataIndex:'name',
      key:'name',
      render:(text)=><a href="#">{text}</a>,
    },{
      title:'年龄',
      dataIndex:'age',
      key:'age',
    },{
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },{
      title: '操作',
      key: 'operation',
      render:(text,record)=>(
        <p>
          <a href="javascript:;" onClick={()=>{}}>编辑</a>
          <Popconfirm title="确定要删除吗?" 
            onConfirm={this.deleteHandle.bind(null,{userId:record.id})}>
            <a href="javascript:;">删除</a>
          </Popconfirm>
        </p>
      ),
    }];
    // 定义分页对象
    //onChange:页码改变的回调，参数是改变后的页码及每页条数
    const pagination = {
      total,
      current,
      pageSize: 10,
      onChange: this.pageChangeHandle,
    };
    return (
      <div>
        <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={record => record.id}
        pagination={pagination}
        />
      </div>
    );
  }

  
};
 function mapStateToProps(state) {
   const {list,total,current} = state.users;
   return {
    loading:state.users.loading,
    list,
    total:parseInt(total, 10),
    current
   }
 }
export default connect(mapStateToProps)(UserList);
