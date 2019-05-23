import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

import { useMaterialUIForm } from "hooks/forms";
import FormErrorText from "components/FormErrorText";
import TextField from "components/TextField";
import SubmitButton from "components/SubmitButton";
import Progress from "components/Progress";
import { AppFrame, Page } from "modules/layout/components";

const CategoryPage = ({
  categoryToEdit,
  getAllCategories,
  onSubmit,
  serverErrorMessage
}) => {
  const handleValidation = values => {
    const errors = {};
    if (!values.name) {
      errors.name = "Enter a name.";
    }
    return errors;
  };

  useEffect(() => {
    // TODO: instead of loading every time this page loads, we should find a way to
    // subscribe to categories in firebase and keep them locally
    if (getAllCategories) getAllCategories();
  }, [getAllCategories]);

  const {
    attachValidation,
    handleSubmit,
    isSubmitting,
    hasSubmittedSuccess
  } = useMaterialUIForm(
    onSubmit,
    handleValidation,
    categoryToEdit && categoryToEdit.data
  );
  if (hasSubmittedSuccess)
    return (
      <Redirect
        to={{
          pathname: "/categories",
          state: { message: "Category saved" }
        }}
      />
    );

  return (
    <AppFrame
      showCloseButton
      title={categoryToEdit ? "Edit Category" : "Add Category"}
    >
      <Page>
        {categoryToEdit && !categoryToEdit.data ? (
          <Progress />
        ) : (
          <form onSubmit={handleSubmit} data-testid="categoryDialog">
            <FormErrorText message={serverErrorMessage} />
            <TextField
              label="Name"
              name="name"
              helperText="Enter a name, like “Clothing” or “Food”."
              dataTestId="categoryName"
              {...attachValidation("name")}
            />
            <SubmitButton
              isSubmitting={isSubmitting}
              dataTestId="submitCategory"
            >
              {categoryToEdit ? "Save Category" : "Add Category"}
            </SubmitButton>
          </form>
        )}
      </Page>
    </AppFrame>
  );
};

export default CategoryPage;
