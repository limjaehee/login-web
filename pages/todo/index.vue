<template>
  <div>
    <div class="d-flex">
      <v-text-field v-model="myTodo" label="할일 입력" required></v-text-field>
      <v-btn color="success" @click="addTodo" class="mt-3"> Add </v-btn>
    </div>

    <v-list dense>
      <v-subheader>TODO</v-subheader>
      <v-list-item-group color="primary">
        <v-list-item v-for="(item, i) in todoList" :key="i">
          <v-list-item-icon>
            <v-icon v-text="i + 1"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
            <v-list-item-subtitle
              v-text="setDate(item.created_at)"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import { collection, addDoc, getDocs, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth();
const db = getFirestore();

export default {
  data() {
    return {
      myTodo: "",
      todoList: [],
      uid: null,
    };
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.uid = user.uid;
      } else {
      }
    });
  },
  methods: {
    async addTodo() {
      try {
        const docRef = await addDoc(collection(db, "todo"), {
          title: this.myTodo,
          created_at: Date.now(),
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    async getTodo() {
      const querySnapshot = await getDocs(collection(db, "todo"));

      console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        this.todoList.push(doc.data());
      });
    },
    setDate(value) {
      let date = new Date(value);
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let year = date.getFullYear();

      return year + "-" + month + "-" + day;
    },
  },
  mounted() {
    this.getTodo();
  },
};
</script>

<style></style>
