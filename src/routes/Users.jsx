import React ,{ Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'dva';
//关联 Model：
/*
  本项目中 Users Container 的表现为 Route Components（这也是 dva 推荐的结构划分），
  可以理解页面维度的容器.采用自顶向上的设计方法；
 */
/*  Users的Presentational Component暂时都没实现*/
import UserList from '../components/Users/UserList';
//import UserSearch from '../components/Users/UserSearch';
import UserModal from '../components/Users/UserModal';
import { Button } from 'antd';

import styles from './Users.less';
/*  对象的扩展运算符（...）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。*/
function Users ({location,dispatch,users}) {//创建一个类Users, 接收一些参数，用于类自己使用，后面会通过connect将state联系给这些参数。
  const { loading,list,total,current,currenrItem,modalVisible,modalType } = users;
	const userSearchProps = {};
	const userListProps = {
    dataSource:list,
    total,
    loading,
    current
  };
  const createHandler = () =>{
    console.log(111)
  }
	const userModalProps = {
    record:{},
    onOk:{createHandler}
  };

	return (
		<div className={styles.normal}>
      {/* 添加用户 & 修改用户弹出的浮层 */}
      <UserModal {...userModalProps} >
        <Button type="primary">增加用户</Button>
      </UserModal>
			{/* 用户筛选搜索框 */}
			{ /*<UserSearch {...userSearchProps} />*/}
			{/* 用户信息展示列表 */}
			<UserList {...userListProps} />
		</div>
	)
}
Users.propTypes = {
  users:PropTypes.object
};

function mapStateToProps({users}){
  return {users};
}
export default connect(mapStateToProps)(Users);