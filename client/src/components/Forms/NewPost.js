import React, {Component} from 'react';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import './NewPost.css';

class NewPost extends Component {
    state = {
        controls: {
            title: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'title'
                },
                value: '',
                validation: {
                    required: true,
                    maxLength:40
                },
                valid:false,
                touched:false,
            },
            content: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'textarea',
                    placeholder: 'content'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid:false,
                touched:false,
            },
            account: {
                elementType: 'select',
                elementConfig: {
                   options:null
                },
            value: null,
            validation: {
                required: false
            },
            valid:true,
            touched:false
            }
        },
        accountsLoaded:false
    }

    componentDidMount() {
            if(!this.state.accountsLoaded) {
                const controls = {...this.state.controls}
                const options = this.props.accountSummary.map((account)=> {
                     return {value:account.id,displayValue:account.name}
                 })
                 controls.account.options = options;
                 controls.account.value = options[0].value;
                 this.setState({...this.state,controls:controls,accountsLoaded:true})
            }
    }

    checkValidity(value,rules) {

        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event,controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched:true
            }
        };
        this.setState({controls:updatedControls});
    }

    formSubmitHandler = (event) => {
        event.preventDefault();

     
        const title = this.state.controls.title.value;
        const content = this.state.controls.content.value;
        const accountId = this.state.controls.account.value;
        this.props.createPost(accountId,title,content);
    }


    render() {
        const formElementsArr = [];
        for (let key in this.state.controls) {
            formElementsArr.push({
                id:key,
                config:this.state.controls[key]
            });
        }

        const options = this.props.accountSummary.map((account)=> {
            return {value:account.id,displayValue:account.name}
        })

        return(
            <form onSubmit={this.formSubmitHandler}  className ="form new-post-form">
                <h1>NEW POST</h1>
                {formElementsArr.map( formEl => (
                    <Input
                    options={options}
                        accountsLoaded={this.state.accountLoaded}
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
                <Button>Post</Button>
            </form>
        );
    }
}



export default NewPost;

