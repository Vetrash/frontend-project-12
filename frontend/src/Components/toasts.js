import { toast } from 'react-toastify';
import i18n from 'i18next';

export const toastNewChannel = () => toast.success(i18n.t('toast.NewChannel'));
export const toastRenameChannel = () => toast.success(i18n.t('toast.RenameChannel'));
export const toastRemoveChannel = () => toast.success(i18n.t('toast.RemoveChannel'));
