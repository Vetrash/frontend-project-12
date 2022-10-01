import { toast } from 'react-toastify';
import i18n from 'i18next';

export const ToastNewChannel = () => toast.success(i18n.t('toast.NewChannel'));
export const ToastRenameChannel = () => toast.success(i18n.t('toast.RenameChannel'));
export const ToastRemoveChannel = () => toast.success(i18n.t('toast.RemoveChannel'));
