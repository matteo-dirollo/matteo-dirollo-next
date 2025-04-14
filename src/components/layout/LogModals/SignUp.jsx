'use client'
import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '@/components/ui/inputs/MyTextInput';
import { Button, Divider } from '@heroui/react';
import { useDispatch } from 'react-redux';
import { openModal, closeModal } from '@/components/ui/modals/modalSlice';
import SocialLogin from '@/components/ui/socialLogin/SocialLogin';
import ModalWindow from '@/components/ui/modals/ModalWindow';
import { registerUser } from '@/api/auth/authSlice';

export default function SignUp({ onClose }) {
  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    last: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Too short')
      .required('Required')
      .matches(
        "^([A-Z\\u00C0-\\u00D6\\u00D8-\\u00DE])([a-z\\u00DF-\\u00F6\\u00F8-\\u00FF '&-]+)$",
        'Start with a capital letter and numbers are not allowed'
      ),
    last: Yup.string()
      .min(3, 'Too short')
      .required('Required')
      .matches(
        "^([A-Za-z\\u00C0-\\u00D6\\u00D8-\\u00DE\\u00DF-\\u00F6\\u00F8-\\u00FF '&-]+)$",
        'Start with a capital letter and numbers are not allowed'
      ),
    email: Yup.string()
      .min(3, 'Too short!')
      .required('Required')
      .email('Invalid email'),
    password: Yup.string()
      .min(8, 'Passwords must be at least 8 characters long')
      .max(30, 'Too long!')
      .required('Required')
      .matches(
        '^(?=.*\\d)(?=.*[a-z]).{8,}$',
        'Must contain at least 8 characters and one number'
      ),
  });

  const handleRegister = async (values, { setSubmitting, setErrors }) => {
    try {
      await dispatch(registerUser({ email: values.email, password: values.password, values: values }));
      setSubmitting(false);
      onClose();
      dispatch(closeModal());
    } catch (error) {
      setSubmitting(false);
      setErrors({ auth: 'You already have an account with these credentials' });
      console.log(error);
    }
  };

  return (
    <ModalWindow>
      <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-800">
        <div className="space-y-6 mx-auto max-w-lg px-6">
          <div className="rounded-lg p-10 pb-5">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleRegister}
            >
              {({ isSubmitting, isValid, dirty, errors }) => (
                <Form>
                  <div className="flex gap-3">
                    <MyTextInput label="Name" name="name" errors={errors} />
                    <MyTextInput label="Last Name" name="last" errors={errors} />
                  </div>

                  <MyTextInput
                    label="Email"
                    name="email"
                    placeholder="example@xzy.com"
                    errors={errors}
                  />

                  <MyTextInput
                    label="Password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    errors={errors}
                  />
                  {errors.auth && (
                    <p className="text-red-500 text-sm">{errors.auth}</p>
                  )}
                  <br />
                  <div className="space-y-5">
                    <Button
                      isLoading={isSubmitting}
                      disabled={!isValid || !dirty || isSubmitting}
                      type="submit"
                      className="bg-black text-white hover:bg-gray-800 w-full"
                    >
                      Sign Up
                    </Button>
                    <Divider className="my-4" />
                    <SocialLogin />
                  </div>
                </Form>
              )}
            </Formik>
            <div className="pt-6">
              <p className="text-center">
                Already a user?{' '}
                <button
                  onClick={() => {
                    dispatch(closeModal());
                    dispatch(openModal({ modalType: 'SignIn' }));
                  }}
                  className="text-blue-400 hover:underline"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </ModalWindow>
  );
}
