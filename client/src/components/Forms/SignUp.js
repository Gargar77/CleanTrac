import React, {Component} from 'react';
import Input from '../UI/Input/Input';

import Button from '../UI/Button/Button';

class signUpForm extends Component {
    state = {
        orderForm: {
            firstName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'First Name',
                    name: 'user[first_name]'
                },
                value: '',
                validation: {
                    required: true
                },
                valid:false,
                touched:false,
            },
            lastName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Last Name',
                    name: 'user[last_name]'
                },
                value: '',
                validation: {
                    required: true
                },
                valid:false,
                touched:false,
            },
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'tel',
                    placeholder: 'Phone Number',
                    name: 'user[phone]'
                },
            value: '',
            validation: {
                required: true
            },
            valid:false,
            touched:false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter your Email',
                    name: 'user[email]'
                },
            value: '',
            validation: {
                required: true
            },
            valid:false,
            touched:false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password',
                    name: 'user[password]'
                },
            value: '',
            validation: {
                required: true
            },
            valid:false,
            touched:false
            },
            uniqueId: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'unique ID',
                    name:'uniqueId'
                },
            value: '',
            validation: {
                    required: true
                },
                valid:false,
                touched:false

            },
            role: {
                elementType: 'select',
                elementConfig: {
                   options:[
                       {value: 'owner', displayValue: 'Owner'},
                       {value: 'leader',displayValue: 'Leader'},
                       {value: 'cleaner',displayValue: 'Cleaner'}
                   ],
                   name: 'user[role]'
                },
            value: 'owner',
            validation: {
                required: false
            },
            valid:true,
            touched:false
            }
        },
        formIsValid:false 
    }

    checkValidity(value,rules) {
        let isValid = true;
        if (!rules) return true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength & isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event,inputIndex) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedFormElement = {
            ...updatedOrderForm[inputIndex]
        }
        let currentRole = this.state.currentRole;
     

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedOrderForm[inputIndex] = updatedFormElement;

        let formisValid = true;
        for (let inputIndex in updatedOrderForm) {
            formisValid = updatedOrderForm[inputIndex].valid && formisValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid:formisValid});
    }


    render() {
        const formElementsArr = [];
        for (let key in this.state.orderForm) {
            formElementsArr.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.props.submit} className ="form signup">
                {formElementsArr.map( formEl => (
                    <Input 
                        key={formEl.id}
                        invalid={!formEl.config.valid}
                        shouldValidate={formEl.config.validation}
                        touched={formEl.config.touched}
                        elementType={formEl.config.elementType}
                        elementConfig={formEl.config.elementConfig}
                        value={formEl.config.value}
                        changed={(event)=> this.inputChangedHandler(event,formEl.id)}
                    />

                ))}
                <Button disabled={!this.state.formIsValid}>Sign up</Button>
                
            
            </form>
        );

        

        return (
          <div className="sigup-container">
              <h4>Enter your contact info</h4>
              {form}
          </div>
        );
    }
}

export default signUpForm;