import Header from "../components/Header";
import Highlight1 from "../components/Highlight1";

function Home() {

    return (
    <>
      {/* Buat Highlight */}
      <section className='highlight'>
        <h1>HIGHLIGHTS</h1>
        <Highlight1 />
      </section>
    </>
    );
}

export default Home;