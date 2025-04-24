import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import express, { Request, Response } from "express";
import { insertUserSchema, insertGpuSchema, insertJobSchema, insertReviewSchema, insertTransactionSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up API routes
  const apiRouter = express.Router();
  
  // Session middleware for authentication
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  // Auth routes
  apiRouter.post("/auth/register", async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if username or email already exists
      const existingUserByUsername = await storage.getUserByUsername(userData.username);
      if (existingUserByUsername) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      const existingUserByEmail = await storage.getUserByEmail(userData.email);
      if (existingUserByEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }
      
      // In a real app, we would hash the password here
      const user = await storage.createUser(userData);
      
      // Don't return the password in the response
      const { password, ...userWithoutPassword } = user;
      
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      res.status(500).json({ message: "Error creating user" });
    }
  });
  
  apiRouter.post("/auth/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      const user = await storage.getUserByUsername(username);
      
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // In a real app, we would verify the password hash here
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Don't return the password in the response
      const { password: _, ...userWithoutPassword } = user;
      
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Error during login" });
    }
  });
  
  // GPU routes
  apiRouter.get("/gpus", async (req: Request, res: Response) => {
    try {
      const filters: any = {};
      
      // Parse query parameters
      if (req.query.isOnline === 'true') {
        filters.isOnline = true;
      } else if (req.query.isOnline === 'false') {
        filters.isOnline = false;
      }
      
      if (req.query.name) {
        filters.name = req.query.name;
      }
      
      if (req.query.minVram) {
        filters.vram = parseInt(req.query.minVram as string);
      }
      
      if (req.query.maxPrice) {
        filters.pricePerHour = parseFloat(req.query.maxPrice as string);
      }
      
      const gpus = await storage.getGpus(filters);
      res.status(200).json(gpus);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving GPUs" });
    }
  });
  
  apiRouter.get("/gpus/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid GPU ID" });
      }
      
      const gpu = await storage.getGpu(id);
      
      if (!gpu) {
        return res.status(404).json({ message: "GPU not found" });
      }
      
      res.status(200).json(gpu);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving GPU" });
    }
  });
  
  apiRouter.post("/gpus", async (req: Request, res: Response) => {
    try {
      const gpuData = insertGpuSchema.parse(req.body);
      const gpu = await storage.createGpu(gpuData);
      res.status(201).json(gpu);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      res.status(500).json({ message: "Error creating GPU" });
    }
  });
  
  apiRouter.put("/gpus/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid GPU ID" });
      }
      
      const gpuData = req.body;
      
      const gpu = await storage.updateGpu(id, gpuData);
      
      if (!gpu) {
        return res.status(404).json({ message: "GPU not found" });
      }
      
      res.status(200).json(gpu);
    } catch (error) {
      res.status(500).json({ message: "Error updating GPU" });
    }
  });
  
  apiRouter.delete("/gpus/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid GPU ID" });
      }
      
      const result = await storage.deleteGpu(id);
      
      if (!result) {
        return res.status(404).json({ message: "GPU not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Error deleting GPU" });
    }
  });
  
  // Job routes
  apiRouter.get("/jobs", async (req: Request, res: Response) => {
    try {
      let jobs = [];
      
      if (req.query.clientId) {
        const clientId = parseInt(req.query.clientId as string);
        if (isNaN(clientId)) {
          return res.status(400).json({ message: "Invalid client ID" });
        }
        jobs = await storage.getJobsByClientId(clientId);
      } else if (req.query.gpuId) {
        const gpuId = parseInt(req.query.gpuId as string);
        if (isNaN(gpuId)) {
          return res.status(400).json({ message: "Invalid GPU ID" });
        }
        jobs = await storage.getJobsByGpuId(gpuId);
      } else {
        // In a real app, we would check permissions here
        return res.status(400).json({ message: "Must specify clientId or gpuId" });
      }
      
      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving jobs" });
    }
  });
  
  apiRouter.get("/jobs/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid job ID" });
      }
      
      const job = await storage.getJob(id);
      
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
      
      res.status(200).json(job);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving job" });
    }
  });
  
  apiRouter.post("/jobs", async (req: Request, res: Response) => {
    try {
      const jobData = insertJobSchema.parse(req.body);
      const job = await storage.createJob(jobData);
      res.status(201).json(job);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      res.status(500).json({ message: "Error creating job" });
    }
  });
  
  apiRouter.put("/jobs/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid job ID" });
      }
      
      const jobData = req.body;
      
      const job = await storage.updateJob(id, jobData);
      
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
      
      res.status(200).json(job);
    } catch (error) {
      res.status(500).json({ message: "Error updating job" });
    }
  });
  
  // Review routes
  apiRouter.get("/reviews", async (req: Request, res: Response) => {
    try {
      if (!req.query.gpuId) {
        return res.status(400).json({ message: "GPU ID is required" });
      }
      
      const gpuId = parseInt(req.query.gpuId as string);
      
      if (isNaN(gpuId)) {
        return res.status(400).json({ message: "Invalid GPU ID" });
      }
      
      const reviews = await storage.getReviewsByGpuId(gpuId);
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving reviews" });
    }
  });
  
  apiRouter.post("/reviews", async (req: Request, res: Response) => {
    try {
      const reviewData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(reviewData);
      res.status(201).json(review);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      res.status(500).json({ message: "Error creating review" });
    }
  });
  
  // Transaction routes
  apiRouter.get("/transactions", async (req: Request, res: Response) => {
    try {
      if (!req.query.userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
      
      const userId = parseInt(req.query.userId as string);
      
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const transactions = await storage.getTransactionsByUserId(userId);
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving transactions" });
    }
  });
  
  apiRouter.post("/transactions", async (req: Request, res: Response) => {
    try {
      const transactionData = insertTransactionSchema.parse(req.body);
      const transaction = await storage.createTransaction(transactionData);
      res.status(201).json(transaction);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      res.status(500).json({ message: "Error creating transaction" });
    }
  });
  
  apiRouter.put("/transactions/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid transaction ID" });
      }
      
      const transactionData = req.body;
      
      const transaction = await storage.updateTransaction(id, transactionData);
      
      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }
      
      res.status(200).json(transaction);
    } catch (error) {
      res.status(500).json({ message: "Error updating transaction" });
    }
  });

  // Mount the API router
  app.use("/api", apiRouter);

  const httpServer = createServer(app);
  return httpServer;
}
