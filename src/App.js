import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Route from 'react-router-dom';

class App extends Component {


  render() {
    return (
        <div>  
            <Layout>
              <BurgerBuilder />
            </Layout>
        </div>
    );
  }
}

export default App;
