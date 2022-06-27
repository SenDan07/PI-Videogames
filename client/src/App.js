import './App.css';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Landing from "./components/Landing";
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>ダニエルのゲーム</h1>
        <Routes>
        <Route exact path="/" element={<Landing/>} />
        <Route exact path="/home" element={<Home/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
