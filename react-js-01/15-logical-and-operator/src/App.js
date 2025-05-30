import { useState } from 'react';
import './App.css';
import Counter from './components/Counter';
import Button from './components/Button';
import Reset from './components/Reset';

function App() {
  const [count, setCount] = useState(0);
  const incrementCount = () => setCount(count + 1);
  const resetCount = () => setCount(0);

  // const buttonStyle = { backgroundColor: count ? 'red' : 'lightgreen' };
  const buttonStyle = { backgroundColor: 'lightgreen' };

  return (
    <div className="App">
      <Counter count={count} />
      <Button onClick={incrementCount} />
      <Button onClick={incrementCount} />
      <Button onClick={incrementCount} />
      <Button onClick={incrementCount} />
      {!!count && <Reset onClick={resetCount} style={buttonStyle} />}
    </div>
  );
}

export default App;
