import { useState } from 'react';
import './App.css';
import Counter from './components/Counter';
import Button from './components/Button';

function App() {
  const [count, setCount] = useState(0);
  const incrementCount = () => setCount(count + 1);
  const texts = [
    'Click me 1!',
    'Click me 2!',
    'Click me 3!',
    'Click me 4!',
    'Click me 5!',
  ];

  return (
    <div className="App">
      <Counter count={count} />
      {texts.map((text, index) => (
        <Button onClick={incrementCount} text={text} key={`key-${index}`} />
      ))}
    </div>
  );
}

export default App;
