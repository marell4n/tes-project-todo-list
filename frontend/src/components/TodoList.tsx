import React, { useEffect, useState } from 'react';
import type { TodoItem } from '../types/TodoItem';
import TodoService from '../services/TodoService';
import './TodoList.css'; // <-- JANGAN LUPA IMPORT CSS INI

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const [loading, setLoading] = useState(false);

  const loadTodos = async () => {
    setLoading(true);
    try {
      const data = await TodoService.getAll();
      setTodos(data);
    } catch (error) {
      console.error("Gagal memuat data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah reload halaman
    if (!newItemName.trim()) return;
    
    try {
      await TodoService.create({ 
        name: newItemName, 
        isComplete: false 
      });
      setNewItemName('');
      loadTodos();
    } catch (error) {
      alert("Gagal menambah task!");
    }
  };

  const handleDelete = async (id: number) => {
    if(!window.confirm("Yakin mau hapus?")) return;
    try {
      await TodoService.delete(id);
      loadTodos();
    } catch (error) {
      console.error("Gagal menghapus", error);
    }
  };

  const toggleStatus = async (item: TodoItem) => {
    try {
      // Logic update status (kalau API support update partial, bagus. Kalau tidak, kirim full object)
      await TodoService.update(item.id, { ...item, isComplete: !item.isComplete });
      loadTodos();
    } catch (error) {
      console.error("Gagal update status", error);
    }
  };

  return (
    <div className="todo-container">
      <div className="header">
        <h1>🚀 My Tasks</h1>
        <p>Kelola produktivitas harianmu</p>
      </div>
      
      <form onSubmit={handleAdd} className="input-group">
        <input 
          type="text" 
          value={newItemName} 
          onChange={(e) => setNewItemName(e.target.value)} 
          placeholder="Apa yang ingin dikerjakan hari ini?"
          autoFocus
        />
        <button type="submit" className="btn-add">Tambah</button>
      </form>

      {loading ? (
        <p style={{textAlign: 'center', color: '#64748b'}}>Sedang memuat data...</p>
      ) : (
        <ul className="todo-list">
          {todos.length === 0 && (
            <div style={{textAlign: 'center', color: '#94a3b8', marginTop: '20px'}}>
              Belum ada tugas. Yuk tambah satu! ✨
            </div>
          )}
          
          {todos.map((item) => (
            <li key={item.id} className={`todo-item ${item.isComplete ? 'completed' : ''}`}>
              <div className="todo-content" onClick={() => toggleStatus(item)} style={{cursor: 'pointer'}}>
                <div className="status-check">
                  {item.isComplete && "✓"}
                </div>
                <span>{item.name}</span>
              </div>
              
              <button 
                onClick={() => handleDelete(item.id)} 
                className="btn-delete"
                title="Hapus Tugas"
              >
                Hapus 🗑️
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;