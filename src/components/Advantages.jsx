import { useState } from "react";
import { useTranslation } from 'react-i18next';

const Advantages = () => {
    const { t, i18n } = useTranslation();
    
    const advantagesLeft = [
        { icon: "🚀", title: "Быстрое обучение", description: "Освойте навыки за короткий срок." },
        { icon: "🎓", title: "Лучшие преподаватели", description: "Обучение у профессионалов." },
      ];
    
      const advantagesRight = [
        { icon: "💼", title: "Практическая польза", description: "Получите востребованные навыки." },
        { icon: "🌍", title: "Доступно онлайн", description: "Учитесь в любое время и в любом месте." },
      ];

    return (
        <>
            <div className="text-black p-6 rounded-lg w-full max-w-4xl mx-auto border-2 border-white text-center">
                <h2 className="text-2xl font-bold">Наши преимущества</h2>
                <p className="mt-2 text-lg">Почему стоит выбрать нас?</p>
                
                <div className="flex items-center justify-center mt-6 gap-8">
                    <div className="flex flex-col gap-6 text-left">
                    {advantagesLeft.map((adv, index) => (
                        <div key={index} className="flex items-center gap-3">
                        <span className="text-3xl">{adv.icon}</span>
                        <div>
                            <h3 className="font-bold">{adv.title}</h3>
                            <p className="text-sm">{adv.description}</p>
                        </div>
                        </div>
                    ))}
                    </div>
                    
                    <div className="w-40 h-40 rounded-lg">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/RACT-training-car-Burnie-20150216-003.jpg/330px-RACT-training-car-Burnie-20150216-003.jpg" alt="Education" className="w-full h-full object-cover rounded-lg" />
                    </div>
                    
                    <div className="flex flex-col gap-6 text-left">
                        {advantagesRight.map((adv, index) => (
                            <div key={index} className="flex items-center gap-3">
                            <span className="text-3xl">{adv.icon}</span>
                            <div>
                                <h3 className="font-bold">{adv.title}</h3>
                                <p className="text-sm">{adv.description}</p>
                            </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Advantages;