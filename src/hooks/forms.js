import { useState } from "react";

export const useForm = (callback, validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = validate(values);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = event => {
    if (event) event.preventDefault();
    if (validateForm()) {
      callback(values);
    }
  };

  const handleBlur = event => {
    if (errors[event.target.name] !== undefined) {
      validateForm();
    }
  };

  const handleChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));
  };

  const attachEvents = () => {
    return {
      onChange: handleChange,
      onBlur: handleBlur
    };
  };

  return {
    attachEvents,
    handleSubmit,
    errors
  };
};

export const useMaterialUIForm = (callback, validate) => {
  const { attachEvents, handleSubmit, errors } = useForm(callback, validate);
  const attachValidation = name => {
    // these are fields specific to MaterialUI that we
    // are attaching in order to trigger validation
    return {
      ...attachEvents(),
      helperText: errors[name],
      error: errors[name] !== undefined
    };
  };
  return { attachValidation, handleSubmit };
};
