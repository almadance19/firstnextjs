"use client"
import React, { useState } from 'react';

const pdfButton = () => {
  const [htmlContent, setHtmlContent] = useState('');

  const handleGeneratePDF = async () => {
    try {
      // Replace this with the actual HTML content you want to send
    
      //const yourHtmlContent = document.getElementById('pdfContent');
      //const htmlContent = yourHtmlContent.outerHTML; // Get the raw HTML content
      const yourHtmlContent = generateHtmlTemplate(params);

     // Set the visibility and position properties
  

      console.log(yourHtmlContent);

      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ htmlContent: yourHtmlContent }),
      });

      if (response.ok) {
        const pdfBlob = await response.blob();
        const pdfUrl = URL.createObjectURL(pdfBlob);

        // Optionally, you can open the PDF in a new tab or window
        window.open(pdfUrl, '_blank');
      // Set the visibility and position properties back to


      } else {
        console.error('Failed to generate PDF');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const params = {
    cinemaName: 'Your Cinema',
    movieTitle: 'The Movie',
    userName: 'John Doe',
    seatNumber: '123',
    showTime: '18:30',
};



  const generateHtmlTemplate = (params) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Puppeteer PDF Template</title>
    <style>
        /* Include your CSS styles here */
        $red: #e84c3d;
$grey: #ecedef;
$black: #343434;

.cardWrap {
  width: 27em;
  margin: 3em auto;
  color: #fff;
  font-family: sans-serif;
}

.card {
  background: linear-gradient(to bottom, $red 0%, $red 26%, $grey 26%, $grey 100%);
  height: 11em;
  float: left;
  position: relative;
  padding: 1em;
  margin-top: 100px;
}

.cardLeft {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  width: 16em;
}

.cardRight {
  width: 6.5em;
  border-left: .18em dashed #fff;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  &:before,
  &:after {
    content: "";
    position: absolute;
    display: block;
    width: .9em;
    height: .9em;
    background: #fff;
    border-radius: 50%;
    left: -.5em;
  }
  &:before {
    top: -.4em;
  }
  &:after {
  bottom: -.4em;
  }
}

h1 {
  font-size: 1.1em;
  margin-top: 0;
  span {
    font-weight: normal;
  }
}

.title, .name, .seat, .time {
  text-transform: uppercase;
  font-weight: normal;
  h2 {
    font-size: .9em;
    color: #525252;
    margin: 0;
   }
  span {
    font-size: .7em;
    color: #a2aeae;
  }
}

.title {
  margin: 2em 0 0 0;
}

.name, .seat {
  margin: .7em 0 0 0;
}

.time {
  margin: .7em 0 0 1em;
}

.seat, .time {
  float: left;
}

.eye {
  position: relative;
  width: 2em;
  height: 1.5em;
  background: #fff;
  margin: 0 auto;
  border-radius: 1em/0.6em;
  z-index: 1;
  &:before, &:after {
    content:"";
    display: block;
    position: absolute;
    border-radius: 50%;
  }
  &:before {
    width: 1em;
    height: 1em;
    background: $red;
    z-index: 2;
    left: 8px;
    top: 4px;
  }
  &:after {
  width: .5em;
  height: .5em;
  background: #fff;
  z-index: 3;
  left: 12px;
  top: 8px;
  }
}

.number {
  text-align: center;
  text-transform: uppercase;
  h3 {
    color: $red;
    margin: .9em 0 0 0;
    font-size: 2.5em;
    
  }
  span {
    display: block;
    color: #a2aeae;
  }
}

.barcode {
  height: 2em;
  width: 0;
  margin: 1.2em 0 0 .8em;
  box-shadow: 1px 0 0 1px $black,
  5px 0 0 1px $black,
  10px 0 0 1px $black,
  11px 0 0 1px $black,
  15px 0 0 1px $black,
  18px 0 0 1px $black,
  22px 0 0 1px $black,
  23px 0 0 1px $black,
  26px 0 0 1px $black,
  30px 0 0 1px $black,
  35px 0 0 1px $black,
  37px 0 0 1px $black,
  41px 0 0 1px $black,
  44px 0 0 1px $black,
  47px 0 0 1px $black,
  51px 0 0 1px $black,
  56px 0 0 1px $black,
  59px 0 0 1px $black,
  64px 0 0 1px $black,
  68px 0 0 1px $black,
  72px 0 0 1px $black,
  74px 0 0 1px $black,
  77px 0 0 1px $black,
  81px 0 0 1px $black;
}
    </style>
</head>
<body>
    <div class="cardWrap">
        <div class="card cardLeft">
            <h1>Hola <span id="cinemaName">${params.cinemaName || 'Cinema'}</span></h1>
            <div class="title">
                <h2 id="movieTitle">${params.movieTitle || 'How I met your Mother'}</h2>
                <span>movie</span>
            </div>
            <div class="name">
                <h2 id="userName">${params.userName || 'Vladimir Kudinov'}</h2>
                <span>name</span>
            </div>
            <div class="seat">
                <h2 id="seatNumber">${params.seatNumber || '156'}</h2>
                <span>seat</span>
            </div>
            <div class="time">
                <h2 id="showTime">${params.showTime || '12:00'}</h2>
                <span>time</span>
            </div>
        </div>
        <div class="card cardRight">
            <div class="eye"></div>
            <div class="number">
                <h3 id="seatNumberBig">${params.seatNumber || '156'}</h3>
                <span>seat</span>
            </div>
            <div class="barcode"></div>
        </div>
    </div>

    <script>
        // JavaScript to set dynamic values
        const setElementContent = (id, value) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        };

        setElementContent('cinemaName', '${params.cinemaName || 'Cinema'}');
        setElementContent('movieTitle', '${params.movieTitle || 'How I met your Mother'}');
        setElementContent('userName', '${params.userName || 'Vladimir Kudinov'}');
        setElementContent('seatNumber', '${params.seatNumber || '156'}');
        setElementContent('showTime', '${params.showTime || '12:00'}');
        setElementContent('seatNumberBig', '${params.seatNumber || '156'}');
    </script>
</body>
</html>
`;

  return (
    <div>
      {/* Your existing content */}
      <h1>PDF GENERATION</h1>

      {/* Button to trigger PDF generation */}
      <button onClick={handleGeneratePDF}>Generate PDF</button>
    </div>
  );
};

export default pdfButton;


