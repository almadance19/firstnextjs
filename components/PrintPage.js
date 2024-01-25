import React from 'react';

const PrintButton = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <button className='btn btn-active btn-secondary' onClick={handlePrint}>Print Page</button>
      {/* Your other page content */}
    </div>
  );
};

export default PrintButton;