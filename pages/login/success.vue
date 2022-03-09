<template>
  <div class="login-result">
    <h2 class="mb-3">Login 성공!</h2>
    <p>User Uid: {{ uid }}</p>
    <p>User email: {{ email }}</p>
    <v-btn color="success" @click="goLoginPage" class="mt-3"> 돌아가기 </v-btn>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth();
export default {
  layout: "login",
  methods: {
    goLoginPage() {
      this.$router.go(-1);
    },
  },
  data() {
    return {
      uid: null,
      email: null,
    };
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.uid = user.uid;
        this.email = user.email;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
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
