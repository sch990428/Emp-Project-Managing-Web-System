<template>
    <h1 align = "center">직원 목록</h1>
    <h3 align = "center">총 {{empTable.length}}명의 인원이 우리와 함께합니다</h3>
    <table align = "center">
      <tr>
        <td>
            <select name = "" v-model = "selectedSearch">
              <option v-for="(item, index) in searchList" :key="index" :value="item.value">{{ item.name }}</option>
            </select>
        </td>
        <td><input type = "text" v-model= "search" id = "id"></td>
        <td><input type = "button" @click="searching" class = "searchBtn" value = "검색"></td>
      </tr>
    </table>
      <table align = "center" border = "1">
          <tr>
              <td>선택</td>
              <td @click="numSort">사번</td>
              <td @click="teamSort">직무</td>
              <td @click="nameSort">이름</td>
              <td @click="specSort">최종학력</td>
          </tr>
          <tr v-for="(emp, i) in empTable" :key="i">
              <td><input type="checkbox" v-model= "empSelect[i]"></td>
              <td>{{ emp.employee_id }}</td>
              <td>{{ emp.team }}</td>
              <td>{{ emp.name }}</td>
              <td>{{ emp.education }}</td>
          </tr>
      </table>
  </template>

<script>
import axios from 'axios';

export default {
  name: "projdevinfo",
  data: () => ({
    empTable: [],
    empSelect: [],
    origin: [],
    search: "",
    selectedSearch: "",
    searchList: [
        { name: "사번", value: "id" },
        { name: "이름", value: "name" },
        { name: "직무", value: "role" },
      ],
  }),
  mounted(){
    if (this.$store.state.user_emp_id == ""){
      alert("로그인이 필요한 페이지입니다");
      this.$router.replace("/");
    }
    axios.get('http://localhost:4000/empList').then(res => {
                this.origin = res.data;
                this.empTable = res.data;
              });
  },
  methods: {
    searching(){
    if(this.search != "" && this.selectedSearch != ""){
      axios.post('http://localhost:4000/employee/search/'+this.selectedSearch+'/'+this.search).then(res => {
                this.empTable = res.data;
              });
      }
    },
    numSort(){
      if (this.sortType){
        this.empTable.sort(function(a,b){
          return a.employee_id - b.employee_id;
        });
      }else{
        this.empTable.sort(function(a,b){
          return b.employee_id - a.employee_id;
        });
      }
      this.sortType = !this.sortType;
    },
    nameSort(){
      if (this.sortType){
        this.empTable.sort(function(a,b){
          return a.name.localeCompare(b.name);
        });
      }else{
        this.empTable.sort(function(a,b){
          return b.name.localeCompare(a.name);
        });
      }
      this.sortType = !this.sortType;
    },
    teamSort(){
      if (this.sortType){
        this.empTable.sort(function(a,b){
          return a.team.localeCompare(b.team);
        });
      }else{
        this.empTable.sort(function(a,b){
          return b.team.localeCompare(a.team);
        });
      }
      this.sortType = !this.sortType;
    },
    specSort(){
      if (this.sortType){
        this.empTable.sort(function(a,b){
          return a.education.localeCompare(b.education);
        });
      }else{
        this.empTable.sort(function(a,b){
          return b.education.localeCompare(a.education);
        });
      }
      this.sortType = !this.sortType;
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
    margin-left: 50px;
    text-decoration: none;
  }
</style>
