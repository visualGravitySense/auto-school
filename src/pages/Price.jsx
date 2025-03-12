import HeroBlock from "../components/HeroBlock"
import TariffComparison from "../components/TariffComparison"
import PricingTable from "../components/PricingTable"

const heroData = {
    // buttonLink: '/courses',
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