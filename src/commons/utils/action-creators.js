export const asyncAction = (name, extras = []) => ({
  START: `${name}_START`,
  SUCCESS: `${name}_SUCCESS`,
  ERROR: `${name}_ERROR`,
  CONFIRM: `${name}_CONFIRM`,
  CANCEL: `${name}_CANCEL`,
  ...extras.reduce((prev, curr) => {
    const key = curr.toUpperCase();
    prev[key] = `${name}_${key}`;
    return prev;
  }, {})
});

export const [addAction, listAction, findAction, editAction, deleteAction] = [
  "ADD",
  "LIST",
  "FIND",
  "EDIT",
  "DELETE"
].map(type => entity => asyncAction(`${entity.toUpperCase()}_${type}`));
