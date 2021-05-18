/*
  This is the main react file which runs the TodoApp function
*/
import React from "react";
import TodoApp from "./component/index";

const App = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundImage:
          "linear-gradient(to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%)",
        minHeight: "100vh",
      }}
    >
      <TodoApp />
    </div>
  );
};

export default App;












// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;