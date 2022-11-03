export interface CommandViewModel {
  title: string;
  subTitle?: string;
  icon?: string;
  section?: string;
  url?: string;
  selected?: boolean;
  payload?: any;
  subActions?: CommandViewModel[];
  execute?: (self: CommandViewModel) => void;
}
export interface WaitingLoaderInfo{
  title: string;
  current: string;
  description?: string;
  percentage?: number;
  indeterminate?: boolean;
}
export interface ConfirmModalRequest {
  title: string;
  subTitle?: string;
  icon?: string;
  description?: string;
  agreement?: string;
  agreementRequired?: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
  options?: ConfirmModalOption[];
}
export interface ConfirmModalResponse {
  confirmed: boolean;
  agreement?: boolean;
  option?: any;
}
export interface ConfirmModalOption {
  value: any;
  title: string;
  subTitle?: string;
  icon?: string;
}
