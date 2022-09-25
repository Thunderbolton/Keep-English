import { createContext, useReducer } from "react";

export const EntriesContext = createContext();

export const entriesReducer = (state, action) => {
    {
        switch (action.type) {
          case 'set_entries':
            return {entries: action.payload};
          case 'create_entry':
            return {entries: [action.payload, ...state.entries]};
          case 'delete_entry':
            return {entries: state.entries.filter((entry) => entry._id !== action.payload._id)}; 
          default:
            return state;
        }
      }
}

export const EntriesContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, {
        entries: []
    })

    return ( 
        <EntriesContext.Provider value={{...state, dispatch}}>
            { children }
        </EntriesContext.Provider>
     );
}
 
export default EntriesContextProvider;