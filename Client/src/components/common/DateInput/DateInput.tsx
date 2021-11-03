import uk from 'date-fns/locale/uk';
import { FC, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import styles from './DateInput.module.scss';

registerLocale('uk', uk);

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
