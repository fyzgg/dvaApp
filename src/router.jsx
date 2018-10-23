import { Router, Route ,Switch } from 'dva/router';
import Users from './routes/Users';
import Index from './routes/IndexPage';

import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

import App from './routes/App';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <LocaleProvider locale={zhCN}>
        <App>
          <Switch>
            <Route path="/users"  component={Users} />
            <Route path="/"  component={Index} />
          </Switch>
        </App>  
      </LocaleProvider>  
    </Router>
  );
};
export default RouterConfig;
