<script setup>
import consImage from "@/assets/cons.png"
import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();
const isLoggedIn = ref(false);
</script>

<template>
    <section v-if="!isLoggedIn" id="apply" class="apply-section">
        <div class="content">
            <div class="left-content">
                <div class="header">
                    <font-awesome-icon :icon="['fas', 'briefcase']" class="brief-case-icon"/>
                    <h1>Зошто да станеш мајстор?</h1>
                </div>
                <p>Дали си професионалец кој сака да ја прошири својата кариера и да се поврзе со повеќе клиенти? Придружи се на нашата платформа денес и отклучи свет на можности!</p>
                <button @click="router.push('/apply')">Приклучи се сега<font-awesome-icon :icon="['fas', 'arrow-right']" class="arrow-icon"/></button>
            </div>
            <div class="right-content">
                <img :src="consImage" alt="Професионална слика" />
            </div>
        </div>

        <div id="how-it-works" class="how-it-works-section">
            <div class="container">
                <h2>Како функционира</h2>
                <div class="steps">
                    <div class="step">
                        <font-awesome-icon :icon="['fas', 'user-plus']" class="apply-icon"/>
                        <h3>Регистрирај се</h3>
                        <p>Регистрирај се на нашата платформа со пополнување на едноставна форма. Ќе ти одземе само неколку минути.</p>
                    </div>
                    <div class="step">
                        <font-awesome-icon :icon="['fas', 'check-circle']" class="apply-icon"/>
                        <h3>Креирај профил</h3>
                        <p>Постави професионален профил со твоите вештини, искуство и услугите што ги нудиш.</p>
                    </div>
                    <div class="step">
                        <font-awesome-icon :icon="['fas', 'search']" class="apply-icon"/>
                        <h3>Стекни клиенти</h3>
                        <p>Клиентите лесно ќе те пронајдат преку нашиот пребарувачки алгоритам, врз основа на твојата локација и експертиза.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.apply-section {
  padding: 120px 20px;
  background-color: #212529;
  position: relative;
  overflow: hidden;
  transition: background 0.3s ease;
}

.apply-section .content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  gap: 50px;
}

.apply-section .left-content {
  max-width: 600px;
  text-align: left;
}

.apply-section .left-content .header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
}

.apply-section .left-content .header .brief-case-icon  {
  font-size: 4rem;
  color: #ffc107;
  margin-right: 20px;
}

.apply-section .left-content h1 {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 25px;
  text-align: left;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.5);
  color: white;
}

.apply-section .left-content p {
  font-size: 1.4rem;
  line-height: 1.8;
  margin-bottom: 30px;
  color: white;
}

.apply-section .left-content button {
  background: #ffc107;
  color: #212529;
  border: none;
  padding: 18px 40px;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
  margin-top: 20px;
  border-radius: 8px;
  transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.apply-section .left-content button:hover {
  transform: scale(1.1);
  background: #e6a700;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.apply-section .left-content button .arrow-icon {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.apply-section .left-content button:hover .arrow-icon  {
  transform: translateX(10px);
}

.apply-section .right-content {
  flex: 1;
  text-align: center;
}

.apply-section .right-content img {
  width: 100%;
  max-width: 500px;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

#how-it-works-section {
  background-color: #f4f6f9;
  padding: 80px 20px;
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 80px;
}

h2 {
  text-align: center;
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 40px;
  font-weight: 600;
}

.steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  animation: fadeInUp 1.5s ease-out;
}

.step {
  background-color: #131518;
  padding: 40px;
  text-align: center;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
}

.apply-icon {
  font-size: 3rem;
  color: #ffc107;
  margin-bottom: 20px;
  transition: transform 0.3s ease, color 0.3s ease;
}

.step h3 {
  font-size: 1.8rem;
  color: #fff;
  margin-bottom: 15px;
  font-weight: 600;
}

.step p {
  font-size: 1.1rem;
  color: #c2c2c2;
  line-height: 1.6;
}

.step:hover {
  transform: translateY(-10px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.2);
}

.step:hover .apply-icon {
  color: #917934;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Media Queries for Responsiveness */
@media (max-width: 1024px) {
  .apply-section .right-content img {
    max-width: 80%;
    margin: 0 auto;
  }

  .apply-section .content {
    flex-direction: column;
    gap: 30px;
    text-align: center;
  }

  .apply-section .left-content {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  /* Center header for tablet and mobile devices */
  .apply-section .left-content .header {
    justify-content: center; /* Center horizontally */
    align-items: center;    /* Center vertically */
    gap: 15px;
  }
}

@media (max-width: 768px) {
  .apply-section .left-content h1 {
    font-size: 2.5rem;
  }

  .apply-section .content{
    display: flex;
    justify-content: center;
  }

  .apply-section .left-content p {
    font-size: 1.2rem;
  }

  .apply-section .left-content button {
    padding: 15px 30px;
    font-size: 18px;
  }

  .how-it-works-section .steps {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .how-it-works-section h2 {
    font-size: 2rem;
  }

  .step {
    padding: 20px;
  }

  .apply-icon {
    font-size: 2.5rem;
  }

  .step h3 {
    font-size: 1.6rem;
  }

  .step p {
    font-size: 1rem;
  }

  .apply-section .right-content img {
    display: none;
  }
}

@media (max-width: 480px) {
  .apply-section .left-content h1 {
    font-size: 2rem;
  }

  .apply-section .left-content p {
    font-size: 1rem;
  }

  .apply-section .left-content button {
    padding: 12px 25px;
    font-size: 16px;
  }

  .apply-section .right-content img {
    display: none;
  }

  .how-it-works-section h2 {
    font-size: 1.8rem;
  }

  .step h3 {
    font-size: 1.4rem;
  }

  .step p {
    font-size: 0.9rem;
  }
}
</style>
