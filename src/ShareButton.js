// import React from 'react';
// import html2canvas from 'html2canvas';
// import cat from './cat.png'

// function ShareButton() {
//   const handleButtonClick = async () => {
//     const img = document.querySelector('img');
//     const canvas = await html2canvas(img);
//     const blob = await new Promise((resolve) => canvas.toBlob(resolve));
//     const fileName = 'cat.png';
//     const title = 'Cat in the snow';
//     const text = 'Getting cold feet...';

//     if ('share' in navigator) {
//       const data = {
//         files: [
//           new File([blob], fileName, {
//             type: blob.type,
//           }),
//         ],
//         title,
//         text,
//       };

//       if (navigator.share(data)) {
//         try {
//           await navigator.share(data);
//           return;
//         } catch (err) {
//           if (err.name !== 'AbortError') {
//             console.error(err.name, err.message);
//           }
//         }
//       }
//     }

//     // Fallback
//     const a = document.createElement('a');
//     a.download = fileName;
//     a.style.display = 'none';
//     a.href = URL.createObjectURL(blob);
//     a.addEventListener('click', () => {
//       setTimeout(() => {
//         URL.revokeObjectURL(a.href);
//         a.remove();
//       }, 1000);
//     });
//     document.body.append(a);
//     a.click();
//   };

//   return (
//     <>
//       <h1>Share a file</h1>
//       <img
//         width="200"
//         height="200"
//         alt="A cat walking in the snow."
//         src={cat}
//       />
//       <button onClick={handleButtonClick}>Share</button>
//     </>
//   );
// }

// export default ShareButton;

import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import cat from './cat.png';

function ShareButton() {
  const canvasRef = useRef(null);

  const handleButtonClick = async () => {
    const img = document.querySelector('img');
    const canvas = await html2canvas(img);
    canvasRef.current = canvas;
    const fileName = 'cat.png';
    const title = 'Cat in the snow';
    const text = 'Getting cold feet...';

    if ('share' in navigator) {
      canvas.toBlob((blob) => {
        const data = {
          files: [
            new File([blob], fileName, {
              type: blob.type,
            }),
          ],
          title,
          text,
        };

        navigator.share(data);
      });
    } else {
      const a = document.createElement('a');
      canvas.toBlob((blob) => {
        a.href = URL.createObjectURL(blob);
        a.download = fileName;
        a.click();
      });
    }
  };

  return (
    <>
      <h1>Share a file</h1>
      <img width="200" height="200" alt="A cat walking in the snow." src={cat} />
      <button onClick={handleButtonClick}>Share</button>
      <canvas style={{ display: 'none' }} ref={canvasRef} />
    </>
  );
}

export default ShareButton;