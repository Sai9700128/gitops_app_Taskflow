const fs = require('fs');

// Load secrets from Vault (must be FIRST, before anything else)
const loadVaultSecrets = () => {
  const secretsPath = '/vault/secrets/config';
  try {
    if (fs.existsSync(secretsPath)) {
      const secrets = fs.readFileSync(secretsPath, 'utf8');
      secrets.split('\n').forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine && trimmedLine.includes('=')) {
          const [key, ...valueParts] = trimmedLine.split('=');
          const value = valueParts.join('=');
          if (key && value) {
            process.env[key.trim()] = value.trim();
          }
        }
      });
      console.log('✅ Loaded secrets from Vault');
    } else {
      console.log('⚠️ Vault secrets not found, using environment variables');
    }
  } catch (error) {
    console.error('❌ Error loading Vault secrets:', error.message);
  }
};

loadVaultSecrets();

require('dotenv').config();

const app = require('./app');
const { testConnection } = require('./config/db');
const Task = require('./models/taskModel');

const PORT = process.env.PORT || 3002;

const startServer = async () => {
  try {
    await testConnection();
    await Task.initialize();

    app.listen(PORT, () => {
      console.log(`🚀 Task Service running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();