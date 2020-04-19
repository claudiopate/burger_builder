import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component{

    state = {
        name:'',
        email: '',
        address: {
            stree: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({
            loading: true
        })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Cla Pate',
                address: {
                    street: "Test",
                    zipCode: "13221",
                    Country: "Italy"
                },
                email: "test@test.it"
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false
                })
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({
                    loading: false
                })
            });
    }

    render(){

        let form = (
            <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name"></input>
                    <input className={classes.Input} type="text" name="email" placeholder="Your Email"></input>
                    <input className={classes.Input} type="text" name="street" placeholder="Your Street"></input>
                    <input className={classes.Input} type="text" name="postalCode" placeholder="Your Postal Code"></input>
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER HERE!</Button>
                </form>
        );
        if(this.state.loading){
            form = <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;