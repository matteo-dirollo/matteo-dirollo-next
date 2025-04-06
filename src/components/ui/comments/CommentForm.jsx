import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addComment, fetchComments } from '@/app/(public)/projects/postsSlice';
import {
  appLoaded,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from '../../../api/asyncSlice';
import TextareaInput from '../inputs/TextareaInput';
import { Button } from '@heroui/react';

const CommentForm = ({ articleId }) => {
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    comment: Yup.string().required('Comment is required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    dispatch(asyncActionStart());
    try {
      dispatch(addComment({ postId: articleId, comment: values.comment }));
      resetForm();
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    } finally {
      dispatch(fetchComments(articleId));
      setSubmitting(false);
      dispatch(asyncActionFinish());
      dispatch(appLoaded());
    }
  };

  return (
    <Formik
      initialValues={{ comment: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form>
          <TextareaInput name="comment" />
          <Button
            type="submit"
            className={`mt-5 px-4 py-2 rounded-md text-white font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-black hover:bg-gray-800'
            } ${!isValid || !dirty ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!isValid || !dirty || isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Add Comment'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CommentForm;
