import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const options = {
  position: toast.POSITION.BOTTOM_RIGHT,
  className: 'foo-bar',
  autoClose: 3000,
};

export function successes(text) {
  toast.success(text, options);
}
export function error(text) {
  toast.error(text, options);
}
export function warn(text) {
  toast.warn(text, options);
}
export function info(text) {
  toast.info(text, options);
}
