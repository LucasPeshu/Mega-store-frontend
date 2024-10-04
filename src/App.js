import AppRoutes from './hocs/routes/routes'; 
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Layout from './hocs/layout/Layout';

function App() {
  return (
    <Layout className='bg-gray-100 min-h-screen'>
      <Provider store={store}>
        <Router>
          <AppRoutes />
        </Router>
      </Provider>
    </Layout>
    
  );
}

export default App;
