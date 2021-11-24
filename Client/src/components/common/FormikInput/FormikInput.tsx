import cn from 'classnames';
import { Field, useField } from 'formik';
import { FC } from 'react';

import styles from './FormikInput.module.scss';

interface Props {
  name: string;
  type: string;
  placeholder?: string;
  className?: any;
  as?: string;
  rows?: string;
  disabled?: true;
}

export const FormikTextInput: FC<Props> = (props) => {
  const [field, meta] = useField(props);

  return (
    <>
      <Field
        {...field}
        {...props}
        appearance={meta.error && meta.touched ? 'danger' : null}
        message={meta.error && meta.touched ? meta.error : null}
        className={cn(styles.input, props.className)}
      />
      {meta.error && meta.touched ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </>
  );
};
