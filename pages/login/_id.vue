<template>
  <div class="login-result">
    <h2 class="mb-3">Login 성공!</h2>
    <p>User ID: {{ id }}</p>
    <p>User PW: {{ id }}</p>
    <v-btn color="success" @click="goLoginPage" class="mt-3"> 돌아가기 </v-btn>
  </div>
</template>

<script>
export default {
  asyncData({ params }) {
    console.log(params);
    return {
      id: params.id,
    };
  },
  validate({ params }) {
    return /^\d+$/.test(params.id);
  },
  layout: "login",
  methods: {
    goLoginPage() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss">
.login-result {
  background: #fff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 2px 5px 15px rgba(0, 0, 0, 0.1);
}
</style>
