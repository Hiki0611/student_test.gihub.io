// Загрузка данных о домах
document.addEventListener('DOMContentLoaded', () => {
    fetch('houses.json')
        .then(response => {
            if (!response.ok) throw new Error('Не удалось загрузить houses.json');
            return response.json();
        })
        .then(data => {
            const housesGrid = document.querySelector('.houses-grid');
            data.forEach(house => {
                const card = document.createElement('div');
                card.classList.add('house-card');
                card.innerHTML = `
                    <img src="${house.image}" alt="${house.name}" onerror="this.src='images/fallback.jpg'; this.alt='Изображение не найдено';">
                    <h2>${house.name}</h2>
                    <p>${house.price}</p>
                    <button class="details-toggle">Подробнее</button>
                    <div class="house-details">
                        <p>Расположение: ${house.location}</p>
                        <p>Электричество: ${house.electricity}</p>
                        <p>Горячая вода: ${house.hotWater}</p>
                        <p>${house.description}</p>
                        <a href="${house.mapLink}" target="_blank">Посмотреть на карте</a>
                    </div>
                `;
                housesGrid.appendChild(card);
            });

            // Обработчики для кнопок "Подробнее"
            document.querySelectorAll('.details-toggle').forEach(btn => {
                btn.addEventListener('click', () => {
                    const details = btn.nextElementSibling;
                    details.classList.toggle('open');
                    btn.textContent = details.classList.contains('open') ? 'Закрыть' : 'Подробнее';
                });
            });

            // Ленивая загрузка карточек
            const cards = document.querySelectorAll('.house-card');
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            cards.forEach(card => observer.observe(card));
        })
        .catch(error => console.error('Ошибка:', error));

    // Кнопка "Подробнее" в секции "Обо мне"
    const detailsBtn = document.querySelector('.details-btn');
    const fullInfo = document.querySelector('.full-info');
    detailsBtn.addEventListener('click', () => {
        fullInfo.classList.toggle('hidden');
        detailsBtn.textContent = fullInfo.classList.contains('hidden') ? 'Подробнее' : 'Скрыть';
    });
});