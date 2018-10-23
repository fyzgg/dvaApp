import { Router, Route ,Switch } from 'dva/router';
import Users from './routes/Users';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <LocaleProvider locale={zhCN}>
        <Switch>
          <Route path="/users"  component={Users} />
        </Switch>
      </LocaleProvider>  
    </Router>
  );
};
export default RouterConfig;
