import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const apiDir = join(__dirname, 'api');

// Load all API files dynamically (like Vercel does)
async function loadRoutes() {
  const files = fs.readdirSync(apiDir);
  const routes = [];
  
  for (const file of files) {
    if (file.endsWith('.js')) {
      const routeName = file.replace('.js', '');
      const routePath = `/api/${routeName}`;
      
      try {
        const modulePath = `file://${join(apiDir, file)}`;
        const module = await import(modulePath);
        const handler = module.default;
        
        app.post(routePath, async (req, res) => {
          try {
            await handler(req, res);
          } catch (error) {
            console.error(`Error in ${routeName}:`, error);
            res.status(500).json({ response: `${routeName.toUpperCase()} not available` });
          }
        });
        
        console.log(`Loaded route: ${routePath}`);
        routes.push(routePath);
      } catch (error) {
        console.error(`Failed to load route ${routeName}:`, error);
      }
    }
  }
  
  return routes;
}

// Load routes first, then start server
loadRoutes().then(() => {
  const PORT = process.env.PORT || 3001;
  
  const server = app.listen(PORT, () => {
    console.log("Serverless-compatible server running on port " + PORT);
  });
  
  // Force server to stay running
  process.on('SIGINT', () => {
    console.log('\nShutting down server...');
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });
  
  // Keep process alive
  setInterval(() => {
    // Keep process alive
  }, 1000);
  
}).catch(error => {
  console.error("Failed to load routes:", error);
  process.exit(1);
});
