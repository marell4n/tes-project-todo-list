import api from './api';
import type { TodoItem } from '../types/TodoItem';

const TodoService = {
  // GET: api/TodoItems
  getAll: async () => {
    const response = await api.get<TodoItem[]>('/TodoItems');
    return response.data;
  },

  // GET: api/TodoItems/{id}
  getById: async (id: number) => {
    const response = await api.get<TodoItem>(`/TodoItems/${id}`);
    return response.data;
  },

  // POST: api/TodoItems
  // Menggunakan Omit<TodoItem, 'id'> karena ID dibuat di backend
  create: async (data: Omit<TodoItem, 'id'>) => {
    const response = await api.post<TodoItem>('/TodoItems', data);
    return response.data;
  },

  // PUT: api/TodoItems/{id}
  update: async (id: number, data: TodoItem) => {
    // Controller Anda mengecek (id != todoDTO.Id), jadi kirim full object
    const response = await api.put(`/TodoItems/${id}`, data);
    return response.data;
  },

  // DELETE: api/TodoItems/{id}
  delete: async (id: number) => {
    await api.delete(`/TodoItems/${id}`);
  }
};

export default TodoService;