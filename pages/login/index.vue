<template>
  <div class="login">
    <div class="login__list">
      <h2>Google로 로그인</h2>
      <v-btn color="success" @click="signGoogle" block>
        Sign In With Google
      </v-btn>
    </div>
    <div class="login__list">
      <h2>Email로 로그인</h2>
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
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-3 mt-4"
          @click="EmailLogin"
        >
          로그인
        </v-btn>
        <v-btn color="success" @click="EmailJoin" class="mr-3 mt-4">
          회원가입
        </v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import errorCode from "@/constants/errorCode.js";
const auth = getAuth();
const provider = new GoogleAuthProvider();

export default {
  name: "IndexPage",
  layout: "login",
  data() {
    return {
      email: "",
      password: "",
      passwordShow: false,
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
    signGoogle() {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;

          this.$router.push("/todo");
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    },
    EmailLogin() {
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          this.$router.push("/todo");
        })
        .catch((err) => {
          alert(errorCode.LOGIN_ERROR_MESSAGE);
        });
    },
    EmailJoin() {
      this.$router.push("/join");
    },
  },
};
</script>
<style lang="scss">
.login {
  width: 100%;
  max-width: 500px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 2px 5px 15px rgba(0, 0, 0, 0.1);

  &__list {
    padding-bottom: 40px;

    &:last-child {
      padding-bottom: 0;
    }
  }
}
</style>
