import './App.css';
import Footer from './components/Footer.js';
import QRCodeGenerator from './components/QRCodeGenerator.js';

function App() {
  return (
    <div className="App">
        <QRCodeGenerator />
        <Footer />
    </div>
  );
}

export default App;
