
import db from '../db/index.js';

class CategoryModel {
  
  static async createCategory(name) {
    const query = 'INSERT INTO categories (name) VALUES ($1) RETURNING *';
    const values = [name];

    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  
  static async getAllCategories() {
    const query = 'SELECT * FROM categories';
    try {
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  static async getCategoryById(id) {
    const query = 'SELECT * FROM categories WHERE id = $1';
    const values = [id];

    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  
  static async updateCategory(id, name) {
    const query = 'UPDATE categories SET name = $1 WHERE id = $2 RETURNING *';
    const values = [name, id];

    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  static async deleteCategory(id) {
    const query = 'DELETE FROM categories WHERE id = $1 RETURNING *';
    const values = [id];

    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default CategoryModel;
