import Image from '../ImageComponent/Image';

import LoaderImage from '../../../assets/svg/IconLogo.svg';

import styles from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <Image src={LoaderImage} alt="loader image logo" width={100} />
    </div>
  );
};
