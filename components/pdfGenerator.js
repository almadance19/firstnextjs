import React from 'react';
import html2pdf from 'html2pdf.js';

const PdfGenerator = ({ data }) => {
  const generatePdf = () => {
    const element = document.getElementById('pdfContent');

    // Set the visibility and position properties
    element.style.visibility = 'hidden';
    element.style.position = 'absolute';
    element.style.left = '-9999px';

    // Generate the PDF
    html2pdf(element);

    // Reset the visibility and position properties after generating the PDF
    element.style.visibility = 'visible';
    element.style.position = 'static';
    element.style.left = 'auto';
  };

  return (
    <div>
      <button onClick={generatePdf} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Generate PDF
      </button>

      <div id="pdfContent">
        {/* Render your HTML or JSON data here */}
        <h1>PDF Content</h1>
        {/* Example: */}
        <p>{JSON.stringify(data, null, 2)}</p>
      </div>
    </div>
  );
};

export default PdfGenerator;
