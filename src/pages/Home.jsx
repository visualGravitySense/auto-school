import GiftCard from "../components/GiftCard"
import Advantages from "../components/Advantages"
import TariffComparison from "../components/TariffComparison"
import Testimonials from "../components/Testimonials"
import Footer from "../components/Footer"

const Home = () => {
    return (
        <>
            <div className="container text-center mt-5">
                <h1>Добро пожаловать в нашу автошколу!</h1>
                <p>Получите права быстро и легко с нашими курсами!</p>
                <a href="/courses" className="btn btn-primary">Смотреть курсы</a>
            </div>

            <GiftCard />

            <Advantages />

            <TariffComparison />

            <Testimonials />

        </>
    );
  };
  
  export default Home;
  