import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createWarranty } from '../actions';
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';

// Fix to get file input working with latest React
// https://github.com/erikras/redux-form/issues/3686

const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

const FileInput = ({ 
  input: { value: omitValue, onChange, onBlur, ...inputProps }, 
  meta: omitMeta, 
  ...props 
}) => {
  return (
    <input
      onChange={adaptFileEventToValue(onChange)}
      onBlur={adaptFileEventToValue(onBlur)}
      type="file"
      {...props.input}
      {...props}
    />
  );
};

class NewWarranty extends Component {
    onSubmit(values) {
        this.props.createWarranty(values);
        this.props.history.push("/");
    }    
    
    render() {
        const { handleSubmit } = this.props;

        return (
            <div>
                <Link to="/">Back</Link>

                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <div>
                        Add new warranty
                    </div>
                    <div>
                        <label>Name of the thing</label>
                        <div>
                            <Field
                                name="name"
                                component="input"
                                type="text"
                                placeholder="Name of your purchase"
                            />
                        </div>
                    </div>
                    <div>
                        <label>Receipt of purchase</label>
                        <div>
                            <Field
                                name="receipt"
                                component={FileInput}
                                type="file"
                                placeholder="Receipt of your purchase"
                            />
                        </div>
                    </div>
                    <div>
                        <label>Date of purchase</label>
                        <div>
                            <Field
                                name="purchase_date"
                                component="input"
                                type="date"
                                placeholder="When did you buy it"
                            />
                        </div>
                    </div>
                    <div>
                        <label>Warranty ends</label>
                        <div>
                            <Field
                                name="end_of_warranty"
                                component="input"
                                type="date"
                                placeholder="When does the warranty end"
                            />
                        </div>
                    </div>
                    <div>
                        <button type="submit">
                        Submit
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default reduxForm( {
    form: 'new warranty'
})(
    connect(null, { createWarranty }) (NewWarranty)
);