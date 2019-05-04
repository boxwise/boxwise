import { useState, useEffect } from "react";

export const useForm = (callback, validate, initialValues) => {
  const [values, setValues] = useState(initialValues || {});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const errors = validate(values);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = event => {
    if (event) event.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      callback(values);
      setIsSubmitting(false);
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

  useEffect(() => {
    const resetFormWhenDefaultValuesChange = () => {
      setValues(initialValues || {});
      setErrors({});
      setIsSubmitting(false);
    };
    resetFormWhenDefaultValuesChange();
  }, [initialValues]);

  return {
    attachEvents,
    handleSubmit,
    errors,
    values,
    isSubmitting
  };
};

export const useMaterialUIForm = (callback, validate, initialValues) => {
  const { attachEvents, handleSubmit, errors, values, isSubmitting } = useForm(
    callback,
    validate,
    initialValues
  );
  const attachValidation = name => {
    // these are fields specific to MaterialUI that we
    // are attaching in order to trigger validation
    return {
      ...attachEvents(),
      value: values[name] || "",
      helperText: errors[name],
      error: errors[name] !== undefined
    };
  };
  return { attachValidation, handleSubmit, isSubmitting };
};
