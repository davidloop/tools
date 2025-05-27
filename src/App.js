import Header from './components/header/Header';
import { BrowserRouter as Router } from 'react-router-dom';
import PageRouter from './helpers/PageRouter.jsx';
import NavigationMain from './components/navigation/NavigationMain.jsx';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <nav>
          <NavigationMain />
        </nav>
        <main>
          <PageRouter />
        </main>
      </Router>
    </div>
  );
}

export default App;
