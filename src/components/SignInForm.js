import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import ButtonWithProgress from "./ButtonWithProgress";
import useForm from "react-hook-form";

const styles = theme => ({
  submit: {
    marginTop: theme.spacing.unit * 2
  }
});

const SignInForm = ({ classes, serverError, loading, userSignIn }) => {
  const { register, handleSubmit, errors } = useForm();
  return (
    <form onSubmit={handleSubmit(userSignIn)}>
      {serverError ? (
        <FormHelperText error={true} variant="body1">
          {serverError.message}
        </FormHelperText>
      ) : null}
      <TextField
        id="email"
        type="email"
        label="Email address"
        name="email"
        autoComplete="email"
        helperText={errors.email && "Please enter your email address"}
        error={errors.email}
        inputRef={register({ required: true })}
        fullWidth
        margin="normal"
      />
      <TextField
        id="password"
        type="password"
        label="Password"
        name="password"
        helperText={errors.password && "Please enter your password"}
        error={errors.password}
        inputRef={register({ required: true })}
        fullWidth
        margin="normal"
      />
      <ButtonWithProgress
        variant="raised"
        color="primary"
        type="submit"
        loading={loading || false}
        className={classes.submit}
      >
        Sign In
      </ButtonWithProgress>
    </form>
  );
};

export default withStyles(styles)(SignInForm);
