import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './App.css';
import Main from './screens/Main';

import {
  BrowserRouter as Router,
 
  Routes,
  Route,
  
} from "react-router-dom";
import Logging from './screens/Logging';
import Signup from './screens/Signup';
import { Cardprovider } from './components/Contextreducer';
import Myparticipation from './screens/Myparticipation';

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
