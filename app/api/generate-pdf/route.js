// pages/api/generate-pdf.js

import puppeteer from 'puppeteer';

export const POST = async (req, res) => {
  try {

    const { htmlContent} = await req.json();

    console.log('HTML CONTENT:', htmlContent);

    if (!htmlContent) {
      
      return new Response(JSON.stringify("URL DOES NOT EXISTS OR IS WRONG"), { status: 400 })
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    await page.emulateMediaType('screen');

    await page.setContent(htmlContent);

    const pdfBuffer = await page.pdf();

    await browser.close();

    const response = new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
      },
    });

    return response;

  } catch (error) {
    console.error('Error retrieving Stripe session:', error);
                
    // Handle the error, for example, by returning a response with an error status
    return new Response(JSON.stringify("Error retrieving Stripe session"), { status: 500 });
  }
}

