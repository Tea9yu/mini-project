import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Login from './components/login/Login';
import Logout from './components/login/Logout';
import LoginForm from './components/login/LoginForm';
import RiotAPISearch from './components/search/RiotAPISearch';
import Main2 from './components/main/Main2';
import BoardList2 from './components/board/BoardList2';
// import BoardView from './components/board/BoardView';
import BoardWrite from './components/board/BoardWrite';
import { useState, useEffect } from 'react'; 
import Nav from './UI/Nav';
import BoardDetail from './components/board/BoardDetail';
import Home from './components/main/Home';
import BusanFoodInfo from './components/search/BusanFoodInfo';


function App() {
  const [dt, setDt] = useState();

  

return (
 <BrowserRouter>
      <RecoilRoot>
        <div>
          <div>
            <Nav />
          </div>
        </div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/food' element={<BusanFoodInfo />} />
            <Route path='/list' element={<BoardList2 />} />            
            <Route path='/view/:seq' element={<BoardDetail />} />
            <Route path='/write' element={<BoardWrite />} />            
          </Routes>
      </RecoilRoot>
    </BrowserRouter>

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

