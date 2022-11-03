import {CommandViewModel} from '../../core/types/shared-dtos';

export interface WorkflowDesignerObjectModalResponse {
  sheet: WorkflowDesignerNodeSheet,
  item: CommandViewModel
}
export interface WorkflowDesignerObjectModalRequest {
  hideTabs?: boolean,
  sheets: WorkflowDesignerNodeSheet[]
}
export interface WorkflowDesignerNodeSheet {
  title: string;
  icon?: string;
  placeHolder?: string;
  selected?: boolean;
  items: CommandViewModel[];
}
