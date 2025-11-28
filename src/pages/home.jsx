
import Highlight1 from "../components/Highlight1";
import Highlight2 from "../components/Highlight2";

function Home() {

    return (
    <>
      {/* Buat Highlight */}
      <section className='highlight'>
        <h1>HIGHLIGHTS</h1>
        <Highlight1 />
        <Highlight2 />
      </section>
    </>
    );
}

export default Home;