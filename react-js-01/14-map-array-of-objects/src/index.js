import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

var humanYearsCatYearsDogYears = function (humanYears) {
  let catYears;
  let dogYears;

  if (humanYears === 1) {
    catYears = 15;
    dogYears = 15;
  } else if (humanYears === 2) {
    catYears = 24;
    dogYears = 24;
  } else {
    catYears = (humanYears - 2) * 4 + 24;
    dogYears = (humanYears - 2) * 5 + 24;
  }

  return [humanYears, catYears, dogYears];
};
