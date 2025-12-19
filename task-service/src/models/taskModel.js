const { pool } = require('../config/db');

const Task = {
  // Create tasks table if not exists
  async initialize() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status ENUM('todo', 'in_progress', 'review', 'done') DEFAULT 'todo',
        priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
        assignee_id INT,
        created_by INT NOT NULL,
        due_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    await pool.query(createTableQuery);
    console.log('✅ Tasks table ready');
  },

  // Create new task
  async create(taskData) {
    const { title, description, status, priority, assignee_id, created_by, due_date } = taskData;
    const [result] = await pool.query(
      `INSERT INTO tasks (title, description, status, priority, assignee_id, created_by, due_date) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, description, status || 'todo', priority || 'medium', assignee_id, created_by, due_date]
    );
    return this.findById(result.insertId);
  },

  // Find task by ID
  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
    return rows[0];
  },

  // Get all tasks
  async findAll(filters = {}) {
    let query = 'SELECT * FROM tasks WHERE 1=1';
    const params = [];

    if (filters.status) {
      query += ' AND status = ?';
      params.push(filters.status);
    }

    if (filters.priority) {
      query += ' AND priority = ?';
      params.push(filters.priority);
    }

    if (filters.assignee_id) {
      query += ' AND assignee_id = ?';
      params.push(filters.assignee_id);
    }

    if (filters.created_by) {
      query += ' AND created_by = ?';
      params.push(filters.created_by);
    }

    query += ' ORDER BY created_at DESC';

    const [rows] = await pool.query(query, params);
    return rows;
  },

  // Get tasks by assignee
  async findByAssignee(assigneeId) {
    const [rows] = await pool.query(
      'SELECT * FROM tasks WHERE assignee_id = ? ORDER BY created_at DESC',
      [assigneeId]
    );
    return rows;
  },

  // Update task
  async update(id, taskData) {
    const { title, description, status, priority, assignee_id, due_date } = taskData;
    
    const task = await this.findById(id);
    if (!task) return null;

    const [result] = await pool.query(
      `UPDATE tasks 
       SET title = ?, description = ?, status = ?, priority = ?, assignee_id = ?, due_date = ?
       WHERE id = ?`,
      [
        title || task.title,
        description !== undefined ? description : task.description,
        status || task.status,
        priority || task.priority,
        assignee_id !== undefined ? assignee_id : task.assignee_id,
        due_date !== undefined ? due_date : task.due_date,
        id
      ]
    );

    return result.affectedRows > 0 ? this.findById(id) : null;
  },

  // Delete task
  async delete(id) {
    const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },

  // Get task statistics
  async getStats(userId = null) {
    let query = `
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'todo' THEN 1 ELSE 0 END) as todo,
        SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END) as in_progress,
        SUM(CASE WHEN status = 'review' THEN 1 ELSE 0 END) as review,
        SUM(CASE WHEN status = 'done' THEN 1 ELSE 0 END) as done
      FROM tasks
    `;
    
    const params = [];
    if (userId) {
      query += ' WHERE assignee_id = ? OR created_by = ?';
      params.push(userId, userId);
    }

    const [rows] = await pool.query(query, params);
    return rows[0];
  }
};

module.exports = Task;