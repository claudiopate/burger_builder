import React, {Component} from 'react';
import Aux from '../Aux/Aux';
import clases from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: true
    }

    sideDrawerCloseHandler = () => {
        this.setState({
            showSideDrawer: false
        });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer };
        });
    }

    render (){
        return(
                <Aux>
                    <Toolbar drawerToggleClick={this.sideDrawerToggleHandler}/>
                    <SideDrawer 
                        open={this.state.showSideDrawer} 
                        closed={this.sideDrawerCloseHandler}/>
                    <main className={clases.Content}>
                        {this.props.children}
                    </main>

                </Aux>
        )
    }
};


export default Layout;