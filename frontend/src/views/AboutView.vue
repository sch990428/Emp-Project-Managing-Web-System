<template>
  <nav>
      <router-link to="/project" class = "nav-menu">프로젝트</router-link>
      <router-link to="/employee" class = "nav-menu">직원</router-link>
      <router-link to="/devinfo" class = "nav-menu">경력관리</router-link>
      <router-link to="/mypage" class = "nav-menu">MY</router-link>
      <router-link to="/" class = "nav-menu">로그아웃</router-link>
  </nav>
    <h1 align = "center">직원 목록</h1>
    <h3 align = "center">총 {{empTable.length}}명의 인원이 우리와 함께합니다</h3>
      <table align = "center">
          <tr>
              <td>
                  <select name = "">
                      <option value = "code">사번</option>
                      <option value = "code">직무</option>
                      <option value = "code">이름</option>
                  </select>
              </td>
              <td><input type = "text" id = "id"></td>
              <td><input type = "button" class = "searchBtn" value = "검색"></td>
          </tr>
      </table>
      <table align = "center">
       <tr>
        <td><input type = "button" class = "btn" value = "퇴사처리" @click="delEmp"></td>
      </tr>
  </table>
      <table align = "center" border = "1">
          <tr>
              <td>선택</td>
              <td>사번</td>
              <td>직무</td>
              <td>이름</td>
          </tr>
          <tr v-for="(emp, i) in empTable" :key="i">
              <td><input type="checkbox" v-model= "empSelect[i]"></td>
              <td>{{ emp.employee_id }}</td>
              <td>{{ emp.team }}</td>
              <td>{{ emp.name }}</td>
          </tr>
      </table>
  </template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    empTable: [],
    empSelect: [],
  }),
  mounted(){
    axios.get('http://localhost:4000/list').then(res => {
                console.log(res);
                this.empTable = res.data;
              });
  },
  methods: {
    delEmp() {
      console.log(this.empSelect);
      for (let k = 0; k < this.empSelect.length; k++){
        if (this.empSelect[k]){
          this.empSelect.splice(k, 1);
          this.empTable.splice(k, 1);
          k = -1;
        }
      }
    },
  },
};
</script>

<style scoped>
  .searchBtn {
    width: 48px;
    height: 24px;
    background-color: #e8a541;
    color: #ffffff;
    border: 3px;
    border-radius: 5px;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
  }
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
  .text-info {
    color: #e84141;
    font-size: 12px;
    text-align: center;
  }
  .nav-menu {
    margin-left: 15px;
    text-decoration: none;
  }
</style>
