<template>
  <h1 align = "center">개발자 경력관리</h1>
    <table align = "center">
        <tr>
            <td>
              <select name = "" v-model = "selectedSearch">
              <option v-for="(item, index) in searchList" :key="index" :value="item.value">{{ item.name }}</option>
              </select>
            </td>
            <td><input type = "text" v-model = "search" id = "id"></td>
            <td><input type = "button" class = "searchBtn" value = "검색" @click="searching"></td>
        </tr>
    </table>
    <table align = "center" border = "1">
        <tr>
            <td @click="numSort">사번</td>
            <td @click="nameSort">이름</td>
            <td @click="careerSort">경력</td>
            <td @click="gradeSort">개발자 등급</td>
            <td>경험한 기술</td>
            <td></td>
        </tr>
        <tr v-for="(dev, i) in devInfoTable" :key="i">
          <td>{{ dev.developer_id }}</td>
          <td>{{ dev.name }}</td>
          <td>{{ dev.career }}</td>
          <td>{{ dev.grade }}</td>
          <td>{{ dev.skill_set }}</td>
          <td class = "edit" @click="showInfo(dev.developer_id, dev.name)">세부</td>
        </tr>
    </table>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    devInfoTable: [],
    search: "",
    selectedSearch: "",
    searchList: [
        { name: "사번", value: "id" },
        { name: "이름", value: "name" },
        { name: "등급", value: "grade" },
      ],
  }),
  mounted(){
    if (this.$store.state.user_emp_id == ""){
      alert("로그인이 필요한 페이지입니다");
      this.$router.replace("/");
    }
    axios.get('http://localhost:4000/devinfo').then(res => {
                this.devInfoTable = res.data;
              });
  },
  methods: {
    searching(){
    if(this.search != "" && this.selectedSearch != ""){
      axios.post('http://localhost:4000/devinfo/search/'+this.selectedSearch+'/'+this.search).then(res => {
                this.devInfoTable = res.data;
              });
      }
    },
    numSort(){
      if (this.sortType){
        this.devInfoTable.sort(function(a,b){
          return a.developer_id - b.developer_id;
        });
      }else{
        this.devInfoTable.sort(function(a,b){
          return b.developer_id - a.developer_id;
        });
      }
      this.sortType = !this.sortType;
    },
    nameSort(){
      if (this.sortType){
        this.devInfoTable.sort(function(a,b){
          return a.name.localeCompare(b.name);
        });
      }else{
        this.devInfoTable.sort(function(a,b){
          return b.name.localeCompare(a.name);
        });
      }
      this.sortType = !this.sortType;
    },
    careerSort(){
      if (this.sortType){
        this.devInfoTable.sort(function(a,b){
          let ac = (a.career.split('년')[0]);
          let bc = (b.career.split('년')[0]);
          return ac - bc;
        });
      }else{
        this.devInfoTable.sort(function(a,b){
          let ac = (a.career.split('년')[0]);
          let bc = (b.career.split('년')[0]);
          return bc- ac;
        });
      }
      this.sortType = !this.sortType;
    },
    gradeSort(){
      if (this.sortType){
        this.devInfoTable.sort(function(a,b){
          return a.grade.localeCompare(b.grade);
        });
      }else{
        this.devInfoTable.sort(function(a,b){
          return b.grade.localeCompare(a.grade);
        });
      }
      this.sortType = !this.sortType;
    },
    showInfo(c, n) {
      this.$router.push({
            name: "targetdevinfo",
            query: { code: c, name : n },
      });
    }
  },
};
</script>

<style scoped>
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
  .edit{
    color: #786ba5;
    text-decoration: underline;
    font-size: 12px;
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
  .nav-menu {
    margin-left: 50px;
    text-decoration: none;
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
</style>
