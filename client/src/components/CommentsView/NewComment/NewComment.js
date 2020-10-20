import React, {Component} from 'react';
import './NewComment.css';
import {connect} from 'react-redux';

import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';

class NewComment extends Component {

    state = {
        controls: {
            comment: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'textarea',
                    placeholder: 'Enter comment',
                    name:'comment[content]'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail:false
                },
                valid:false,
                touched:false,
            }
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

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.max.length && isValid
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

        const comment = this.state.controls.comment.value;
        const authToken = this.props.token
        // send comment to rails
        fetch('/api/comments/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'content-type':'application/json',
                    'Authorization' : 'Bearer ' + authToken
                },
                body: JSON.stringify({
                    comment: {
                        content: comment,
                        post_id: this.props.postId
                    }
                })
            })
            .then(res => res.json())
            .then (id => this.props.createComment(comment,id))
        //send new comment to post
    }

    render() {

        const formElementsArr = [];
        for (let key in this.state.controls) {
            formElementsArr.push({
                id:key,
                config:this.state.controls[key]
            });
        }

        return(
            <div id="#new-comment" className="comment-container">
                <form className="form"onSubmit={this.formSubmitHandler}>
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
                        <Button>post</Button>
                </form>
           
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        userId: state.user.userId,
        token: state.auth.token,
        userName:state.user.firstName
    }
}

export default connect(mapStateToProps)(NewComment);