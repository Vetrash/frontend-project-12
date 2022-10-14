import * as yup from 'yup';

export const modalNameSchema = (arr) => yup.object().shape({
  name: yup.string()
    .min(3, 'lengthError')
    .max(20, 'lengthError')
    .required('required')
    .notOneOf(arr, 'duplicate'),
});
export const modalRenameSchema = (arr) => yup.object().shape({
  rename: yup.string()
    .min(3, 'lengthError')
    .max(20, 'lengthError')
    .required('required')
    .notOneOf(arr, 'duplicate'),
});

export const SignupSchema = yup.object().shape({
  username: yup.string()
    .required('lengthError')
    .min(3, 'lengthError')
    .max(20, 'lengthError'),
  password: yup.string()
    .min(6, 'lengthError')
    .required('lengthError'),
  confirmPassword: yup.string()
    .min(6, 'lengthError')
    .required('mismatch')
    .oneOf([yup.ref('password'), null], 'mismatch'),
});
