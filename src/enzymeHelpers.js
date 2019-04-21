export { mount, shallow } from "enzyme";

export const setInputFieldValue = (component, name, value) => {
  component.find(`input[name='${name}']`).simulate("change", {
    target: { name: `${name}`, value: `${value}` },
    persist: () => {}
  });
};
