<script setup>

</script>

<template>
<div>
  <footer>
        <div class="column">
            <h4>Категории</h4>
            <a href="#">Електричар</a>
            <a href="#">Чистач</a>
            <a href="#">Молер</a>
            <a href="#">Водоводџија</a>
            <a href="#">Техничар</a>
        </div>
        <div class="column">
            <h4>Компанија</h4>
            <a href="#">За нас</a>
            <a href="#">Кариера</a>
            <a href="#">Блог</a>
            <a href="#">Политика на приватност</a>
            <a href="#">Услови за користење</a>
        </div>
        <div class="column">
            <h4>Поддршка</h4>
            <a href="#">Центар за помош</a>
            <a href="#">Контактирајте нас</a>
            <a href="#">FAQs</a>
            <a href="#">Пријави проблем</a>
        </div>
        <div class="column">
            <h4>Следете нас</h4>
            <a href="#">
            <font-awesome-icon :icon="['fab', 'facebook-f']" class="social-icon"/> Facebook
            </a>
            <a href="#">
            <font-awesome-icon :icon="['fab', 'twitter']" class="social-icon"/> Twitter
            </a>
            <a href="#">
            <font-awesome-icon :icon="['fab', 'instagram']" class="social-icon"/> Instagram
            </a>
            <a href="#">
            <font-awesome-icon :icon="['fab', 'linkedin']" class="social-icon"/> LinkedIn
            </a>
        </div>
        <div class="column">
            <h4>Новости</h4>
            <form action="#">
                <input type="email" placeholder="Вашата емаил адреса" required>
                <button type="submit">Пријави се</button>
            </form>
        </div>
    </footer>

    <div class="footer-bottom">
        <p> &copy; 2025 Најди го твојот мајстор. Сите права се задржани.</p>
    </div>
</div>
</template>

<style scoped>
footer {
background-color: #212529;
color: white;
padding: 80px 20px;
display: flex;
justify-content: space-between;
flex-wrap: wrap;
font-size: 18px;
text-align: center;
animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
from {
  opacity: 0;
  transform: translateY(20px);
}
to {
  opacity: 1;
  transform: translateY(0);
}
}

footer .column {
flex: 1 1 250px;
margin-bottom: 30px;
padding: 0 20px;
}

footer h4 {
color: #ffc107;
margin-bottom: 20px;
font-size: 1.5rem;
transition: color 0.3s ease, transform 0.3s ease;
}

footer h4:hover {
color: #e0a800;
transform: scale(1.1);
}

footer a {
color: white;
text-decoration: none;
display: block;
margin-bottom: 10px;
transition: color 0.3s ease, transform 0.3s ease;
font-size: 1.2rem;
}

footer a:hover {
color: #ffc107;
transform: translateY(-5px);
}

footer form input {
padding: 15px;
border: none;
margin-right: 5px;
border-radius: 5px;
font-size: 1rem;
}

footer form button {
background-color: #ffc107;
color: white;
border: none;
margin-top: 10px;
padding: 15px;
border-radius: 5px;
cursor: pointer;
transition: background-color 0.3s ease, transform 0.3s ease;
font-size: 1rem;
}

footer form button:hover {
background-color: #e0a800;
transform: translateY(-5px);
}

@media (max-width: 768px) {
footer .column {
  flex: 1 1 100%;
  margin-bottom: 20px;
  padding: 0;
}
}

.footer-bottom {
background: linear-gradient(to bottom, #212529, #343a40);
color: white;
padding: 10px 20px;
text-align: center;
}
</style>
