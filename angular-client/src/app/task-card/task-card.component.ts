import { Component, OnInit } from '@angular/core';
import { SingleTask } from './models/single-task';
import { TasksService } from './services/tasks.service';
import { TaskAndStatus } from './models/task-and-status';
import { ModalService } from '../shared/services/modal.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {

  environment = environment;
  allTasks: SingleTask[] = [];
  allTasksAndStatus: TaskAndStatus[] = [] as any;
  errors: any = [];
  pendingTask = '';
  isUpdateEnabled = false;

  constructor(private tasksService: TasksService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.getAllTasks();
  }

  private getAllTasks(): void {
    this.tasksService.getAllTasks().subscribe({
      next: allTasks => {
        if (allTasks?.data) {
          this.allTasks = allTasks.data;
        }
        this.allTasksAndStatus = this.generateTaskStatus(this.allTasks);
      }, error: err => {
        this.errors.push(err);
      }
    });
  }

  /**
   * Generates task and status - an item and whether it's selected
   * @param allTasks 
   * @returns 
   */
  private generateTaskStatus(allTasks: SingleTask[]): TaskAndStatus[] {
    const taskAndStatus: TaskAndStatus[] = [];
    if (allTasks) {
      allTasks.forEach(task => {
        taskAndStatus.push({ task, selected: false, controlsAllowed: false });
      });
    }
    return taskAndStatus;
  }

  onCheckboxToggle($event: any, task: SingleTask): void {
    const currentTask = this.allTasksAndStatus.find(singleTask => singleTask.task === task);
    if (currentTask) {
      currentTask.selected = $event.target.checked;
    } else {
      this.allTasksAndStatus.forEach(item => item.controlsAllowed = false);
    }
    const currentTaskAndStatus = this.allTasksAndStatus.filter(item => item.selected);
    if (currentTaskAndStatus.length !== 1) {
      this.allTasksAndStatus.forEach(item => item.controlsAllowed = false);
      this.isUpdateEnabled = false;
    } else if (currentTaskAndStatus.length === 1 && currentTaskAndStatus[0].selected) {
      currentTaskAndStatus[0].controlsAllowed = true;
    }
  }

  controlsAllowed(task: SingleTask): boolean {
    const targetTask = this.allTasksAndStatus.find(sTask => sTask.task === task);
    const allSelectedTasks = this.allTasksAndStatus.filter(task => task.selected);
    if (targetTask && allSelectedTasks.length === 1) {
      return targetTask.controlsAllowed;
    }
    return false;
  }

  getSelectedTasksLabel(): string {
    let message = '';
    const selectedTasks = this.allTasksAndStatus.filter(item => item.selected);
    if (selectedTasks.length === 0) {
      message = 'You have no tasks pending';
    } else {
      const taskSingular = this.allTasksAndStatus.length === 1 ? 'task' : 'tasks';
      message = `You have ${selectedTasks.length} of ${this.allTasksAndStatus.length} ${taskSingular} pending`
    }
    return message;
  }

  addTask(content: string): void {
    this.tasksService.addTask(content).subscribe(res => {
      console.log(res);
      this.getAllTasks();
      this.pendingTask = '';
    });
  }

  completeTask(task: SingleTask): void {
    // TODO: Implement a modal
    this.tasksService.updateTask(task).subscribe(result => {
      console.log(result);
      this.getAllTasks();
      this.isUpdateEnabled = false;
    });
  }

  deleteSelected(): void {
    // TODO: Implement a modal
    const selectedTasks = this.allTasksAndStatus.filter(task => task.selected);
    // Absolute garbage of a backend design, the api should take an array
    selectedTasks.forEach(singleTask => {
      this.tasksService.deleteTask(singleTask.task).subscribe(result => {
        console.log(result);
        this.getAllTasks();
      });
    });
  }

  edit(): void {
    const selectedTasks = this.allTasksAndStatus.filter(task => task.selected);
    if (selectedTasks.length === 0) {
      this.isUpdateEnabled = false;
    } else if (selectedTasks.length === 1) {
      this.isUpdateEnabled = true;
    }
    this.pendingTask = selectedTasks[0].task.content;
  }

  cancelUpdateTask(): void {
    this.isUpdateEnabled = false;
  }

  updateTask(): void {
    const selectedItem = this.allTasksAndStatus.filter(item => item.selected);
    this.tasksService.updateTask(selectedItem[0].task, this.pendingTask).subscribe(result => {
      this.getAllTasks();
      this.pendingTask = '';
    })
  }
}
