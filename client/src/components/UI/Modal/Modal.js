import React from 'react';
import './Modal.css';

import Aux from '../../../hoc/Auxillary';

const modal = props => {
    let status;
    if (props.active) {
        status = "active"
    } else {
        status = "inactive"
    }

    return(
        <Aux>
            <div onClick={props.toggle} className={"backdrop bd-" + status}></div>
             <div className={"modal md-" + status}>
                {props.children}
            </div>
        </Aux>
    );
}

export default modal;
