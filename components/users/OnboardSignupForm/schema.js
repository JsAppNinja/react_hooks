import { object, string, ref } from 'yup';

export default object().shape({
  username: string().required('Benny handle is required.'),
  email: string()
    .email('Email must be a valid email')
    .required('Email is required.'),
  password: string().required('Password is required.'),
  passwordConfirm: string()
    .oneOf(
      [ref('password'), null],
      'Password and Confirm password should match'
    )
    .required('Confirm password is required')
});
