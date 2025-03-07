import GiftCard from "../components/GiftCard"

const Home = () => {
    return (
        <>
            <div className="container text-center mt-5">
                <h1>Добро пожаловать в нашу автошколу!</h1>
                <p>Получите права быстро и легко с нашими курсами!</p>
                <a href="/courses" className="btn btn-primary">Смотреть курсы</a>
            </div>

            <GiftCard />

        </>
    );
  };
  
  export default Home;
  