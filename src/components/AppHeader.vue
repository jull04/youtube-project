
<template>
<header> 
  <div class='header__nav'>
    <ul class='header__nav-links'>
      <li><router-link class="header__nav-link" to="/">Главная</router-link></li>
        <li><router-link class="header__nav-link" to="/saved">Мои Видео</router-link></li>
      </ul>
  </div>
</header> 
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style>
.header__nav {
  background-color: #062533;
  padding: 20px;
  display: flex;
}

.header__nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
}

.header__nav-link {
  color: #fff;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
}
.header__nav-link:hover {
  opacity: 0.7;
}


.header__nav-link:active {
  color: initial;
}

.router-link-active {
  text-decoration: underline;
}
</style>