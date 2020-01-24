import React from 'react';

export default props => {
    const errors = props.errors;
    return (
        <React.Fragment>
            {(errors.length > 0) &&
            <div>
                <h2 className="validation--errors--label">Validation errors</h2>
                <div className="validation-errors">
                    <ul>
                        {errors.map((err, index) => (<li key={index}>{err}</li>))}
                    </ul>
                </div>
            </div>}
        </React.Fragment>
    )
}