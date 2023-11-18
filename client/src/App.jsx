import './App.css';
import {BrowserRouter , Routes , Route} from "react-router-dom"

// Manual import-----------
import Loginpage from './pages/login';
import Signup from './pages/signup';
import Player from './pages/player';
import Moviepage from './pages/movies';
import Tvshows from './pages/tvshows';
import Netflix from './pages/netflix';
import Userliked from './pages/userLiked';



function App() {

  
  return (
    
    <BrowserRouter>
    <Routes>
      <Route path= "/" element={<Netflix/>} /> 
      <Route path= "/login" element={<Loginpage/>} /> 
      <Route path= "/signup" element={<Signup/>} /> 
      <Route path= "/player" element={<Player/>} /> 
      <Route path= "/movies" element={<Moviepage/>} /> 
      <Route path= "/Tv" element={<Tvshows/>} /> 
      <Route path= "/mylist" element={<Userliked/>} /> 
    </Routes> 
    
    
   
    </BrowserRouter>
    
  );
}

export default App;
