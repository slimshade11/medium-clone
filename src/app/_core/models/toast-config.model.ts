import { ToastStatus } from '@core/enums/toast-status.enum';

export interface ToastConfig {
  message: string;
  status: string;
  buttonLabel?: ToastStatus;
}
