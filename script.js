document.addEventListener("DOMContentLoaded", () => {
    const coinsElement = document.getElementById("coins");
    const clickImage = document.getElementById("click-image");
    const referralButton = document.getElementById("referral-button");
    const referralLink = document.getElementById("referral-link");
    const leaderboardList = document.getElementById("leaderboard-list");

    // Инициализация Telegram Web App API


    // Получаем данные о кликах из localStorage или устанавливаем 0 по умолчанию
    let coins = parseInt(localStorage.getItem("coins")) || 0;
    coinsElement.textContent = coins;

    // API для обновления данных о пользователе
    const updateLeaderboardOnServer = async () => {
        const response = await fetch("https://your-render-app-url.com/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: userName,
                coins: coins
            })
        });

        if (response.ok) {
            console.log("Данные обновлены на сервере");
        }
    };

    // API для получения таблицы лидеров
    const getLeaderboardFromServer = async () => {
        const response = await fetch("https://your-render-app-url.com/leaderboard");
        if (response.ok) {
            const leaderboard = await response.json();
            leaderboardList.innerHTML = leaderboard
                .map(player => `<li>${player.username}: ${player.coins} кликов</li>`)
                .join("");
        }
    };

    // Обработчик клика по изображению
    const handleClick = () => {
        console.log("Клик зарегистрирован"); // Лог для проверки
        coins++;
        coinsElement.textContent = coins;
        localStorage.setItem("coins", coins);
        updateLeaderboardOnServer(); // Отправляем обновленные данные на сервер
    };

    // Обработчики событий для кликов по изображению
    clickImage.addEventListener("click", handleClick);
    clickImage.addEventListener("touchstart", handleClick); // для мобильных устройств

    // Проверим, если клики не срабатывают
    if (!clickImage) {
        console.error("Элемент с id 'click-image' не найден на странице");
    }

    // Обработчик для получения реферальной ссылки
    referralButton.addEventListener("click", () => {
        const botUsername = "YourBotUsername"; // Замените на имя вашего бота
        const refLink = `https://t.me/${botUsername}?start=${userName}`;
        referralLink.textContent = refLink;
        referralLink.style.cursor = "pointer";

        // Копирование ссылки в буфер обмена
        referralLink.addEventListener("click", () => {
            navigator.clipboard.writeText(refLink).then(() => {
                alert("Ссылка скопирована!");
            });
        });
    });

    // Загружаем таблицу лидеров при первом запуске
    getLeaderboardFromServer();
});
