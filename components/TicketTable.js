import React from 'react';
import { useState } from 'react';
import Link from 'next/link';

const convertToCSV = (data) => {
  const header = Object.keys(data[0]).join(',');
  const rows = data.map((obj) => Object.values(obj).join(','));
  return `${header}\n${rows.join('\n')}`;
};

const CsvTable = ({ data }) => {
  const [csvData, setCsvData] = useState('');

  const handleDownload = () => {
    const csvContent = convertToCSV(data);
    setCsvData(csvContent);

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'data.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Data Table</h1>
      <table className="border-collapse border w-full">
      <thead>
        <tr>
          {Object.keys(data[0]).map((header, index) => (
            <th key={index} className="border px-4 py-2">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} data-static-parameter={row.eventURL+" "+row.ticket_id}  >
            {Object.values(row).map((value, columnIndex) => (
              <td key={columnIndex} className="border px-4 py-2">
                {typeof value === 'object' ? (
                  // Handle nested object
                  Object.values(value).map((nestedValue, nestedIndex) => (
                    <div key={nestedIndex}>{nestedValue}</div>
                  ))
                ) : (
                  // Render non-object value
                  value
                )}
              </td>
            ))}
          </tr>
  
        ))}
      </tbody>
    </table>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
        onClick={handleDownload}
      >
        Download CSV
      </button>
      <textarea
        className="hidden"
        value={csvData}
        readOnly
      />
    </div>
  );


};

export default CsvTable;


//<Link href={`/ticket?event=${row.eventURL}&id=${row.ticket_id}`} key={row._id}></Link>
  //      </Link>