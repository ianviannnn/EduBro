
export enum Priority {
  LOW = 'Rendah',
  MEDIUM = 'Sedang',
  HIGH = 'Tinggi'
}

export interface Task {
  id: string;
  name: string;
  subject: string;
  deadline: string;
  description: string;
  priority: Priority;
  completed: boolean;
  createdAt: number;
}

export type TabType = 'Tugas' | 'Prioritas' | 'Fokus' | 'Pengaturan';

export interface SubjectOption {
  value: string;
  label: string;
}
