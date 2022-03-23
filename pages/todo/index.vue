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
          <v-btn color="primary" text @click="deleteTodo(item)"> X </v-btn>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import {
  getDoc,
  getFirestore,
  doc,
  arrayUnion,
  arrayRemove,
  updateDoc,
} from "firebase/firestore";
const db = getFirestore();

export default {
  data() {
    return {
      myTodo: null,
      todoList: [],
    };
  },
  methods: {
    async addTodo() {
      const washingtonRef = doc(db, "todo", "list");

      await updateDoc(washingtonRef, {
        regions: arrayUnion({
          title: this.myTodo,
          created_at: Date.now(),
        }),
      });
      this.resetMyTodo();
      this.getTodo();
    },
    async getTodo() {
      const docRef = doc(db, "todo", "list");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        this.todoList = docSnap.data().regions;
      } else {
        console.log("No such document!");
      }
    },
    async deleteTodo(item) {
      const washingtonRef = doc(db, "todo", "list");

      await updateDoc(washingtonRef, {
        regions: arrayRemove(item),
      });
      this.getTodo();
    },
    setDate(value) {
      let date = new Date(value);
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let year = date.getFullYear();

      return year + "-" + month + "-" + day;
    },
    resetMyTodo() {
      this.myTodo = null;
    },
  },
  mounted() {
    this.getTodo();
  },
};
</script>

<style></style>
