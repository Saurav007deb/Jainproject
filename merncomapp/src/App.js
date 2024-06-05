import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import './App.css';
import Main from './screens/Main.js';

import {
  BrowserRouter as Router,
 
  Routes,
  Route,
  
} from "react-router-dom";
import Logging from './screens/Logging.js';
import Signup from './screens/Signup.js';
import { Cardprovider } from './components/Contextreducer.js';
import Myparticipation from './screens/Myparticipation.js';

function App() {
  return (
    <Cardprovider>
    <Router>

      <div>   
        <Routes>
          <Route exact path ="/" element = {<Main/>}/>
          <Route exact path ="/login" element = {<Logging/>}/>
          <Route exact path ="/createuser" element = {<Signup/>}/>
          <Route exact path ="/myParticipitation" element = {<Myparticipation/>}/>
          
        </Routes>

      </div>
    </Router>
    </Cardprovider>

  );
}

export default App;
