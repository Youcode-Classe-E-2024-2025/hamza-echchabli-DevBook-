
import CategoryModel from '../models/CategoryModel.js';

class CategoryController {
  
  static async create(req, res) {
    const { name } = req.body;

    try {
      const category = await CategoryModel.createCategory(name);
      res.status(201).json({ category });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create category' });
    }
  }

  
  static async getAll(req, res) {
    try {
      const categories = await CategoryModel.getAllCategories();
      res.status(200).json({ categories });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to retrieve categories' });
    }
  }

  
  static async getOne(req, res) {
    const { id } = req.params;

    try {
      const category = await CategoryModel.getCategoryById(id);
      if (category) {
        res.status(200).json({ category });
      } else {
        res.status(404).json({ message: 'Category not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to retrieve category' });
    }
  }

  
  static async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const category = await CategoryModel.updateCategory(id, name);
      if (category) {
        res.status(200).json({ category });
      } else {
        res.status(404).json({ message: 'Category not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update category' });
    }
  }

  
  static async delete(req, res) {
    const { id } = req.params;

    try {
      const category = await CategoryModel.deleteCategory(id);
      if (category) {
        res.status(200).json({ message: 'Category deleted successfully' });
      } else {
        res.status(404).json({ message: 'Category not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete category' });
    }
  }
}

export default CategoryController;
