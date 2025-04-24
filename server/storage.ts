import { db } from "./db";
import { eq } from "drizzle-orm";
import { 
  users, gpus, jobs, reviews, transactions,
  User, InsertUser, Gpu, InsertGpu, Job, InsertJob, Review, InsertReview, Transaction, InsertTransaction 
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // GPU operations
  getGpu(id: number): Promise<Gpu | undefined>;
  getGpus(filters?: Partial<Gpu>): Promise<Gpu[]>;
  getGpusByProviderId(providerId: number): Promise<Gpu[]>;
  createGpu(gpu: InsertGpu): Promise<Gpu>;
  updateGpu(id: number, gpu: Partial<Gpu>): Promise<Gpu | undefined>;
  deleteGpu(id: number): Promise<boolean>;
  
  // Job operations
  getJob(id: number): Promise<Job | undefined>;
  getJobsByClientId(clientId: number): Promise<Job[]>;
  getJobsByGpuId(gpuId: number): Promise<Job[]>;
  createJob(job: InsertJob): Promise<Job>;
  updateJob(id: number, job: Partial<Job>): Promise<Job | undefined>;
  
  // Review operations
  getReview(id: number): Promise<Review | undefined>;
  getReviewsByGpuId(gpuId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  
  // Transaction operations
  getTransaction(id: number): Promise<Transaction | undefined>;
  getTransactionsByUserId(userId: number): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  updateTransaction(id: number, transaction: Partial<Transaction>): Promise<Transaction | undefined>;
}

// Database storage implementation for PostgreSQL
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(userData: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(userData).returning();
    return user;
  }

  async getGpu(id: number): Promise<Gpu | undefined> {
    const [gpu] = await db.select().from(gpus).where(eq(gpus.id, id));
    return gpu;
  }

  async getGpus(filters?: Partial<Gpu>): Promise<Gpu[]> {
    let query = db.select().from(gpus);
    
    if (filters) {
      if (filters.isOnline !== undefined) {
        query = query.where(eq(gpus.isOnline, !!filters.isOnline));
      }
      if (filters.providerId !== undefined) {
        query = query.where(eq(gpus.providerId, filters.providerId));
      }
    }
    
    return await query;
  }

  async getGpusByProviderId(providerId: number): Promise<Gpu[]> {
    return await db.select().from(gpus).where(eq(gpus.providerId, providerId));
  }

  async createGpu(gpuData: InsertGpu): Promise<Gpu> {
    const [gpu] = await db.insert(gpus).values(gpuData).returning();
    return gpu;
  }

  async updateGpu(id: number, gpuData: Partial<Gpu>): Promise<Gpu | undefined> {
    const [updatedGpu] = await db.update(gpus)
      .set(gpuData)
      .where(eq(gpus.id, id))
      .returning();
    return updatedGpu;
  }

  async deleteGpu(id: number): Promise<boolean> {
    const result = await db.delete(gpus).where(eq(gpus.id, id));
    return !!result;
  }

  async getJob(id: number): Promise<Job | undefined> {
    const [job] = await db.select().from(jobs).where(eq(jobs.id, id));
    return job;
  }

  async getJobsByClientId(clientId: number): Promise<Job[]> {
    return await db.select().from(jobs).where(eq(jobs.clientId, clientId));
  }

  async getJobsByGpuId(gpuId: number): Promise<Job[]> {
    return await db.select().from(jobs).where(eq(jobs.gpuId, gpuId));
  }

  async createJob(jobData: InsertJob): Promise<Job> {
    const [job] = await db.insert(jobs).values(jobData).returning();
    return job;
  }

  async updateJob(id: number, jobData: Partial<Job>): Promise<Job | undefined> {
    const [updatedJob] = await db.update(jobs)
      .set(jobData)
      .where(eq(jobs.id, id))
      .returning();
    return updatedJob;
  }

  async getReview(id: number): Promise<Review | undefined> {
    const [review] = await db.select().from(reviews).where(eq(reviews.id, id));
    return review;
  }

  async getReviewsByGpuId(gpuId: number): Promise<Review[]> {
    return await db.select().from(reviews).where(eq(reviews.gpuId, gpuId));
  }

  async createReview(reviewData: InsertReview): Promise<Review> {
    const [review] = await db.insert(reviews).values(reviewData).returning();
    return review;
  }

  async getTransaction(id: number): Promise<Transaction | undefined> {
    const [transaction] = await db.select().from(transactions).where(eq(transactions.id, id));
    return transaction;
  }

  async getTransactionsByUserId(userId: number): Promise<Transaction[]> {
    return await db.select().from(transactions).where(eq(transactions.userId, userId));
  }

  async createTransaction(transactionData: InsertTransaction): Promise<Transaction> {
    const [transaction] = await db.insert(transactions).values(transactionData).returning();
    return transaction;
  }

  async updateTransaction(id: number, transactionData: Partial<Transaction>): Promise<Transaction | undefined> {
    const [updatedTransaction] = await db.update(transactions)
      .set(transactionData)
      .where(eq(transactions.id, id))
      .returning();
    return updatedTransaction;
  }
}

// Use DatabaseStorage since we've provisioned a database
export const storage = new DatabaseStorage();