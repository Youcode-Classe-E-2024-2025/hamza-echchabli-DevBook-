import {createEmprut ,getAllEmpruts,getEmprutById, updateEmprutStatus } from '../models/emprutModel.js'
  
  const create = async (req, res) => {
    const { user_id, book_id } = req.body
  
    if (!user_id || !book_id) {
      return res.status(400).json({ error: 'User ID and Book ID are required' })
    }
  
    try {
      const emprut = await createEmprut(user_id, book_id)
      res.status(201).json(emprut)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Failed to create emprut' })
    }
  }
  
  const getAll = async (req, res) => {
    try {
      const empruts = await getAllEmpruts()
      res.json(empruts)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch empruts' })
    }
  }
  
  const getOne = async (req, res) => {
    const { id } = req.params
    try {
      const emprut = await getEmprutById(id)
      if (!emprut) return res.status(404).json({ error: 'Not found' })
      res.json(emprut)
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving emprut' })
    }
  }
  
  const update = async (req, res) => {
    const { id } = req.params
    const { status, returned } = req.body
  
    try {
      const emprut = await updateEmprutStatus(id, status, returned)
      res.json(emprut)
    } catch (error) {
      res.status(500).json({ error: 'Failed to update emprut' })
    }
  }
  
  export default {create,getAll,getOne,update}
  