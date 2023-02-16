export const createFunction = (items:any[], item:any) => [...items, item];

export const updateFunction = (items:any[], changeItem:any) => items.map(item => {
  return item.id === changeItem.id? Object.assign({},item, changeItem): item
});
export const deleteFunction = (items:any[], item:any)=> items.filter(oldItem =>
  oldItem.id !== item.id);
