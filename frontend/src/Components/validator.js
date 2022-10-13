import * as yup from 'yup';

const schema = (arr) => yup
  .string()
  .min(3, 'lengthError')
  .max(20, 'lengthError')
  .required('required')
  .notOneOf(arr, 'duplicate');

const validator = (NameChannelsArr, string) => schema(NameChannelsArr).validate(string);
export default validator;

export const SignupSchema = yup.object().shape({
  username: yup.string()
    .min(3, 'lengthError')
    .max(20, 'lengthError')
    .required('required'),
  password: yup.string()
    .min(6, 'lengthError')
    .required('required'),
  confirmPassword: yup.string()
    .min(6, 'lengthError')
    .required('required')
    .oneOf([yup.ref('password'), null], 'mismatch'),
});
