import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

import useSocket from '../../hooks/socket.js';
import { closeModal } from '../../slices/modalSlice';
import { newChannelSchema } from '../../validation/validationSchema';
import ModalInput from './ModalInput.jsx';

const AddChannel = () => {
  const { addNewChannel } = useSocket();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { channels } = useSelector((state) => state.channels);
  const { modals } = useSelector((state) => state.modals);
  const { isShown } = modals;

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: newChannelSchema(channels, t('modal.unique'), t('modal.lengthParams')),
    onSubmit: (values) => {
      addNewChannel({ name: values.channelName });
      formik.resetForm();
      dispatch(closeModal());
      toast.success(t('success.newChannel'));
    },
  });

  const handleClose = () => dispatch(closeModal());

  const values = {
    isShown,
    handleClose,
    labelName: t('modal.canalName'),
    title: t('modal.add'),
    formik,
    cancelButton: t('cancel'),
    submitButton: t('send'),
  };

  return (
    <ModalInput values={values} />
  );
};

export default AddChannel;
