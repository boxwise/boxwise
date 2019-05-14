import React, {useState, useEffect } from "react";

export const useForm = (callback, initialValues) => {
  const [values, setValues] = useState(initialValues || {});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = event => {
    if (event) event.preventDefault();
    setIsSubmitting(true);
    Promise.resolve(callback(values)).
      then(setIsSubmitting(false));
  };

  const handleChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));
  };

  const attachToForm = (name) => {
    return {
      onChange: handleChange,
      value: values[name] || "",
    };
  };

  useEffect(() => {
    const resetFormWhenDefaultValuesChange = () => {
      setValues(initialValues || {});
      setIsSubmitting(false);
    };
    resetFormWhenDefaultValuesChange();
  }, [initialValues]);

  return {
    attachToForm,
    handleSubmit,
    values,
    isSubmitting
  };
};

const SignInForm = ({ userSignIn }) => {
  const { attachToForm, handleSubmit } = useForm(userSignIn);

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        name="password2"
        data-testid="password2"
        {...attachToForm("password2")}
      />
      <input 
        type="text"
        name="email"
        data-testid="email"
        {...attachToForm("email")}
      />
      <input type="submit" data-testid="signInButton" value="Sign in" />
    </form>
  );
};

export default SignInForm;
