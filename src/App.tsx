import { Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Link to='/count'>
        <h1>count</h1>
      </Link>
    </div>
  );
}

export default App;
