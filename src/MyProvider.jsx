import {useState} from 'react';
import MyContext from './MyContext';

export function MyProvider({children}) {
     const [name, setName] = useState('Checho');

     return (
        <MyContext.Provider value={{name, setName}}>
            {children}  
        </MyContext.Provider>
     );
}