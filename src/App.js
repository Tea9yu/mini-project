import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Login from './components/login/Login';
import Logout from './components/login/Logout';
import LoginForm from './components/login/LoginForm';
import RiotAPISearch from './components/search/RiotAPISearch';
import Main from './components/main/Main';
import { useState, useEffect } from 'react';

function App() {
  const [dt, setDt] = useState();

  const getData = async () => {
      fetch('http://10.125.121.170:8080/board')
          .then(response => response.json())
          .then(json => console.log(json))
          .catch(error => console.log(error));
  }

  useEffect(() => {
      console.log('useeffect');
      getData();
  });

return (
  <div>
    test
  </div>
)
  // return (
//     <div className="App">
// <header className="App-header">
//   <img src={logo} className="App-logo" alt="logo" />
//   <p>
//     Edit <code>src/App.js</code> and save to reload.
//   </p>
//   <a
//     className="App-link"
//     href="https://reactjs.org"
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     Learn React
//   </a>
// </header>
// </div>
    // <BrowserRouter>
    //   <RecoilRoot>
    //     <div>
    //       <div>
    //         {/* <Nav /> */}
    //       </div>
    //     </div>
    //       <Routes>
    //         <Route path='/' element={<Main />} />
    //         <Route path='/search' element={<RiotAPISearch />} />
    //         <Route path='/login' element={<Login />} />
    //         <Route path='/loginform' element={<LoginForm />} />
    //         <Route path='/logout' element={<Logout />} />
    //       </Routes>
    //   </RecoilRoot>
    // </BrowserRouter>

  // );
}

export default App;

