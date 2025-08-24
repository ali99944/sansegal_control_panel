// import React, { MouseEvent } from 'react';

// export const RippleButton: React.FC<{
//   children: React.ReactNode;
//   onClick?: () => void;
//   className?: string;
// }> = ({ children, onClick, className = '' }) => {
//   const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
//     const button = e.currentTarget;

//     const ripple = document.createElement('span');
//     ripple.className = 'ripple';

//     const rect = button.getBoundingClientRect();
//     const size = Math.max(rect.width, rect.height);
//     ripple.style.width = ripple.style.height = `${size}px`;

//     const x = e.clientX - rect.left - size / 2;
//     const y = e.clientY - rect.top - size / 2;
//     ripple.style.left = `${x}px`;
//     ripple.style.top = `${y}px`;

//     button.appendChild(ripple);

//     ripple.addEventListener('animationend', () => {
//       ripple.remove();
//     });

//     onClick?.();
//   };

//   return (
//     <button
//       onClick={handleClick}
//       className={`relative overflow-hidden px-6 py-1.5 rounded-md bg-primary text-white font-medium focus:outline-none ${className}`}
//     >
//       {children}
//     </button>
//   );
// };
