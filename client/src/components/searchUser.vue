<template>
  <headBar />
  <div class="main">
    <input
      type="text"
      placeholder="Username/ First name/ Email"
      v-model="searchParameter"
    />
    <br />
    <button @click="searchUser">Search Users</button>
  </div>
  <div class="results" v-for="user in searchResult" :key="user.username">
    <p>
      Username: <span>{{ user.username }}</span>
    </p>
    <p>
      Name: <span>{{ user.firstname }} {{ user.lastname }}</span>
    </p>
    <p>
      Email: <span>{{ user.email }}</span>
    </p>
    <p>
      User role: <span>{{ user.user_type }}</span>
    </p>
    <button @click="this.$router.push({ path: `/usersTask/${user.username}` })">View</button>
  </div>
</template>

<script>
import headBar from "./headBar.vue";
import axios from "axios";
import authenticate from '../mixins/authenticate.js'


export default {
  name: "addUser",
  data() {
    return {
      searchParameter: "",
      searchResult: [],
    };
  },
  mixins: [authenticate],
  components: {
    headBar,
  },
  methods: {
    searchUser() {
      const url = `http://localhost:3000/admin/'${this.searchParameter}'`;
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
button {
  margin-left: 4px;
}
</style>
