export type Task = {
  task: string;
  checked: boolean;
};

export type Todo = {
  id: number;
  deadline: string;
  tasks: Task[];
  title: string;
  status: boolean;
  createDate: string;
  onTaskCheck?: (index: number, checked: boolean) => void;
};

export type TodoItemProps = {
    todo: Todo;
    onUpdate: (todo: Todo) => void;
    onDelete: (id: number) => void;
  };
export type TodoFormProps = {
    onAdd: (todo: {
      deadline: string;
      task: string;
      title: string;
      status: boolean;
      createDate: string;
    }) => void;
  };