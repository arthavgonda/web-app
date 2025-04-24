import { pgTable, text, serial, integer, boolean, doublePrecision, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull().default("client"), // "client" or "provider"
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  role: true,
});

// GPUs table
export const gpus = pgTable("gpus", {
  id: serial("id").primaryKey(),
  providerId: integer("provider_id").notNull(),
  name: text("name").notNull(),
  vram: integer("vram").notNull(), // in GB
  cores: integer("cores").notNull(),
  tensorScore: doublePrecision("tensor_score").notNull(),
  pricePerHour: doublePrecision("price_per_hour").notNull(),
  isOnline: boolean("is_online").default(false),
  description: text("description"),
  specifications: jsonb("specifications"), // Additional specs
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertGpuSchema = createInsertSchema(gpus).pick({
  providerId: true,
  name: true,
  vram: true,
  cores: true,
  tensorScore: true,
  pricePerHour: true,
  isOnline: true,
  description: true,
  specifications: true,
  imageUrl: true,
});

// Jobs table
export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").notNull(),
  gpuId: integer("gpu_id").notNull(),
  status: text("status").notNull().default("pending"), // pending, running, completed, failed
  startTime: timestamp("start_time"),
  endTime: timestamp("end_time"),
  totalCost: doublePrecision("total_cost"),
  jobConfig: jsonb("job_config"), // Runtime, environment settings, etc.
  resultsUrl: text("results_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertJobSchema = createInsertSchema(jobs).pick({
  clientId: true,
  gpuId: true,
  status: true,
  jobConfig: true,
});

// Reviews table
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  gpuId: integer("gpu_id").notNull(),
  rating: integer("rating").notNull(), // 1-5
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertReviewSchema = createInsertSchema(reviews).pick({
  userId: true,
  gpuId: true,
  rating: true,
  comment: true,
});

// Transactions table
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  jobId: integer("job_id").notNull(),
  amount: doublePrecision("amount").notNull(),
  type: text("type").notNull(), // deposit, payment, withdrawal
  status: text("status").notNull().default("pending"), // pending, completed, failed
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertTransactionSchema = createInsertSchema(transactions).pick({
  userId: true,
  jobId: true,
  amount: true,
  type: true,
  status: true,
});

// Define Types for Exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Gpu = typeof gpus.$inferSelect;
export type InsertGpu = z.infer<typeof insertGpuSchema>;

export type Job = typeof jobs.$inferSelect;
export type InsertJob = z.infer<typeof insertJobSchema>;

export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;

export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
