import React from "react";

import { AppFrame, Page } from "modules/layout/components";

import CategoryList from "../components/CategoryListContainer";

const CategoriesPage = () => {
  return (
    <AppFrame title="Manage categories">
      <Page>
        <CategoryList />
      </Page>
    </AppFrame>
  );
};

export default CategoriesPage;
