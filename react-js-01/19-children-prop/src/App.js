import './App.css';
import Wrapper from './components/Wrapper';

function App() {
  return (
    <div className="App">
      <Wrapper color="lightblue">
        <h2>Text inside of the Wrapper</h2>
        <button>Click me</button>
      </Wrapper>
      <Wrapper color="lightgreen">
        <h2>Another Text</h2>
        <p>Some description</p>
        <input type="text" placeholder="Enter value" />
      </Wrapper>
      <Wrapper color="lightgreen">
        <h2>Another Text-2</h2>
        <p>Some description-2</p>
        <input type="text" placeholder="Enter value-2" />
      </Wrapper>
    </div>
  );
}

export default App;
