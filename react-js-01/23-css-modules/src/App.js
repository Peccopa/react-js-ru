import Info from './components/info';
import './App.css';

function App() {
  return (
    <div className="App">
      <Info />
      <div className="info">
        <h1>App component heading</h1>
        <button className="my-button">App component button</button>
        <h2>Header H2 App</h2>
      </div>
    </div>
  );
}

export default App;
