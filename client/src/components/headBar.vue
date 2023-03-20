<template>
  <div class="mHead">
    <h3 class="appName"><i>TaskSlate</i></h3>
    <p class="userInfo">{{firstname}} {{lastname}}</p>
    <button @click="logOut()" class="btn">Log Out</button>
  </div>
</template>

<script>
export default {
  name: "headBar",
  data(){
    return{
      firstname: "",
      lastname: ""
    }
  },
  methods: {
    logOut() {
      localStorage.clear();
      this.$router.push({ name: "loginPage" });
    },
  },
  mounted(){
    this.firstname = localStorage.getItem("firstname");
    this.lastname = localStorage.getItem("lastname")
  }
};
</script>

<style scoped>
.mHead {
  user-select: none;
  box-sizing: border-box;
  height: 8vh;
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(77, 123, 125);
  padding: 5px 20px;
}
.userInfo{
  color: white;
  font-size: 22px;
  font-weight: bold;
  border-bottom: 2px solid white;
}
</style>