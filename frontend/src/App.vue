<template>
  <nav v-if = "$store.state.user_emp_id != ''">
      <router-link to="/project" class = "nav-menu">프로젝트</router-link>
      <router-link to="/employee" class = "nav-menu">직원</router-link>
      <router-link to="/devinfo" class = "nav-menu">경력관리</router-link>
      <router-link to="/mypage" class = "nav-menu">MY</router-link>
      <router-link to="/" class = "nav-menu" @click = "logout">로그아웃</router-link>
  </nav>
  <hr size = "1" color = "#097d49">
  <router-view/>
</template>

<script>
  export default {
    data: () => ({

    }),
    mounted(){
      
    },
    methods: {
      logout(){
        this.$store.state.user_emp_id = "";
      }
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav-menu {
  margin-left: 50px;
  text-decoration: none;
}

nav {
  padding: 30px;
  color: #c0ddd0;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
