import {CommandViewModel} from '../../core/dtos/shared-dtos';

export interface WorkflowDesignerNodeModalResponse {
  sheet: WorkflowDesignerNodeSheet,
  item: CommandViewModel
}
export interface WorkflowDesignerNodeModalRequest {
  sheets: WorkflowDesignerNodeSheet[]
}
export interface WorkflowDesignerNodeSheet {
  title: string;
  icon?: string;
  placeHolder?: string;
  selected?: boolean;
  items: CommandViewModel[];
}
