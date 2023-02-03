import React, { Component} from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.scss';

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout/DefaultLayout'));

class App extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  
  render() {
    let routes = (
          <Switch>
            <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} />
          </Switch>
    );

    return (
      <div>
        <React.Suspense fallback={this.loading()}>
          <BrowserRouter>
              {routes}
          </BrowserRouter>
        </React.Suspense>
      </div>
    );
}
}

export default App;
