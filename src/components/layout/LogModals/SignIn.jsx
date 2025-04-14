'use client';
import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '@/components/ui/inputs/MyTextInput';
import { Button, Divider } from '@heroui/react'; // Import HeroUI components
import { useDispatch } from 'react-redux';
import { openModal, closeModal } from '@/components/ui/modals/modalSlice';
import SocialLogin from '@/components/ui/socialLogin/SocialLogin';
import ModalWindow from '@/components/ui/modals/ModalWindow';
import { signInWithEmail } from '@/api/auth/authSlice';

export default function SignIn() {
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
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

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await dispatch(signInWithEmail({ email: values.email, password: values.password }));
      setSubmitting(false);
      dispatch(closeModal());
    } catch (error) {
      setSubmitting(false);
      setErrors({ auth: 'Wrong email or password' });
      console.log(error);
    }
  };

  return (
    <ModalWindow>
      <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-800" id="login-modal">
        <div className="space-y-6 mx-auto max-w-lg px-6">
          <div className="rounded-lg p-10 pb-5 bg-white dark:bg-gray-900">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, isValid, dirty, errors }) => (
                <Form>
                  <MyTextInput
                    label="Email"
                    name="email"
                    placeholder="example@xzy.com"
                    id="email"
                  />

                  <MyTextInput
                    label="Password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    id="password"
                  />
                  {errors.auth && (
                    <p className="text-red-500 text-sm">{errors.auth}</p>
                  )}
                  <br />

                  <div className="space-y-4">
                    <Button
                      isLoading={isSubmitting}
                      isDisabled={!isValid || !dirty || isSubmitting}
                      type="submit"
                      color="default"
                      variant="solid"
                      size="lg"
                      className="w-full bg-black text-white hover:bg-gray-800"
                      id="submit-button"
                    >
                      Sign In
                    </Button>
                    <Divider />
                    <SocialLogin />
                  </div>
                </Form>
              )}
            </Formik>
            <div className="pt-6">
              <p className="text-center">
                Not registered?{' '}
                <span
                  onClick={() => {
                    dispatch(closeModal());
                    dispatch(openModal({ modalType: 'SignUp' }));
                  }}
                  className="text-blue-500 cursor-pointer"
                >
                  Sign Up
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </ModalWindow>
  );
}
