import './App.css';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Landing from "./components/Landing";
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        </Routes>
        <h1>ダニエルのゲーム</h1>
      </div>
    </BrowserRouter>
  );
}

export default App;
