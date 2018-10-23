import React, { Component } from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';

import MainLayout from '../components/MainLayout/MainLayout';

class App extends Component{

  render(){
    const { children, location } = this.props;
    return(
      <MainLayout location={location} >
        {children}
      </MainLayout>
    )
  }
}
App.propType = {}

export default withRouter(
  connect(({app,loading})=>({
    app,
    loading
  }))(App)
)