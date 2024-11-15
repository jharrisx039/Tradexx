import { create } from 'zustand';

export interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition';
  position: { x: number; y: number };
  data: Record<string, any>;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'active' | 'paused';
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  triggers: Array<{
    id: string;
    type: string;
    config: Record<string, any>;
  }>;
  actions: Array<{
    id: string;
    type: string;
    config: Record<string, any>;
  }>;
  createdAt: string;
  updatedAt: string;
}

interface WorkflowStore {
  workflows: Workflow[];
  addWorkflow: (workflow: Omit<Workflow, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => void;
  updateWorkflow: (id: string, updates: Partial<Workflow>) => void;
  deleteWorkflow: (id: string) => void;
  addNode: (workflowId: string, node: Omit<WorkflowNode, 'id'>) => void;
  updateNode: (workflowId: string, nodeId: string, updates: Partial<WorkflowNode>) => void;
  deleteNode: (workflowId: string, nodeId: string) => void;
  addEdge: (workflowId: string, edge: Omit<WorkflowEdge, 'id'>) => void;
  deleteEdge: (workflowId: string, edgeId: string) => void;
}

export const useWorkflowStore = create<WorkflowStore>((set) => ({
  workflows: [],

  addWorkflow: (workflow) =>
    set((state) => ({
      workflows: [
        ...state.workflows,
        {
          ...workflow,
          id: crypto.randomUUID(),
          status: 'draft',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    })),

  updateWorkflow: (id, updates) =>
    set((state) => ({
      workflows: state.workflows.map((workflow) =>
        workflow.id === id
          ? {
              ...workflow,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : workflow
      ),
    })),

  deleteWorkflow: (id) =>
    set((state) => ({
      workflows: state.workflows.filter((workflow) => workflow.id !== id),
    })),

  addNode: (workflowId, node) =>
    set((state) => ({
      workflows: state.workflows.map((workflow) =>
        workflow.id === workflowId
          ? {
              ...workflow,
              nodes: [...workflow.nodes, { ...node, id: crypto.randomUUID() }],
              updatedAt: new Date().toISOString(),
            }
          : workflow
      ),
    })),

  updateNode: (workflowId, nodeId, updates) =>
    set((state) => ({
      workflows: state.workflows.map((workflow) =>
        workflow.id === workflowId
          ? {
              ...workflow,
              nodes: workflow.nodes.map((node) =>
                node.id === nodeId ? { ...node, ...updates } : node
              ),
              updatedAt: new Date().toISOString(),
            }
          : workflow
      ),
    })),

  deleteNode: (workflowId, nodeId) =>
    set((state) => ({
      workflows: state.workflows.map((workflow) =>
        workflow.id === workflowId
          ? {
              ...workflow,
              nodes: workflow.nodes.filter((node) => node.id !== nodeId),
              edges: workflow.edges.filter(
                (edge) => edge.source !== nodeId && edge.target !== nodeId
              ),
              updatedAt: new Date().toISOString(),
            }
          : workflow
      ),
    })),

  addEdge: (workflowId, edge) =>
    set((state) => ({
      workflows: state.workflows.map((workflow) =>
        workflow.id === workflowId
          ? {
              ...workflow,
              edges: [...workflow.edges, { ...edge, id: crypto.randomUUID() }],
              updatedAt: new Date().toISOString(),
            }
          : workflow
      ),
    })),

  deleteEdge: (workflowId, edgeId) =>
    set((state) => ({
      workflows: state.workflows.map((workflow) =>
        workflow.id === workflowId
          ? {
              ...workflow,
              edges: workflow.edges.filter((edge) => edge.id !== edgeId),
              updatedAt: new Date().toISOString(),
            }
          : workflow
      ),
    })),
}));