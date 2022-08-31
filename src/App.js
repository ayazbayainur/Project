import './App.css';
import Nav from './Nav';
import Result from './FAQ';
import About from './About';
import Home from './Home';
import Process from './Process';
import {BrowserRouter as Router, Switch, Route, Routes}  from 'react-router-dom';


function App() {
  
  return (
      <Router> 
      <div className="App">
        <Nav />
        {/* <Switch> */}
        <Routes>
          <Route path="/home" exact element={<Home/>}/>
        <Route path = "/about" element = {<About></About>}/>
        <Route path = "/result" element = {<Result></Result>}/>
        <Route path = "/process" element = {<Process></Process>}/>
        </Routes>
        {/* </Switch> */}
      </div>
      </Router>
  );
}

export default App;
