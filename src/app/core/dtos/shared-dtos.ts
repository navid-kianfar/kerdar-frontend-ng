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
