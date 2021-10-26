import React, { FC } from 'react';

interface IEyePass {
  changeColor: (e: React.MouseEvent<HTMLSpanElement>) => void;
  visible: number;
}

export const EyePass: FC<IEyePass> = ({ changeColor, visible }) => {
  return (
    <span onClick={changeColor}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity={visible} clipPath="url(#clip0_18:171)">
          <path
            d="M6.59984 2.82666C7.05872 2.71924 7.52855 2.66555 7.99984 2.66666C12.6665 2.66666 15.3332 7.99999 15.3332 7.99999C14.9285 8.75706 14.4459 9.46982 13.8932 10.1267M9.41317 9.41332C9.23007 9.60982 9.00927 9.76743 8.76394 9.87674C8.51861 9.98605 8.25377 10.0448 7.98523 10.0496C7.71669 10.0543 7.44995 10.0049 7.20091 9.90432C6.95188 9.80373 6.72565 9.65401 6.53573 9.46409C6.34582 9.27418 6.1961 9.04795 6.09551 8.79892C5.99492 8.54988 5.94552 8.28314 5.95026 8.0146C5.955 7.74606 6.01378 7.48122 6.12309 7.23589C6.2324 6.99056 6.39001 6.76976 6.5865 6.58666M11.9598 11.96C10.8202 12.8287 9.43258 13.3099 7.99984 13.3333C3.33317 13.3333 0.666504 7.99999 0.666504 7.99999C1.49576 6.45459 2.64593 5.1044 4.03984 4.03999L11.9598 11.96Z"
            stroke="#25282B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M0.666504 0.666664L15.3332 15.3333"
            stroke="#25282B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_18:171">
            <rect width="16" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </span>
  );
};
