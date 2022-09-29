import * as yup from 'yup';

const schema = (arr) => yup
  .string()
  .min(3, 'lengthError')
  .max(20, 'lengthError')
  .required('required')
  .notOneOf(arr, 'duplicate');

const schemaUserName = () => yup
  .string()
  .min(3, 'lengthError')
  .max(20, 'lengthError')
  .required('required');

export const validateUsername = (username) => schemaUserName().validate(username);

const schemaPassword = () => yup
  .string()
  .min(6, 'lengthError')
  .required('required');

export const validatePassword = (password) => schemaPassword().validate(password);

const schemaconfirmPassword = (password) => yup
  .string()
  .oneOf([password], 'mismatch')
  .required('required');

export const validateConfirmPassword = (password, confPassword) => schemaconfirmPassword(password)
  .validate(confPassword);

const validator = (NameChannelsArr, string) => schema(NameChannelsArr).validate(string);
export default validator;
