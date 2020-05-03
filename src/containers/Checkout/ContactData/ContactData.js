import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';

class ContactData extends Component{

    state = {
        orderFrom: {
            name: {
               elementType: 'input' ,
               elementConfig: {
                   type: 'text',
                   placeholder: 'Your Name'
               },
               value: '',
               validation: {
                   required: true
               },
               valid: false,
               touched: false
            },
            street: {
                elementType: 'input' ,
                elementConfig: {
                   type: 'text',
                   placeholder: 'Your Street'
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode:{
                elementType: 'input' ,
                elementConfig: {
                   type: 'text',
                   placeholder: 'Your Zip Code'
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            Country: {
                elementType: 'input' ,
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input' ,
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select' ,
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest'},
                        { value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: "fastest",
                valid: true,
                validation: {}
            }
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({
            loading: true
        })

        const formData = {};

        for(let formElementIdentifier in this.state.orderFrom){
            formData[formElementIdentifier] = this.state.orderFrom[formElementIdentifier].value;
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
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

    checkValidity(value, rules){
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }


        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updateOrderForm = {
            ...this.state.orderFrom
        }

        const updatedFormElement = {
            ...updateOrderForm[inputIdentifier] 
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched = true;
        updateOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updateOrderForm){
            formIsValid = updateOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({
            orderFrom: updateOrderForm,
            formIsValid: formIsValid
        })
    }

    render(){

        const formElementsArray = [];
        for (let key in this.state.orderFrom){
            formElementsArray.push({
                id: key,
                config: this.state.orderFrom[key]
            })
        }



        let form = (
            <form onSubmit={this.orderHandler}>
                    {formElementsArray.map(formElement => (
                        <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                    ))}
                    <Button btnType="Success" disabled={!this.state.formIsValid} >ORDER HERE!</Button>
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

const mapStateToProps = state => {
    return{
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);