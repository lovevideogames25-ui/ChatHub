import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Simple route for testing
app.post("/api/test", async (req, res) => {
  console.log("Test route called");
  res.status(200).json({ response: "Test working" });
});

// Import DEEPSEEK-V3.2 handler directly
import { createRequire } from 'module';

try {
  // Create a require for the API file
  const requireFunc = createRequire(import.meta.url);
  console.log("Require function created:", typeof requireFunc);
  
  const deepseekHandler = requireFunc('./api/deepseekv32.js').default;
  console.log("DEEPSEEK-V3.2 handler loaded:", typeof deepseekHandler);
  
  app.post("/api/deepseekv32", async (req, res) => {
    console.log("DEEPSEEK-V3.2 route called!");
    console.log("Request method:", req.method);
    console.log("Request URL:", req.url);
    console.log("Request body:", req.body);
    
    try {
      await deepseekHandler(req, res);
      console.log("DEEPSEEK-V3.2 handler executed successfully");
    } catch (error) {
      console.error("DEEPSEEK-V3.2 error:", error);
      res.status(500).json({ response: "DEEPSEEK-V3.2 not available" });
    }
  });
  
  console.log("DEEPSEEK-V3.2 route loaded successfully!");
  
  // Debug: List all registered routes
  console.log("Registered routes:");
  try {
    app._router.stack?.forEach((layer) => {
      if (layer.route) {
        console.log(`  - ${layer.method.toUpperCase()} ${layer.path}`);
      }
    });
  } catch (error) {
    console.log("Router stack not available (this is normal for some Express versions)");
  }
  
} catch (error) {
  console.error("Failed to load DEEPSEEK-V3.2:", error);
}

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log("Simple server running on port " + PORT);
});

// Force server to stay running
process.on('SIGINT', () => {
  console.log('\nReceived SIGINT. Keeping server alive...');
  // Don't exit - just log the signal
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Keeping server alive...');
  // Don't exit - just log the signal
});

// Keep process alive
setInterval(() => {
  // Prevent process from exiting
}, 1000);

// Prevent uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Don't exit - keep server running
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
  // Don't exit - keep server running
});
