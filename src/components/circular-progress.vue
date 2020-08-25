<template>
  <div class="flex items-center justify-center max-w-sm">
    <div class="circular-loader"></div>
  </div>
</template>

<script>
export default {
  name: 'circular-progress'
}
</script>

<style scoped>
.circular-loader {
  border: 5px solid #e1e1e1;
  border-top: 5px solid #7cc1f7;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin: 5px;
  -webkit-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
