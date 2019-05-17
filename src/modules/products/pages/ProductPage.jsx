import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

import { useMaterialUIForm } from "hooks/forms";
import FormErrorText from "components/FormErrorText";
import SelectField from "components/SelectField";
import TextField from "components/TextField";
import SubmitButton from "components/SubmitButton";
import Progress from "components/Progress";
import { AppFrame, Page } from "modules/layout/components";

import { CATEGORIES } from "../categories";

const ProductPage = ({
  productToEdit,
  getAllProducts,
  onSubmit,
  serverErrorMessage
}) => {
  const handleValidation = values => {
    const errors = {};
    if (!values.category) {
      errors.category = "Select a category.";
    }
    if (!values.name) {
      errors.name = "Enter a name.";
    }
    return errors;
  };

  useEffect(() => {
    // TODO: instead of loading every time this page loads, we should find a way to
    // subscribe to products in firebase and keep them locally
    if (getAllProducts) getAllProducts();
  }, [getAllProducts]);

  const {
    attachValidation,
    handleSubmit,
    isSubmitting,
    hasSubmittedSuccess
  } = useMaterialUIForm(
    onSubmit,
    handleValidation,
    productToEdit && productToEdit.data
  );
  if (hasSubmittedSuccess)
    return (
      <Redirect
        to={{
          pathname: "/products",
          state: { message: "Product saved" }
        }}
      />
    );

  return (
    <AppFrame
      showCloseButton
      title={productToEdit ? "Edit Product" : "Add Product"}
    >
      <Page>
        {productToEdit && !productToEdit.data ? (
          <Progress />
        ) : (
          <form onSubmit={handleSubmit} data-testid="productDialog">
            <FormErrorText message={serverErrorMessage} />
            <SelectField
              label="Category"
              name="category"
              dataTestId="selectCategory"
              items={CATEGORIES}
              itemToText={item => item}
              itemToId={item => item}
              {...attachValidation("category")}
            />
            <TextField
              label="Name"
              name="name"
              helperText="Enter a name, like “T-Shirt” or “Socks”. Don’t reuse the category
              name here."
              dataTestId="productName"
              {...attachValidation("name")}
            />
            <SubmitButton
              isSubmitting={isSubmitting}
              dataTestId="submitProduct"
            >
              {productToEdit ? "Save Product" : "Add Product"}
            </SubmitButton>
          </form>
        )}
      </Page>
    </AppFrame>
  );
};

export default ProductPage;
