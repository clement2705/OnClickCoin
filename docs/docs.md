# OnClickCoin documentation

## Overall work flow of the app

As specified in ~/package.json, the application launches by running "npm start" in the terminal, which will call server/server.js
The entry point to the app is ~/app/app.jsx, as specified in webpack.config.js. Webpack bundles the whole project together according to webpack.config.js and creates the /dist folder with many files including /dist/index.html, which will be the file rendered on the client. index.html has access to bundle.js, which defines what is being rendered. bundle.js is created by webpack and is a "summary" of the app.

### File structure

> **app**:  
> _front-end of the application_
>
> > **components**:
>
> > **containers**:  
> > _Containers are very similar to components, the only difference is that containers are aware of application state. If part of your webpage is only used for displaying data (dumb) then make it a component._
>
> > **images**:  
> > _where we put the front-end-related images_
>
> > **models**:  
> > _defines the mongoose Schemas - the shape of the documents for each specific collection_
>
> > **redux**:
> >
> > > **actions**:
> > > _where the actions are defined_
> >
> > > **reducers**:
> > > _defines how to update the store based on the dispatched actions_
> >
> > > **selectors**:
> > > _defines functions that allow us to access the store states_
> >
> > > **store**:
> > > _defines the initialisation of the store_
>
> > **utils**:
> > _where we put many helper functions used by the front-end_
>
> > **app.jsx**:
> > _the entry point to the front-end part of the app_
>
> > **index.html**:
> > _the file being rendered to the client (not exactly true - webpack uses this file as a template, and will create a index.html file in the dist folder that will be rendered to the client_ > > &nbsp;

&nbsp;

> **contracts**:  
> _where most of the code related to smart contracts is located_ > &nbsp;

&nbsp;

> **dist**  
> _built by webpack, check out webpack documentation for more info_ > &nbsp;

&nbsp;

> **node_modules**  
> _where all the packages are located, use Node Packet Manager to add/remove/upgrade packages_ > &nbsp;

&nbsp;

> **server**
>
> > **api** > > _defines the api of our application. As a convention, all the requests should be of the form /api/X_
>
> > **config** > > _sets up express configurations _
>
> > **middleware** > > _sets up the middlewares our app will use with express_
>
> > **server.js** > > _the entry point to the backend of the app, called by `npm start`, as defined in package.json_ > > &nbsp;

> **.env**  
> _holds the Environment variables (private key, address and infura api token to be used to deploy contracts in case the client does not have a web3 provider installed (e.g. metamask)). To stay safe of potential accidents, do not hold any mainnet tokens on this account. While this folder is in .gitignore and changes made to it will not be uploaded, we advise you to use the already compromised account, or for you to create a new account specifically for the development of this app to prevent potential losses_ > &nbsp;

&nbsp;

> **.env.default**  
> _holds default environment variables to be used if .env folder doesn't exist or a value can't be found in .env. The .env.default values are overwritten by those in .env **this file is not in .gitignore, so any value you put in here will be public. It is good to fill in this file with mock account credentials so that the project can be run by someone pulling the project without requiring them to fill in the .env file first**_ > &nbsp;

> **.eslintrc.js**  
> _holds the configurations with which eslint should be run with. Use "npm run lint" to call eslint_ > &nbsp;

&nbsp;

> **nodemon.json**  
> _nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when files change. nodemon.json holds the (non-default) configurations for nodemon. We specify to ignore the app folder, as changes made to the app folder will cause the server to restart, however changes in the app folder are not reflected on the webpage directly. Instead, webpack watches for changes in the app folder and, when some occur, will automatically rebuild/rebundle the app. Those changes will be incorporated in the /dist folder. Once the build is completed, nodemon will capture the changes in the dist folder and restart the server_ > &nbsp;

&nbsp;

> **package.json**  
> _package.json is a central repository of configuration for all tools used within the project_
>
> > **dependencies:**  
> > _specifies the packages, and versions of, the app is using. Calling "npm install" will install all dependencies specified in package.json_
>
> > **scripts:**  
> > _defines how to interact with the project via the terminal_
> >
> > ```
> > npm run something
> > ```
> >
> > _will execute the script "something" specified in the scripts part_ > > &nbsp;

&nbsp;

> **webpack.config.json**  
> _configuration file for webpack, which bundles (most) of the app into the single ~/dist/bundle.js file._

## API of our app

### GET/POST Requests

- post(/transfer-token)  
  _requests body with {netname, receiveAmount, sendAddr, contractAddr}_  
  _responds with res.end("transaction confirmed")_

- post(/deploy-contract)  
  _request body with {netname, name, symbols, decimals, supply}_  
  _responds with netname, contractAddress, and account's address_

### Document element IDs

- Deploy Contract Form  
  {symbol, name, supply, decimals}

- TransactionButton (Send Form)  
  {contract, to, amount}

## Database used

We are using the mongoose version of MongoDB, and the database is saved on the MongoLAB Cloud. For development purposes, the endpoint is, as defined in .env.default,

```script
mongodb+srv://compromisedUserName:compromisedPassword@mongotest-brllv.mongodb.net/test?retryWrites=true&w=majority
```

In production, use another client to access the database. It can be overwritten by specifying a value in .env file (not public as in .gitignore). The Schemas for the collections are defined in api/models/.
To add, delete or get information, make get/post requests to the server, as defined in server.js.

## Redux

Redux is a small library with an API designed to be a predictable container for application state. In our application, we use Redux to store many variables such as the current username of the client.
The store is accessible throughout the whole app and is first called in app/app.jsx

```js
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
```

Mainly, it is comprised of actions and reducers to update the state of the app.

To use it in a React component:

```javascript
// ~/app/components/Header/Navigationbar.jsx
import logout from '../../redux/actions/logout';
import { connect } from 'react-redux';
import { getUser } from '../../redux/selectors/selectors';

function mapStateToProps(state) {
  const user = getUser(state);
  // component receives additionally:
  return { user };
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

class Navigationbar extends React.Component {
  logout() {
    const res = axios.get('/api/logout');
    history.push(res);
    this.props.logout();
  }

  render() {
    return (
      <button onclick="logout">
        {this.props.user.username}
      <div/>
    )}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navigationbar);
```

When the button is clicked, it will call the logout function which will call this.props.logout, this last function will dispatch the LOGOUT action as defined in /app/redux/actions/logout

The redux middleware will see that an action has been dispatched and update the store according to the redux reducers.

```js
// ~/app/redux/reducers/user.js
import { LOGIN, LOGOUT } from '../actions/actionTypes';

const initialState = {
  username: 'anonymous',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      console.log('reducing LOGIN action');
      const { username } = action.payload;
      return { ...state, username };
    }
    case LOGOUT: {
      console.log('reducing LOGOUT action');
      return {
        ...state,
        username: initialState,
      };
    }
    default:
      return { ...state };
  }
}
```
