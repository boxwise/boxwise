import React from "react";
import ProductButton from "../components/ProductButton";

const CategorySelector = () => {
  return (
    <div>
      <ProductButton icon="male" label="Man" />
      <ProductButton icon="female" label="Woman" />
      <ProductButton icon="male" label="Adult" />
      <ProductButton icon="child" label="Boy" />
      <ProductButton icon="child" label="Girl" />
      <ProductButton icon="child" label="Child" />
      <ProductButton icon="child" label="Baby" />
      <ProductButton icon="utensils" label="Food" />
      <ProductButton icon="shower" label="Hygiene" />
    </div>
  );
};

export default CategorySelector;
