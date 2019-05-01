import { useState } from "react";

export const useForm = (callback, validate, defaultValues) => {
  const [values, setValues] = useState(defaultValues || {});
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
    errors,
    values
  };
};

export const useMaterialUIForm = (callback, validate, defaultValues) => {
  const { attachEvents, handleSubmit, errors, values } = useForm(
    callback,
    validate,
    defaultValues
  );
  const attachValidation = name => {
    // these are fields specific to MaterialUI that we
    // are attaching in order to trigger validation
    return {
      ...attachEvents(),
      helperText: errors[name],
      error: errors[name] !== undefined
    };
  };
  return { attachValidation, handleSubmit, values };
};
