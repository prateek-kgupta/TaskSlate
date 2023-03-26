<template>
  <headBar />
  <div class="main">
    <table>
      <tr>
        <th>Task</th>
        <th>Task Time</th>
        <th>Task Date</th>
        <th>Task status</th>
      </tr>
      <tr v-for="task in tasks" :key="task.task_id">
        <td>{{ task.task }}</td>
        <td>{{ task.task_time }}</td>
        <td>{{ task.task_date }}</td>
        <td>{{ task.status }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import headBar from "./headBar.vue";
import axios from "axios";
import authenticate from '../mixins/adminAuth.js'

export default {
  name: "usersTask",
  data() {
    return {
      username: "",
      tasks: [],
    };
  },
  mixins: [authenticate],
  components: {
    headBar,
  },

  mounted() {
    this.username = this.$route.params.username;
    const url = `http://localhost:3000/user/viewTasks/'${this.username}'`;
    const token = localStorage.getItem("token")
    axios.defaults.headers.common['Authorization'] = token;
    axios
      .get(url)
      .then((response) => {
        this.tasks = [...response.data];
        console.log(this.tasks);
      })
      .catch((err) => console.log(err));
    console.log(this.username);
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