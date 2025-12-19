const axios = require('axios');
const Task = require('../models/taskModel');

const USER_SERVICE_URL = process.env.USER_SERVICE_URL;

// Helper function to validate user exists
const validateUser = async (userId, token) => {
  try {
    const response = await axios.get(`${USER_SERVICE_URL}/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

const taskController = {
  // Create new task
  async createTask(req, res) {
    try {
      const { title, description, status, priority, assignee_id, due_date } = req.body;
      const created_by = req.user.id;

      // Validation
      if (!title) {
        return res.status(400).json({ error: 'Title is required' });
      }

      // Validate assignee exists (calls User Service)
      if (assignee_id) {
        const assignee = await validateUser(assignee_id, req.token);
        if (!assignee) {
          return res.status(400).json({ error: 'Assignee not found' });
        }
      }

      const task = await Task.create({
        title,
        description,
        status,
        priority,
        assignee_id,
        created_by,
        due_date
      });

      res.status(201).json({
        message: 'Task created successfully',
        task
      });
    } catch (error) {
      console.error('Create task error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Get all tasks
  async getAllTasks(req, res) {
    try {
      const { status, priority, assignee_id } = req.query;
      
      const tasks = await Task.findAll({
        status,
        priority,
        assignee_id
      });

      res.json(tasks);
    } catch (error) {
      console.error('Get tasks error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Get task by ID
  async getTaskById(req, res) {
    try {
      const task = await Task.findById(req.params.id);
      
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      // Optionally enrich with assignee details
      if (task.assignee_id) {
        try {
          const assignee = await validateUser(task.assignee_id, req.token);
          task.assignee = assignee;
        } catch (e) {
          task.assignee = null;
        }
      }

      res.json(task);
    } catch (error) {
      console.error('Get task error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Get tasks by assignee
  async getTasksByAssignee(req, res) {
    try {
      const assigneeId = req.params.userId;

      // Validate user exists
      const user = await validateUser(assigneeId, req.token);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const tasks = await Task.findByAssignee(assigneeId);
      res.json(tasks);
    } catch (error) {
      console.error('Get tasks by assignee error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Get my tasks
  async getMyTasks(req, res) {
    try {
      const tasks = await Task.findAll({
        assignee_id: req.user.id
      });
      res.json(tasks);
    } catch (error) {
      console.error('Get my tasks error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Update task
  async updateTask(req, res) {
    try {
      const taskId = req.params.id;
      const { title, description, status, priority, assignee_id, due_date } = req.body;

      // Check if task exists
      const existingTask = await Task.findById(taskId);
      if (!existingTask) {
        return res.status(404).json({ error: 'Task not found' });
      }

      // Validate new assignee if provided
      if (assignee_id && assignee_id !== existingTask.assignee_id) {
        const assignee = await validateUser(assignee_id, req.token);
        if (!assignee) {
          return res.status(400).json({ error: 'Assignee not found' });
        }
      }

      const task = await Task.update(taskId, {
        title,
        description,
        status,
        priority,
        assignee_id,
        due_date
      });

      res.json({
        message: 'Task updated successfully',
        task
      });
    } catch (error) {
      console.error('Update task error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Delete task
  async deleteTask(req, res) {
    try {
      const deleted = await Task.delete(req.params.id);
      
      if (deleted) {
        res.json({ message: 'Task deleted successfully' });
      } else {
        res.status(404).json({ error: 'Task not found' });
      }
    } catch (error) {
      console.error('Delete task error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Get task statistics
  async getStats(req, res) {
    try {
      const stats = await Task.getStats(req.user.id);
      res.json(stats);
    } catch (error) {
      console.error('Get stats error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = taskController;