import '@styles/global.css'


import Nav from "@components/Nav";
import Provider from "@components/Provider";
import Footer from '@components/Footer';
import Header from '@components/Header';

export const metadata = {
  title: "My Event Ticket",
  description: "Save and Post your Event Tickets",
};

const RootLayout = ({ children }) => (
  <html lang='en' >
    <head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />

      <title>{metadata.title}</title>
      <meta name='description' content={metadata.description} />

      <link rel='icon' href='/favicon.ico' />
      <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
    </head>
    <body className='	primary-content'>
      <Provider>
        <Header />
        <main  className='.app2  pt-10 	primary-content '>
        <section className='padding'>
        {children}
        </section>
        </main>
        <Footer />
      </Provider>
    </body>
  </html>
);

export default RootLayout;