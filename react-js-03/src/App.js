import React, { useState } from 'react';
import Counter from './components/Counter';
import ClassCounter from './components/ClassCounter';

function App() {
  const [value, setValue] = useState('Value Text');

  return (
    <div className="App">
      <h1>React Course</h1>
      <h2>{value}</h2>
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      ></input>
      <Counter />
      <ClassCounter />
    </div>
  );
}

export default App;
