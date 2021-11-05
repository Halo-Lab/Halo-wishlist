import { FC, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import styles from './DateInput.module.scss';

export const DateInput: FC = () => {
  const [startDate, setStartDate] = useState<any>(new Date());

  return (
    <DatePicker
      wrapperClassName={styles.datePicker}
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      dateFormat="d MMMM , yyyy"
    />
  );
};
