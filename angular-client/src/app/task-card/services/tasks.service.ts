import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllTasks } from '../models/all-tasks';
import { SingleTask } from '../models/single-task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private httpClient: HttpClient) {}

  getAllTasks(): Observable<AllTasks> {
    return this.httpClient.get<AllTasks>('http://localhost/api/todo');
  }

  addTask(content: string): Observable<SingleTask> {
    const body = {
      content
    }
    return this.httpClient.post<SingleTask>('http://localhost/api/todo', body);
  }

  /**
   * Updates the database entry
   * @param task - the current task
   * @param content - target content if the task is to be renamed
   * @returns 
   */
  updateTask(task: SingleTask, content?: string): Observable<SingleTask> {
    const body = content ? {
      content
    } : {
      is_completed: true
    }
    return this.httpClient.put<SingleTask>('http://localhost/api/todo/' + task._id, body);
  }

  deleteTask(task: SingleTask): Observable<SingleTask> {
    return this.httpClient.delete<SingleTask>('http://localhost/api/todo/' + task._id);
  }
}
