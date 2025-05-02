'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('Qqqq1234!', 10); 
    
    // Создаём пользователя
    const [userId] = await queryInterface.bulkInsert('Users', [{
      username: 'Admin',
      email: 'admin@example.com',
      password: hashedPassword, 
      createdAt: new Date(),
      updatedAt: new Date()
    }], {
      returning: ['id']
    });

  
  await queryInterface.bulkInsert('Cards', [
    {
      title: 'Начальный уровень/прокат для детей',
      description: 'Начальный уровень: Идеально Подойдёт новичкам, детям,  тем, кто ни разу в жизни не катался на мотоцикле.',
      authorId: 1,
      price: 2500,
      url: 'https://startmoto.pro/wa-data/public/photos/73/14/1473/1473.970.png',
      createdAt: new Date(), 
      updatedAt: new Date()  
    },
    {
      title: 'Мото-тур',
      description: `Средний уровень: Идеальный вариант для тех, кто освоил технику управления, трасса по лесу для разного уровня подготовки .
Вы катались давно, но остались приятные воспоминания о мотоцикле? Или Вы ездите на дорожном мотоцикле, а так хочется порыхлить землю "зубастой" резиной?`,
      authorId: 1,
      price: 3000,
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoG4hESzum7j4QwsqwQGiOpHQBKUUb0EyR-faQ0sZqGABVrJapbGMahGbFZpZAcEdjgjQ&usqp=CAU',
      createdAt: new Date(), 
      updatedAt: new Date()  
    },
    {
      title: 'Экстремальный кросс',
      description: 'Для опытных райдеров: прыжки, крутые виражи и сложные трассы. Полный адреналин!',
      authorId: 1,
      price: 4500,
      url: 'https://moto-velik.ru/upload/iblock/7a3/7a3b9a0f1d3e5f8e7b6a5d4c3e2f1a0.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Ночной заезд с инструктором',
      description: 'Уникальный опыт ночного катания с профессиональным инструктором. Оборудование включено.',
      authorId: 1,
      price: 5000,
      url: 'https://motocross.ru/wp-content/uploads/2022/03/night-ride.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Групповой тур на целый день',
      description: 'Групповой тур по живописным местам с остановками на обед и фотосессии. 8 часов катания.',
      authorId: 1,
      price: 8000,
      url: 'https://adventure.com/wp-content/uploads/2021/05/moto-group-tour.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Индивидуальное обучение',
      description: 'Персональные занятия с инструктором для быстрого прогресса. Подбор программы под ваш уровень.',
      authorId: 1,
      price: 6000,
      url: 'https://ridingacademy.com/images/private-lessons.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
},

async down(queryInterface, Sequelize) {
  // Удаляем в правильном порядке из-за foreign key constraints
  await queryInterface.bulkDelete('Cards', null, {});
  await queryInterface.bulkDelete('Users', { email: 'admin@example.com' }, {});
}
};
    
