import { Router } from 'express';
import { getDb } from '../db.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.get('/', (req, res) => {
  const db = getDb();
  
  try {
    const tables = db.prepare('SELECT * FROM tables').all();
    res.json(tables);
  } catch (error) {
    console.error('Error fetching tables:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', (req, res) => {
  const db = getDb();
  const { id } = req.params;
  
  try {
    const table = db.prepare('SELECT * FROM tables WHERE id = ?').get(id);
    
    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }
    
    // Get reservations for this table
    const reservations = db.prepare(`
      SELECT * FROM reservations 
      WHERE table_id = ? AND status = 'confirmed'
      ORDER BY date ASC, time_slot ASC
    `).all(id);
    
    res.json({ ...table, reservations });
  } catch (error) {
    console.error('Error fetching table:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.patch('/:id', authenticate, (req, res) => {
  const db = getDb();
  const { id } = req.params;
  const { isAvailable } = req.body;
  
  try {
    const result = db.prepare(
      'UPDATE tables SET is_available = ? WHERE id = ?'
    ).run(isAvailable, id);
    
    if (result.changes === 0) {
      return res.status(404).json({ message: 'Table not found' });
    }
    
    const table = db.prepare('SELECT * FROM tables WHERE id = ?').get(id);
    res.json(table);
  } catch (error) {
    console.error('Error updating table:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export { router as tablesRouter };