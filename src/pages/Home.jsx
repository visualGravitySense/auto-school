import GiftCard from "../components/GiftCard"
import Advantages from "../components/Advantages"
import TariffComparison from "../components/TariffComparison"
import Testimonials from "../components/Testimonials"
import HeroBlock from "../components/HeroBlock"

const heroData = {
    title: 'Добро пожаловать в нашу автошколу!',
    description: 'Получите права быстро и легко с нашими курсами!',
    buttonText: 'Смотреть курсы',
    buttonLink: '#services',
    imageUrl: '/images/services.jpg',
  };

const Home = () => {
    return (
        <>
            <HeroBlock {...heroData} />

            <GiftCard />

            <Advantages />

            <TariffComparison />

            <Testimonials />

        </>
    );
  };
  
  export default Home;
  