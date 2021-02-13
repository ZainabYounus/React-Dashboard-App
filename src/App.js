import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Bootstrap from './components/Bootstrap';
import FetchData from './components/FetchData';
import Charts from './components/Charts';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      {/* <Bootstrap/> */}
      {/* <FetchData/> */}
      {/* <Charts/> */}
      <Dashboard/>
    </div>
  );
}

export default App;
