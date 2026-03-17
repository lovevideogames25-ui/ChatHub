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

console.log("Starting server and loading routes...");

// Load all API files synchronously to avoid async issues
const files = fs.readdirSync(apiDir);
let loadedRoutes = 0;

for (const file of files) {
  if (file.endsWith('.js')) {
    const routeName = file.replace('.js', '');
    const routePath = `/api/${routeName}`;
    
    try {
      // Use dynamic import with error handling
      import(join(apiDir, file))
        .then(module => {
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
          loadedRoutes++;
          
          // Start server when all routes are loaded
          if (loadedRoutes === files.filter(f => f.endsWith('.js')).length) {
            const PORT = process.env.PORT || 3001;
            
            const server = app.listen(PORT, () => {
              console.log("Server running on port " + PORT);
              console.log("All routes loaded successfully!");
            });
            
            // Prevent process from exiting
            process.on('SIGINT', () => {
              console.log('Shutting down server...');
              server.close(() => {
                console.log('Server closed');
                process.exit(0);
              });
            });
          }
        })
        .catch(error => {
          console.error(`Failed to load route ${routeName}:`, error);
        });
    } catch (error) {
      console.error(`Failed to load route ${routeName}:`, error);
    }
  }
}

console.log(`Found ${files.filter(f => f.endsWith('.js')).length} API files to load`);
