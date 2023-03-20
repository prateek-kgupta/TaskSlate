<template>
  <headBar />
  <div class="main">
    <div class="inputFields">
      <input type="text" class="newTask" v-model="newTask.task" />
      <input type="time" v-model="newTask.task_time" />
      <input type="date" v-model="newTask.task_date" />
      <button style="grid-column: 1/3" v-if="editing" @click="updateTask">
        Edit Task
      </button>
      <button style="grid-column: 1/3" v-else @click="addTasks">
        Add Task
      </button>
    </div>
    <div class="outputFields">
      <div class="tasks" v-for="task in tasks" :key="task.task_id">
        <div class="times">
          <div class="time">{{ task.task_time || "-/-" }}</div>
          <div class="date">{{ task.task_date || "-/-" }}</div>
        </div>
        <div class="actualTask">{{ task.task }}</div>
        <div class="operations">
          <button class="taskStatus" @click="changeStatus(task)">
            {{ task.status === "complete" ? "Complete" : "Incomplete" }}
          </button>
          <button @click="editButton(task)">Edit</button>
          <button
            @click="deleteTask(task.task_id)"
            style="background-color: rgb(169, 45, 45)"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import headBar from "./headBar.vue";
import { v4 as uuidv4 } from "uuid";
import authenticate from '../mixins/authenticate.js'

export default {
  name: "taskPage",
  data() {
    return {
      newTask: {
        username: "",
        task_id: "",
        task_time: "",
        task_date: "",
        task: "",
      },
      tasks: [],
      editing: false,
      currentlyEditing: "",
      status: "",
    };
  },
  mixins: [authenticate],
  components: {
    headBar,
  },
  methods: {
    twelveTotwentyfour(task_time) {
      let hours = task_time.substr(0, 2);
      const minutes = task_time.substr(3, 2);
      const ampm = task_time.substr(6, 2);
      if (ampm === "AM" && hours === "12") {
        hours = "00";
      } else if (ampm === "PM" && hours !== "12") {
        hours = parseInt(hours) + 12;
      }
      const timeObj = new Date();
      timeObj.setHours(hours);
      timeObj.setMinutes(minutes);
      return timeObj;
    },
    twentyfourToTwelve(task_time) {
      let [hours, minutes] = task_time.split(":");
      let ampm = "";
      if (hours === "00") {
        hours = "12";
        ampm = "AM";
      } else if (parseInt(hours) < 12) {
        ampm = "AM";
      } else if (parseInt(hours) === 12) {
        ampm = "PM";
      } else {
        ampm = "PM";
        hours = (parseInt(hours) - 12).toString();
        if (hours.length === 1) {
          hours = "0" + hours;
        }
      }
      return hours + ":" + minutes + " " + ampm;
    },

    editButton(task) {
      this.currentlyEditing = task;
      this.editing = true;
      this.newTask.task_id = task.task_id;
      if (task.task_time) {
        const timeObj = this.twelveTotwentyfour(task.task_time);
        this.newTask.task_time = timeObj.toString().substr(16, 5);
      }
      console.log(task.task_date);
      if (task.task_date) {
        const [dd, mm, yyyy] = task.task_date.toString().split("-");
        const date_format = yyyy + "-" + mm + "-" + dd;
        this.newTask.task_date = date_format;
      }
      this.newTask.task = task.task;
    },
    updateTask() {
      if (this.currentlyEditing.task_id === this.newTask.task_id) {
        if (this.newTask.task_time) {
          this.currentlyEditing.task_time = this.twentyfourToTwelve(
            this.newTask.task_time
          );
        } else {
          this.currentlyEditing.task_time = null;
        }
        if (this.newTask.task_date) {
          const [yyyy, mm, dd] = this.newTask.task_date.split("-");
          const date_format = dd + "-" + mm + "-" + yyyy;
          this.currentlyEditing.task_date = date_format;
        } else {
          this.currentlyEditing.task_date = null;
        }
        this.currentlyEditing.task = this.newTask.task;
        axios
          .put("http://localhost:3000/user/editTask", this.newTask)
          .then((response) => console.log(response.data));

        this.newTask.task_id = "";
        this.newTask.task_time = "";
        this.newTask.task_date = "";
        this.newTask.task = "";
        this.editing = false;
      }
    },

    deleteTask(id) {
      console.log(id);
      this.tasks = this.tasks.filter((t) => t.task_id !== id);
      axios
        .delete(`http://localhost:3000/user/delete/${id}`)
        .then((response) => console.log(response.data));
    },

    changeStatus(task) {
      if (task.status === "complete") {
        task.status = "incomplete";
      } else {
        task.status = "complete";
      }
      axios
        .put("http://localhost:3000/user/editStatus", {
          task_id: task.task_id,
          status: task.status,
        })
        .then((response) => console.log(response.data));
    },

    addTasks() {
      this.newTask.task_id = uuidv4();
      console.log("1:", this.tasks);
      console.log(this.newTask);
      this.tasks.push({
        task_id: this.newTask.task_id,
        task_time: this.newTask.task_time,
        task_date: this.newTask.task_date,
        task: this.newTask.task,
      });
      console.log("2:", this.tasks);
      const url = `http://localhost:3000/user/addTasks`;
      axios
        .post(url, this.newTask)
        .then(() => console.log("Insertion Successful"))
        .catch((err) => console.log(err));
      this.newTask.task_id = "";
      this.newTask.task_time = "";
      this.newTask.task_date = "";
      this.newTask.task = "";
    },
  },
  mounted() {
    this.newTask.username = localStorage.getItem("username");
    const url = `http://localhost:3000/user/viewTasks/'${this.newTask.username}'`;
    axios.get(url).then((response) => {
      console.log(response.data);
      this.tasks = [...response.data];
    });
  },
  beforeUnmount() {
    console.log("Adios");
  },
};
</script>

<style scoped>
.main {
  box-sizing: border-box;
  padding-top: 10vh;
  width: 60%;
  margin-left: 20%;
  margin-right: 20%;
}
.tasks {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  color: white;
  user-select: none;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  background-color: rgb(77, 123, 125);
  border-radius: 17px;
  margin: 3px;
  padding: 2%;
  font-family: consolos;
  font-size: large;
}

.actualTask {
  display: flex;
  align-items: center;
}

.inputFields {
  display: grid;
  background-color: rgb(239, 215, 229);
  grid-template-columns: repeat(2, 1fr);
  row-gap: 5%;
  column-gap: 2%;
  margin-bottom: 20px;
}
.inputFields input {
  height: 40px;
}
.newTask {
  grid-column: 1/3;
}
.outputFields {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
button {
  background-color: rgb(95, 93, 93);
  border: 1px solid white;
}
.operations button {
  margin-left: 2px;
}
</style>