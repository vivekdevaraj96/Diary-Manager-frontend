import './App.css';
import Diarymanager from './Components/Diarymanger';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';


function App() {
  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Diary Manager</Navbar.Brand>
          
        </Container>
      </Navbar>
      <div id="calendarcontent">
      <Diarymanager/>
    </div>
      
    </div>
  );
}

export default App;
