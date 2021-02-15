export const initialState = {
  theme: false,
  navbar: true,
  table_config: undefined,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LIGHT_MODE":
      return {
        ...state,
        theme: false,
      };
    case "DARK_MODE":
      return {
        ...state,
        theme: true,
      };
    case "NAVBAR":
      return {
        ...state,
        navbar: action.items.navbar,
      };
    case "TABLE_CONFIG":
      return {
        ...state,
        table_config: action.item.table_config,
      };
    default:
      return state;
  }
};

export default reducer;
