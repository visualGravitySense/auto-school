import logo from '../assets/viktorija-logo.png'; // Путь к вашему логотипу

function ImageGrid() {
    return (
        <>
            <h2 className="text-2xl font-bold text-center mt-5">Партнеры</h2>

            <div className="flex flex-wrap justify-center items-center gap-8 p-6 bg-white rounded-lg">
            
                <div className="flex justify-center items-center gap-8 w-full">
                    <img src="/images/teooria.png" alt="Teooria" className="h-16" />
                    <img src="/images/liikluslab.png" alt="Liikluslab" className="h-16" />
                </div>

                <div className="flex justify-center items-center gap-8 w-full">
                    <img src="/images/maanteeamet.png" alt="Maanteeamet" className="h-16" />
                    <img src="/images/creditinfo.png" alt="Creditinfo" className="h-16" />
                </div>
            </div>
                
            
        </>
    );
  }
  
  export default ImageGrid;
  