<template>
  <nav class="navbar">
    <ul class="navbar__list">
      <li class="navbar__list-item">
        <router-link to="/">Главная</router-link>
      </li>
      <li class="navbar__list-item">
        <router-link to="/rating">Рейтинг</router-link>
      </li>
      <li class="navbar__list-item">
        <router-link to="/about">О нас</router-link>
      </li>
      <button class="navbar__list-item--auth">
        <router-link to="/contact">Войти</router-link>
      </button>
    </ul>
  </nav>
</template>