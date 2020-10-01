import React, {Component} from 'react';
import Input from '../UI/Input/Input';
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
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                    name: 'user[street]'
                },
                value: '',
                validation: {
                    required: true
                },
                valid:false,
                touched:false
    
            },
            state: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'State',
                    name: 'user[state]'
                },
                value: '',
                validation: {
                    required: true
                },
                valid:false,
                touched:false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Zip Code',
                    name: 'user[zip_code]'
                },
            value: '',
            validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid:false,
                touched:false
    
            },
    
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                    name: 'user[country]'
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
                    placeholder: '',
                    name: 'user[password]'
                },
            value: '',
            validation: {
                required: true
            },
            valid:false,
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
                    <button type="submit" className="button">Login</button>

            
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