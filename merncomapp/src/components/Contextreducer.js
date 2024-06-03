import React, { createContext, useContext, useReducer } from 'react';

const CardContext = createContext();
const DispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { name: action.name, description: action.description }];

        case "REMOVE":
          
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;

        case "DROP":
            let emArr= [];
            return emArr;
              
        default:
            console.log("Error in Reducer");
            return state;
    }
};

export const Cardprovider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);

    return (
        <DispatchContext.Provider value={dispatch}>
            <CardContext.Provider value={state}>
                {children}
            </CardContext.Provider>
        </DispatchContext.Provider>
    );
};

export const useCard = () => useContext(CardContext);
export const useDispatchCard = () => useContext(DispatchContext);