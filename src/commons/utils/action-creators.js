export const asyncAction = name => ({
  START: `${name}_START`,
  SUCCESS: `${name}_SUCCESS`,
  ERROR: `${name}_ERROR`,
  CONFIRM: `${name}_CONFIRM`,
  CANCEL: `${name}_CANCEL`
});

export const [addAction, listAction, findAction, editAction, deleteAction] = [
  "ADD",
  "LIST",
  "FIND",
  "EDIT",
  "DELETE"
].map(type => entity => asyncAction(`${entity.toUpperCase()}_${type}`));
