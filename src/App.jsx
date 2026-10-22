import { BrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout';
import { MyProvider } from './MyProvider'; 
import Child from './Child'; 

function App() {
  return (
    <MyProvider>
      <BrowserRouter>
        <Child /> 
        <Layout />
      </BrowserRouter>
    </MyProvider>
  );
}

export default App;