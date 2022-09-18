import { createContext, useReducer } from "react";

export const EntriesContext = createContext();

export const entriesReducer = (state, action) => {
    {
        switch (action.type) {
          case 'set_entries':
            return {entries: action.payload};
          case 'create_entry':
            return {entries: [action.payload, ...state.entries]};
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