import HeroBlock from "../components/HeroBlock"
import TariffComparison from "../components/TariffComparison"
import PricingTable from "../components/PricingTable"

const heroData = {
    title: 'Доступные цены на обучение вождению',
    description: 'Выберите подходящий курс и начните обучение с профессиональными инструкторами. Прозрачные тарифы без скрытых платежей.',
    buttonText: 'Посмотреть тарифы',
    buttonLink: '#pricing',
    imageUrl: '/images/pricing.jpg',
};

const Price = () => {

    return (
        <>

            <HeroBlock {...heroData} />

            <PricingTable />

            <TariffComparison />

        </>
    );
};

export default Price;