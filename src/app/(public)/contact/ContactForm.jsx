'use client'
import React from 'react';
import { Button, addToast } from '@heroui/react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { MdEmail } from 'react-icons/md';
import { FaMastodon } from 'react-icons/fa';
import { BsGithub } from 'react-icons/bs';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import MyTextInput from '../../../components/ui/inputs/MyTextInput';
import TextareaInput from '../../../components/ui/inputs/TextareaInput';
import { db } from '../../../api/firebase-config.js';

const ContactForm = () => {
  const initialValues = {
    name: '',
    surname: '',
    email: '',
    message: '',
  };

  const handleClick = () => {
    window.location.href = 'mailto:matteo.dirollo@icloud.com';
  };

  const collectData = async values => {
    const contactsPageCollectionRef = collection(db, 'Contact_Form');
    await addDoc(contactsPageCollectionRef, {
      name: values.name,
      surname: values.surname,
      email: values.email,
      message: values.message,
      time: Timestamp.now(),
    });
  };

  const validationSchema = Yup.object({
    name: Yup.string().min(3, 'Too short!').required('Required'),
    surname: Yup.string().min(3, 'Too short!').required('Required'),
    email: Yup.string()
      .min(3, 'Too short!')
      .required('Required')
      .email('Invalid email'),
    message: Yup.string().min(10, 'Too short!').required('Required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await collectData(values);
      resetForm();
      addToast({
        title: 'Message sent',
        description: 'Your message has been sent successfully!',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      addToast({
        title: 'Error',
        description: 'Something went wrong. Please try again later.',
        status: 'error',
        duration: 3000,
      });
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center my-20">
      <div className="mx-10 min-w-[250px] md:min-w-[300px] lg:min-w-[500px] max-w-[700px]">
        <h1 className="text-black text-2xl font-bold">{'Let\'s work together!'}</h1>
        <p className="mt-5 text-black">
          {'Do you have a project in mind? Let\'s collaborate and bring it to life! From logos and websites to infographics and animations, I can create captivating designs tailored to your needs. Get in touch today and let\'s make something amazing together!'}
        </p>

        <Button
          color="danger"
          startContent={<MdEmail />}
          variant="bordered"
          className="mt-5 md:mt-10 px-4 py-2 border-2 border-black text-black hover:bg-gray-200 flex items-center"
          onPress={handleClick}
        >
          matteo.dirollo@icloud.com
        </Button>

        <div className="flex mt-10 space-x-5">
          <Button isIconOnly aria-label="Github" color="danger">
            <BsGithub size="28px" />
          </Button>
          <Button isIconOnly aria-label="Mastodon" color="danger">
            <FaMastodon size="28px" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col justify-center mx-10 md:mx-0 mt-10 md:mt-0">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid, dirty, errors }) => (
            <form className="space-y-5">
              <MyTextInput label="Name" name="name" />
              <MyTextInput label="Last Name" name="surname" />
              <MyTextInput
                label="Email"
                name="email"
                placeholder="youremail@xzy.com"
              />
              <TextareaInput label="Message" name="message" />

              {errors.auth && (
                <p className="text-red-500 text-sm">{errors.auth}</p>
              )}

              <Button
                isLoading={isSubmitting}
                disabled={!isValid || !dirty || isSubmitting}
                type="submit"
                className="bg-black text-white hover:bg-gray-800 px-5 py-3 mt-6"
              >
                Send
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ContactForm;
