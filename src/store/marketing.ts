import { create } from 'zustand';

export interface SocialPost {
  id: string;
  platform: 'facebook' | 'instagram' | 'twitter' | 'linkedin';
  content: string;
  media?: string[];
  scheduledFor?: string;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  performance?: {
    likes: number;
    comments: number;
    shares: number;
    reach: number;
    engagement: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'draft' | 'active' | 'completed' | 'paused';
  budget: number;
  spent: number;
  platforms: string[];
  metrics: {
    reach: number;
    engagement: number;
    conversions: number;
    roi: number;
  };
}

export interface ContentPiece {
  id: string;
  title: string;
  type: 'post' | 'story' | 'reel' | 'article' | 'video';
  description: string;
  platform: string[];
  assets: string[];
  status: 'idea' | 'in-progress' | 'review' | 'approved' | 'published';
  scheduledFor?: string;
  campaign?: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

interface MarketingStore {
  posts: SocialPost[];
  campaigns: Campaign[];
  content: ContentPiece[];
  
  // Social Posts
  addPost: (post: Omit<SocialPost, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePost: (id: string, updates: Partial<SocialPost>) => void;
  deletePost: (id: string) => void;
  schedulePost: (id: string, date: string) => void;
  
  // Campaigns
  createCampaign: (campaign: Omit<Campaign, 'id'>) => void;
  updateCampaign: (id: string, updates: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;
  
  // Content Calendar
  addContent: (content: Omit<ContentPiece, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateContent: (id: string, updates: Partial<ContentPiece>) => void;
  deleteContent: (id: string) => void;
}

export const useMarketingStore = create<MarketingStore>((set) => ({
  posts: [],
  campaigns: [],
  content: [],
  
  addPost: (post) =>
    set((state) => ({
      posts: [
        ...state.posts,
        {
          ...post,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    })),

  updatePost: (id, updates) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === id
          ? {
              ...post,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : post
      ),
    })),

  deletePost: (id) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== id),
    })),

  schedulePost: (id, date) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === id
          ? {
              ...post,
              scheduledFor: date,
              status: 'scheduled',
              updatedAt: new Date().toISOString(),
            }
          : post
      ),
    })),

  createCampaign: (campaign) =>
    set((state) => ({
      campaigns: [
        ...state.campaigns,
        { ...campaign, id: crypto.randomUUID() },
      ],
    })),

  updateCampaign: (id, updates) =>
    set((state) => ({
      campaigns: state.campaigns.map((campaign) =>
        campaign.id === id
          ? { ...campaign, ...updates }
          : campaign
      ),
    })),

  deleteCampaign: (id) =>
    set((state) => ({
      campaigns: state.campaigns.filter((campaign) => campaign.id !== id),
    })),

  addContent: (content) =>
    set((state) => ({
      content: [
        ...state.content,
        {
          ...content,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    })),

  updateContent: (id, updates) =>
    set((state) => ({
      content: state.content.map((piece) =>
        piece.id === id
          ? {
              ...piece,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : piece
      ),
    })),

  deleteContent: (id) =>
    set((state) => ({
      content: state.content.filter((piece) => piece.id !== id),
    })),
}));