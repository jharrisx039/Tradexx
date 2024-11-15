import { create } from 'zustand';
import { Task, SubTask, Comment } from '../types';
import { getCache, setCache } from '../lib/api';
import { generateAnalysis } from '../lib/api';

// ... rest of the file remains the same ...