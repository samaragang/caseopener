import React, { useEffect, useState } from 'react';
import './App.css'
import CaseItem from './CaseItem';

function GameComponent() {
  const [caseItemArray, setCaseItemArray] = useState([]);
  const caseItemSize = 205;
  const items = [
    { name: 'Кукри Градиент', type: 'gold' },
    { name: 'AWP | Хромовая пушка', type: 'red' },
    { name: 'AK-47 | Наследство', type: 'red' },
    { name: 'M4A1-S | Чёрный лотос', type: 'pink' },
    { name: 'USP-S | Зубоскал', type: 'pink' },
    { name: 'Zeus x27 | Олимп', type: 'pink' },
    { name: 'Five-SeveN | Гибрид', type: 'purple' },
    { name: 'Glock-18 | Блок-18', type: 'purple' },
    { name: 'M4A4 | Мастер травли', type: 'purple' },
    { name: 'MP7 | Улыбочка', type: 'purple' },
    { name: 'Sawed-Off | Аналоговый ввод', type: 'purple' },
    { name: 'Dual Berettas | Убежище', type: 'blue' },
    { name: 'MAC-10 Световой | короб', type: 'blue' },
    { name: 'Nova | Печать тьмы', type: 'blue' },
    { name: 'SSG 08 | Катастрофа', type: 'blue' },
    { name: 'Tec-9 | Шлак', type: 'blue' },
    { name: 'UMP-45 | Мотор', type: 'blue' },
    { name: 'XM1014 | Ирэдзуми', type: 'blue' },
  ];
  const rarity = {
    blue: 0.80,
    purple: 0.16,
    pink: 0.032,
    red: 0.0064,
    gold: 0.0026
  };



  const lerp = (min, max, value) => ((1 - value) * min + value * max);

  const drop = () => {
    const total = items.reduce((accumulator, item) => (accumulator + rarity[item.type]), 0);
    const chance = lerp(0, total, Math.random());

    let current = 0;
    for (const item of items) {
      if (current <= chance && chance < current + rarity[item.type]) {
        return item;
      }
      current += rarity[item.type];
    }
  };

  const populateItems = () => {
    const ulElement = document.querySelector('.scopeHidden > ul');

    const newItems = [];

    for (let i = 0; i < 25; i++) {
      const prizeItem = drop();

      newItems.push(prizeItem); // Добавляем каждый элемент в временный массив
    }

    // Обновляем состояние один раз после цикла
    setCaseItemArray(newItems);
    
    
    // Возвращаем ленту на начальное положение и отключаем анимацию
    ulElement.style.transition = 'none';
    ulElement.style.left = '0px';
  };


  useEffect(() => {
    populateItems();
  }, []);
  useEffect(() => {
    const ulElement = document.querySelector('.scopeHidden > ul');
    const caseItem = ulElement.querySelectorAll('.case-item')[17];
    const caseItemImg = caseItem ? caseItem.querySelector('.case-item__img') : null;
    console.log('caseItemImg', caseItemImg);
    if(caseItemImg){
       caseItemImg.style.transform = 'scale(1)';
    }
  }, [caseItemArray]);




  function startMove() {
    const ulElement = document.querySelector('.scopeHidden > ul');
    const move = -caseItemSize * 15;

    // Позволяем браузеру обработать изменения стиля
    requestAnimationFrame(() => {
      ulElement.style.transition = 'left 1s ease'; // Включаем анимацию
      ulElement.style.left = `${move}px`; // Запускаем анимацию
    });


    setTimeout(() => {
      handleTransitionEnd(ulElement);
    }, 1000);
  }

  const handleTransitionEnd = (ulElement) => {
    const caseItem = ulElement.querySelectorAll('.case-item')[17];
    console.log('caseItem', caseItem);
    const caseItemImg = caseItem ? caseItem.querySelector('.case-item__img') : null;
    caseItemImg.style.transform = 'scale(1.3)';
  };


  function startGame() {
    populateItems(); // Перезаполняем список элементами
    startMove(); // Запускаем прокрутку
  }

  return (
    <div>
      <div className="app">
        <img src="pointer.png" alt="" width="50" height="50" />
        <div className="scopeHidden">
          <ul>
            {caseItemArray && (caseItemArray.map((i, k) => {
              return <CaseItem key={k} itemInfo={i} />
            }))}
          </ul>
        </div>
        <button className="btn" onClick={startGame}>ОТКРЫТЬ</button>
      </div>
    </div>
  );
}

export default GameComponent;
