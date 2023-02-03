import React, { Component } from "react";

const AppHeader = React.lazy(() => import("./AppHeader/AppHeader"));
const MainContent = React.lazy(() => import("./MainContent/MainContent"));

class DefaultLayout extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="app-body">
          <AppHeader />
          <MainContent {...this.props} />
        </div>
      </React.Fragment>
    );
  }
}

export default DefaultLayout;
