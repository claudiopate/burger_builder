import React, {Component} from 'react';
import Aux from '../Aux';
import clases from './Layou.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

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
                    <Toolbar 
                        drawerToggleClick={this.sideDrawerToggleHandler}
                        isAuth={this.props.isAuthenticated}
                    />
                    <SideDrawer 
                        open={this.state.showSideDrawer} 
                        closed={this.sideDrawerCloseHandler}
                        isAuth={this.props.isAuthenticated}
                    />
                    <main className={clases.Content}>
                        {this.props.children}
                    </main>

                </Aux>
        )
    }
};

const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);