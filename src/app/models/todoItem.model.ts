export interface TodoItem {
    id: number;
    name: string;
    description?: string;
    isComplete: boolean;
    dueDate: Date;
    created: Date;
    lastUpdated?: Date;
    userId: number;
    categoryId: number;
    priorityId: number;
  }
  