import React, { Component } from 'react';
import { Menu,Icon } from 'antd';

import { Link } from 'dva/router';


class Header extends Component{
  render(){
    const { location } = this.props;
    return(
      <Menu
        selectedKeys={[location.pathname]}
        mode="horizontal"
      >
        <Menu.Item key="/users">
          <Link to="/users">
            <Icon type="team" />用户管理
          </Link>  
        </Menu.Item>
        <Menu.Item key="/" >
          <Link to="/">
            <Icon type="home" />首页
          </Link> 
        </Menu.Item>
      </Menu>
    )
  }
}

export default Header;