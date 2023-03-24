<template>
  <headBar />
  <div class="admin">
    <div
      class="card"
      style="grid-column: 1/4"
      @click="() => this.$router.push({ name: 'taskPage' })"
    >
      My Task
    </div>
    <div
      class="card"
      style="grid-column: 4/7"
      @click="() => this.$router.push({ name: 'viewUsers' })"
    >
      View Users
    </div>
    <div
      class="card"
      style="grid-column: 1/3"
      @click="() => this.$router.push({ name: 'searchUser' })"
    >
      Search User
    </div>
    <div
      class="card"
      style="grid-column: 3/5"
      @click="() => this.$router.push({ name: 'userRole' })"
    >
      Change User's Role
    </div>
    <div
      class="card"
      style="grid-column: 5/7"
      @click="() => this.$router.push({ name: 'userDelete' })"
    >
      Remove User
    </div>
  </div>
</template>

<script>
import headBar from "./headBar.vue";
import authenticate from '../mixins/adminAuth.js'

export default {
  name: "adminVue",
  components: {
    headBar,
  },
  mixins: [authenticate],
};
</script>

<style scoped>
.admin {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  box-sizing: border-box;
  display: grid;
  height: 92vh;
  margin-top: 8vh;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: minmax(20vh, auto);
  padding: 3%;
  row-gap: 5%;
  column-gap: 2%;
  user-select: none;
}
.card {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(77, 123, 125);
  font-size: xx-large;
  font-weight: bolder;
  color: rgb(239, 215, 229);
  border-radius: 15px;
}
.card:hover {
  background-color: rgb(77, 123, 125, 0.9);
  text-decoration: underline;
}

</style>