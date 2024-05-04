const App = () => {
  let btnText = 'Click me please!';
  const onBtnClick = () => {
    btnText = 'Hello from React!';
    console.log(btnText);
  };

  return (
    <div className="app">
      <button onClick={onBtnClick}>{btnText}</button>
    </div>
  );
};

const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);
root.render(<App />);
