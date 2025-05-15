<template>
  <div class="preloader">
    <div class="preloader__container">
      <span class="preloader__round"></span>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
@keyframes preloader-inside-white {
  0% {
    transform: scale(0, 0);
  }
  100% {
    transform: scale(1, 1);
  }
}

@keyframes preloader-inside-red {
  0% {
    transform: scale(0, 0);
  }
  30% {
    transform: scale(0, 0);
  }
  100% {
    transform: scale(1, 1);
  }
}

.preloader {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 10;
}

.preloader__container {
  width: 100px;
  height: 100px;
  position: relative;
}

.preloader__round {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
  background: white;
  border-radius: 50px;
}

.preloader__round::after,
.preloader__round::before {
  content: '';
  width: 100px;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50px;
}

.preloader__round::after {
  background: grey;
  animation: preloader-inside-white 1s ease-in-out infinite;
}

.preloader__round::before {
  z-index: 10;
  background: white;
  animation: preloader-inside-red 1s ease-in-out infinite;
}
</style>
