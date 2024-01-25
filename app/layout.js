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