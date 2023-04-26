// components/TodoItem.tsx
import { useState } from 'react';
import { Task, Todo } from '../types/types';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { formatDeadline } from '../utils/format';

type Props = {
  todo: Todo;
  onUpdate: (updatedTodo: Todo) => void;
  onDelete: (id: number) => void;
};

export default function TodoItem({ todo, onUpdate, onDelete }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [deadline, setDeadline] = useState(todo.deadline);
  const [status, setStatus] = useState(todo.status);
  const [tasks, setTasks] = useState<Task[]>(todo.tasks);
  const firstUncheckedTask = todo.tasks.find((task) => !task.checked);

  const handleUpdateClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setTitle(todo.title);
    setDeadline(todo.deadline);
    setStatus(todo.status);
  };

  const handleSaveClick = () => {
    const updatedTodo: Todo = {
      ...todo,
      title,
      deadline,
      tasks, // Include the updated tasks
      status,
    };
    onUpdate(updatedTodo);
    setShowModal(false);
  };
  

  const handleDeleteClick = () => {
    onDelete(todo.id);
  };

  const handleStatusChange = () => {
    const updatedTodo: Todo = {
      ...todo,
      status: !status,
    };
    onUpdate(updatedTodo);
    setStatus(!status);
  };

  const handleAddTask = () => {
    setTasks([...tasks, { task: '', checked: false }]);
  };
  
  const handleRemoveTask = (taskIndex: number) => {
    setTasks(tasks.filter((_, index) => index !== taskIndex));
  };
  
  const formattedDeadline = formatDeadline(todo.deadline);

  
  return (
    <>
      <div className="card mb-3">
        <div className="card-body">
        <h5 className="card-title">{firstUncheckedTask ? firstUncheckedTask.task : 'All tasks completed'}</h5>
          <p className="card-text">{`Deadline: ${formattedDeadline}`}</p>
          <Button variant={status ? 'success' : 'outline-secondary'} onClick={handleStatusChange}>
            {status ? 'Completed' : 'Open'}
          </Button>{' '}
          <Button variant="outline-primary" onClick={handleUpdateClick}>
            Edit
          </Button>{' '}
          <Button variant="outline-danger" onClick={handleDeleteClick}>
            Delete
          </Button>
        </div>
      </div>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
            <Form.Group>
      <Form.Label>Task</Form.Label>
      {tasks.map((t, index) => (
        <div key={index}>
          <Row>
            <Col xs={8}>
              <Form.Control
                as="textarea"
                placeholder="Enter Task"
                value={t.task}
                onChange={(e) => {
                  const newTasks = [...tasks];
                  newTasks[index] = { ...t, task: e.target.value };
                  setTasks(newTasks);
                }}
                required
              />
            </Col>
            <Col xs={4}>
              <Button variant="danger" onClick={() => handleRemoveTask(index)} className="mt-2">
                Remove
              </Button>
            </Col>
          </Row>
        </div>
      ))}
      <Button variant="primary" onClick={handleAddTask} className="mt-2">
        New Task
      </Button>
    </Form.Group>
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Completed"
                checked={status}
                onChange={(e) => setStatus(e.target.checked)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveClick}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
