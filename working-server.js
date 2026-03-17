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

// Import DEEPSEEK-V3.2 handler using standard import
try {
  const { default: deepseekHandler } = await import('./api/deepseekv32.js');
  
  app.post("/api/deepseekv32", async (req, res) => {
    console.log("DEEPSEEK-V3.2 route called!");
    try {
      await deepseekHandler(req, res);
      console.log("DEEPSEEK-V3.2 handler executed successfully");
    } catch (error) {
      console.error("DEEPSEEK-V3.2 error:", error);
      res.status(500).json({ response: "DEEPSEEK-V3.2 not available" });
    }
  });
  
  console.log("DEEPSEEK-V3.2 route loaded successfully!");
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
  // Keep server alive by not calling server.close()
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Keeping server alive...');
  // Don't exit - just log the signal
  // Keep server alive by not calling server.close()
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
