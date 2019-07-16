import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { render } from 'react-dom';
import Home from './containers/HomePage/Home';
import ContractReceipt from './containers/ReceiptPage/ContractReceipt';
import Send from './containers/SendPage/Send';
import Info from './containers/InfoPage/Info';
import ICO from './containers/CrowdsalePage/ICO';
import Data from './containers/DataPage/Data';
import Login from './containers/LoginPage/Login';

const App = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/receipt" component={ContractReceipt} />
        <Route exact path="/send" component={Send} />
        <Route exact path="/info" component={Info} />
        <Route exact path="/ico" component={ICO} />
        <Route exact path="/data" component={Data} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </div>
  </BrowserRouter>
);

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
