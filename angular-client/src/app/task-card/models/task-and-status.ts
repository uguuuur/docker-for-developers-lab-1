import { SingleTask } from "./single-task";

export interface TaskAndStatus {
    task: SingleTask,
    selected: boolean,
    controlsAllowed: boolean
}