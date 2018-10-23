/**
  业务维度：
  在数据跟业务状态紧密相连的场景下，将状态放到 model 里面维护会使得我们的代码更加清晰可控
  按照业务维度的 model 设计，则是将数据以及使用强关联数据的组件中的状态统一抽象成 model 的方法

  loading: false,     // 控制加载状态
    current: null,      // 当前分页信息
    currentItem: {},      // 当前操作的用户对象
    modalVisible: false,    // 弹出窗的显示状态
    modalType: 'create',    // 弹出窗的类型（添加用户，编辑用户）
  name(){}            //name: function(){},name的类型是个函数。即，users.currentItem()
  *name(){}               //前面的 * 号，表示这个方法是一个 Generator函数
  dva 中 reducer 的概念，主要是来源于下层封装的 redux，在 dva 中 reducers 主要负责修改 model 的数据（state）。
  如何根据新的数据来修改本身的 state，这就是 reducers 要做的事情。
*/
//import { hashHistory } from 'dva/router';
import * as usersService from '../services/users';
import { message } from 'antd';

export default {
  namespace:'users',
  state:{
    list:[],
    total:null,
    loading:false,
    current:null,
    currentItem:{},
    modalVisible:false,
    modalType:'create',
  },

  // Quick Start 已经介绍过 subscriptions 的概念,订阅路由，到了执行的路由执行相应的dispatch()
    subscriptions: {
      setup({ dispatch, history }) {
        history.listen(location => {
          if (location.pathname === '/users') {
            dispatch({
              type: 'fetch',
              payload: {}
            });
          }
        });
      },
    },
  effects:{
    *fetch({ payload:{page} },{ call,put }){
      yield put({ type:'showLoading' });
      const { data } = yield call(usersService.fetch,{page});
      if(data){
        yield put({
          type:'querySuccess',
          payload:{
            list:data.data,
            total:data.page.total,
            current:data.page.current
          }
        })
      }
    },
    *create(){},
    *delete({ payload:{userId} },{call,put}){
      const { data } = yield call(usersService.remove, {userId});
      if (data) {
        if (data.success) {
          yield message.success(data.message);
          yield put({
            type:'reload',
          })
        }else {
          yield message.error(data.message);
        }
        
      }
    },
    *update(){},
    *reload(action,{select,put}){
      const page = yield select(state => state.users.page);
      yield put({
        type:'fetch',
        payload:{page}
      })
    }
  },
  reducers:{
    showLoading(state,action){
      return { ...state,loading:true }
    },
    showModal(){},
    hideModal(){},
    //使用静态数据返回
    querySuccess(state,action){
      return {...state,...action.payload,loading:false};
    },
    createSuccess(){},
    deleteSuccess(state,action){
      return {...state,...action.payload};
    },
    updateSuccess(){},
  }

}
