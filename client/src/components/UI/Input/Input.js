import React from 'react';
import './Input.css';

const input = (props) => {
    let inputEl = null;
    const inputClasses = [props.elementType];
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push("invalid");
    }

    switch(props.elementType) {
        case('input') : 
            inputEl = <input 
                onChange={props.changed}
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} />;
            break;
        case('textarea'):
            inputEl = <textarea 
                onChange={props.changed}
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} />;
             break;
        case('select'):
            inputEl = (  
                    <select
                        onChange={props.changed}
                        className={inputClasses.join(' ')}  
                        name={props.elementConfig.name}
                        value={props.value}>
                        {props.elementConfig.options ? props.elementConfig.options.map(option => (
                            <option value={option.value} key={option.value}>
                                {option.displayValue}
                            </option>
                        )) : props.options.map(option => (
                            <option value={option.value} key={option.value}>
                                {option.displayValue}
                            </option>
                        ))}
                    </select>
            );
            break;
        default:
            inputEl = <input 
                        onChange={props.changed}
                        className={inputClasses.join(' ')} 
                        {...props.elementConfig} 
                        value={props.value}  />;
    }

    return(
      <div className="form__input">
        {inputEl}
      </div>
    );
};

export default input;