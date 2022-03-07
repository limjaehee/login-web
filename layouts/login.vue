<template>
  <v-app>
    <v-main class="center-layout">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {};
</script>

<style lang="scss">
.center-layout {
  background: rgb(220, 219, 223);

  .container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
