<template>
  <head-bar />
  <div class="main">
    <input
      type="text"
      placeholder="Username/ First name/ Email"
      v-model="username"
    />
    <br />
    <button @click="searchUser">Find User</button>
  </div>
  <div class="results" v-for="user in searchResult" :key="user.username">
    <p>
      Username: <span>{{ user.username }}</span>
    </p>
    <p>
      User role: <span>{{ user.user_type }}</span>
    </p>
    <button @click="changeUserRole(user)" :hidden="user.username === 'prateek' ? true : false">
      Change to {{ user.user_type === "admin" ? "user" : "admin" }}
    </button>
  </div>
</template>

<script>
import headBar from "./headBar.vue";
import axios from "axios";
import authenticate from '../mixins/adminAuth.js'

export default {
  name: "userRole",
  data() {
    return {
      username: "",
      searchResult: "",
    };
  },
  mixins: [authenticate],
  components: {
    headBar,
  },
  methods: {
    changeUserRole(user) {
      user.user_type = user.user_type === "admin" ? "user" : "admin";
      const url = `http://localhost:3000/admin/userRole`;
      const token = localStorage.getItem("token")
    axios.defaults.headers.common['Authorization'] = token;
      axios
        .put(url, {
          username: user.username,
          user_type: user.user_type,
        })
        .then((response) => console.log(response.data));
    },

    searchUser() {
      const url = `http://localhost:3000/admin/'${this.username}'`;
      const token = localStorage.getItem("token")
    axios.defaults.headers.common['Authorization'] = token;
      axios.get(url).then((response) => {
        this.searchResult = [...response.data];
      });
    },
  },
};
</script>

<style scoped>
.main {
  position: relative;
  top: 10vh;
  display: flex;
  flex-direction: column;
  width: 70vw;
  margin-left: 15vw;
  margin-right: 15vw;
  background-color: rgb(77, 123, 125);
  padding: 1%;
  border-radius: 17px;
}
.results {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  position: relative;
  top: 10vh;
  width: 70vw;
  margin-top: 4px;
  margin-left: 15vw;
  margin-right: 15vw;
  background-color: rgb(77, 123, 125);
  padding: 1%;
  border-radius: 17px;
}
input {
  height: 40px;
}
p {
  font-weight: bolder;
  color: white;
  font-size: large;
}
span {
  font-weight: normal;
  text-decoration: underline;
}
</style>