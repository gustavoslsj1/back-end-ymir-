export class ResponseTaskDto {
  id: number;
  name: string;
  created: Date | null;
  description: string;
  completed: boolean;
  userId: number | null;
}
