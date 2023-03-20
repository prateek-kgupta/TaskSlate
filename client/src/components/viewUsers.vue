<template>
  <head-bar />
  <div class="main">
    <table>
      <tr>
        <th>USERNAME</th>
        <th>NAME</th>
        <th>EMAIL</th>
        <th>ACTIONS</th>
      </tr>
      <tr v-for="user in userList" :key="user.username">
        <td>{{ user.username }}</td>
        <td>{{ user.firstname }} {{ user.lastname }}</td>
        <td>{{ user.email }}</td>
        <td>
          <button
            @click="this.$router.push({ path: `/usersTask/${user.username}` })"
          >
            View
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import headBar from "./headBar.vue";
import authenticate from '../mixins/authenticate.js'

export default {
  name: "viewUsers",
  data() {
    return {
      userList: [],
    };
  },
  mixins: [authenticate],
  components: {
    headBar,
  },
  mounted() {
    const url = `http://localhost:3000/admin/get`;
    axios.get(url).then((response) => {
      this.userList = [...response.data];
    });
  },
};
</script>

<style scoped>
.main {
  margin-top: 10vh;
}
table {
  width: 70vw;
  margin-left: 15vw;
  margin-right: 15vw;
  padding: 5px;
  background-color: rgb(77, 123, 125);
  border: 1px solid black;
  border-collapse: collapse;
  text-align: center;
  color: white;
}
th {
  color: black;
}
th,
td {
  padding: 5px;
  border: 1px solid black;
  border-collapse: collapse;
}
</style>