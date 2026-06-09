const API_URL = 'http://localhost:8080/api/categorias';

export const CategoriaService = {

  async getAll() {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return await response.json();
  },


  async create(categoria: { name: string, description: string }) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categoria)
    });
    if (response.status === 403 || response.status === 401) {
      throw new Error('Unauthorized access');
    }
    if (!response.ok) throw new Error('Failed to create category');
    return await response.json();
  },

    async update(id: number, categoria: { name: string, description: string }) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoria)
    });
    if (response.status === 403 || response.status === 401) {
      throw new Error('Unauthorized access');
    }
    if (!response.ok) throw new Error('Failed to update category');
    return await response.json();
  },

    async delete(id: number) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete category');
  }
  
    }