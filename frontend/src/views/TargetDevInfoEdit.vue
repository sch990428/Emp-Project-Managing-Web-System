<template>

    <h1 align = "center">{{$route.query.code}}: {{$route.query.name}} 경력 수정</h1>
      <table align = "center">
        <tr>
        <td><input type = "button" class = "btn" value = "저장" @click="save"></td>
      </tr>
      </table>
      <table align = "center" border = "1">
          <tr>
              <td>사번</td>
              <td>이름</td>
              <td>경력</td>
              <td>개발자 등급</td>
              <td>경험한 기술</td>
          </tr>
          <tr v-for="(dev, i) in devInfoTable" :key="i">
              <td>{{dev.developer_id}}</td>
              <td>{{dev.name}}</td>
              <td><textarea v-model="dev.career"></textarea></td>
              <td><select v-model="dev.grade" @change="change" >
                <option value = "수">수</option>
                <option value = "우">우</option>
                <option value = "미">미</option>
                <option value = "양">양</option>
                <option value = "가">가</option>
              </select></td>
              <td><textarea v-model="dev.skill_set"></textarea></td>
          </tr>
      </table>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    data: () => ({
      devInfoTable: []
    }),
    mounted(){
      axios.post('http://localhost:4000/devInfo/'+this.$route.query.code).then(res => {
        this.devInfoTable = res.data;
      });
  },
    methods: {
      save() {
        axios.post('http://localhost:4000/dev/edit', this.devInfoTable).then(res => {
        this.evalTable = res.data;
        });
        alert("수정되었습니다");
        this.$router.push({
            name: "targetdevinfo",
            query: { code: this.$route.query.code, name : this.$route.query.name },
      });
      }
    },
  };
  </script>
  
  <style scoped>
  .btn {
        width: 72px;
        height: 32px;
        background-color: #e8a541;
        color: #ffffff;
        border: 3px;
        border-radius: 5px;
        font-size: 14px;
        text-align: center;
        cursor: pointer;
      }
    .signupBtn {
      width: 72px;
      height: 32px;
      background-color: #e8a541;
      color: #ffffff;
      border: 3px;
      border-radius: 5px;
      font-size: 14px;
      text-align: center;
      cursor: pointer;
    }
    .text-info {
      color: #e84141;
      font-size: 12px;
      text-align: center;
    }
    textarea{
      font-family: Avenir, Helvetica, Arial, sans-serif;
      font-size: 14px;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
    }
    .nav-menu:active {
      color: #e8a541;
    }

    .nav-menu {
    margin-left: 50px;
    text-decoration: none;
  }
  </style>
  