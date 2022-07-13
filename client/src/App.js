import './App.css';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Landing from "./components/Landing";
import Home from './components/Home';
import VidyaDetail from './components/Detail';
import VidyaCreateForm from './components/Form';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
        <Route exact path="/" element={<Landing/>} />
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/home/:id" element={<VidyaDetail/>} />
        <Route exact path="/videogame_creation" element={<VidyaCreateForm/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
