// src/App.tsx
import TodoList from './components/TodoList'; // <-- Panggil komponen yg sudah kita buat
import './App.css'; // (Opsional) Style bawaan

function App() {
  return (
    <div className="App">
      {/* Pasang komponen TodoList di sini */}
      <TodoList />
    </div>
  );
}

export default App;