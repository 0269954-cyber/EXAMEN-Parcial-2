import { useContext } from "react";
import MyContext from "./MyContext"; 

function Child() {
    const { name, setName } = useContext(MyContext);
    
    return (
        <div>
            <h1>Child Component</h1>
            <p>Name: {name}</p>
            <button onClick={() => setName('Sergio')}>Change Name</button>
        </div>
    );
}

export default Child;