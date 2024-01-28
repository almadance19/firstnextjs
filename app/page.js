import Feed from "@components/Feed";

const Home = () => (
  <section className='w-full flex-center flex-col'>
    <h1 className='head_text text-center'>
      Discover & Save
      <br className='max-md:hidden' />
      <span className='orange_gradient text-center'> Your Dancing Event Tickets</span>
    </h1>
    <p className='desc text-center'>
      My Ticket is a platform for dancers & organisers to discover and save their dancing event tickets.
    </p>

    <Feed />
  </section>
);

export default Home;