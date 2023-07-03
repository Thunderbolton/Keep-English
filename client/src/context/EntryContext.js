import { createContext, useReducer } from "react";

export const EntriesContext = createContext();

export const entriesReducer = (state, action) => {
    
        switch (action.type) {
          case 'set_entries':
            return {entries: action.payload};
          case 'create_entry':
            return {entries: [action.payload, ...state.entries]};
          case 'delete_entry':
            return {entries: state.entries.filter((entry) => entry._id !== action.payload._id)}; 
          case 'update_entry':
            return {entries: state.entries.map((entry) => entry._id === action.payload._id ? action.payload : entry)};   
          default:
            return state;
        }
}

export const EntriesContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, {
        entries: []
    })

    // console.log('Entries context state:', state)

    return ( 
        <EntriesContext.Provider value={{...state, dispatch}}>
            { children }
        </EntriesContext.Provider>
     );
}
 
export default EntriesContextProvider;