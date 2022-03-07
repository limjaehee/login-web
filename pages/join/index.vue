<template>
  <div class="join">
    <div class="d-flex">
      <v-btn class="arrow" @click="goLoginPage">
        <v-icon left> mdi-arrow-left </v-icon>
      </v-btn>
      <h2>가입하기</h2>
    </div>

    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="email"
        :rules="emailRule"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="passwordRule"
        :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
        :type="passwordShow ? 'text' : 'password'"
        label="Password"
        @click:append="passwordShow = !passwordShow"
        required
      ></v-text-field>
      <v-text-field
        v-model="password2"
        :rules="passwordRule"
        :append-icon="passwordShow2 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="passwordShow2 ? 'text' : 'password'"
        label="Password confirm"
        @click:append="passwordShow2 = !passwordShow2"
        required
      ></v-text-field>
      <v-btn
        :disabled="!valid"
        color="success"
        @click="JoinClear"
        class="mr-3 mt-4"
        block
      >
        회원가입 완료
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import "@/mixin/firebase.js";
export default {
  name: "IndexPage",
  layout: "login",
  data() {
    return {
      email: "",
      password: "",
      password2: "",
      passwordShow: false,
      passwordShow2: false,
      valid: false,
      emailRule: [
        (v) => !!v || "이메일을 입력해주세요.",
        (v) => {
          const replaceV = v.replace(/(\s*)/g, "");
          const pattern =
            /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
          return pattern.test(replaceV) || "이메일 형식으로 입력해주세요";
        },
      ],
      passwordRule: [
        (v) => !!v || "비밀번호를 입력해주세요.",
        (v) => {
          const replaceV = v.replace(/(\s*)/g, "");
          return replaceV.length >= 8 || "8자리 이상 입력해주세요.";
        },
      ],
    };
  },
  methods: {
    JoinClear() {},
    goLoginPage() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss">
.join {
  width: 100%;
  max-width: 500px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 2px 5px 15px rgba(0, 0, 0, 0.1);
}
</style>
