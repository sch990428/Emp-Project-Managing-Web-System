<template>
<h1 align = "center">프로젝트 목록</h1>
<h3 align = "center">총 {{projTable.length}}개의 프로젝트가 진행 중입니다</h3>
<table align = "center">
  <tr>
    <input type = "checkbox" value = "진행" v-model="filter[0]">진행
    <input type = "checkbox" value = "종료" v-model="filter[1]">종료
    <input type = "checkbox" value = "준비" v-model="filter[2]">준비
  </tr>
</table>
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
<table align = "center">
  <tr>
      <td><input type = "button" class = "btn" value = "추가"></td>
  </tr>
</table>
<table align = "center" border = "1">
  <tr class = "thead">
      <td>선택</td>
      <td @click="numSort">프로젝트번호</td>
      <td @click="nameSort">프로젝트명</td>
      <td @click="sdSort">착수일자</td>
      <td @click="edSort">종료일자</td>
      <td @click="clientSort">발주처</td>
      <td @click="statSort">진행상태</td>
  </tr>
  <template v-for="(project, i) in projTable" :key="i">
    <tr v-if="isActive(project.status)">
      <td><input v-model= "projSelect[i]" type="checkbox"></td>
      <td>{{ project.project_id }}</td>
      <td @click="showDev(project.project_id, project.name)">{{ project.name }}</td>
      <td>{{ getDate(project.start_date) }}</td>
      <td>{{ getDate(project.end_date) }}</td>
      <td>{{ project.cname }}</td>
      <td>{{ getStat(project.status) }}</td>
    </tr>
  </template>
</table>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    origin: [],
    filter: [true, true, true],
    projTable: [],
    projSelect: [],
    sortType: false,
    search: "",
    selectedSearch: "",
    searchList: [
        { name: "번호", value: "id" },
        { name: "이름", value: "name" },
        { name: "발주처", value: "cliname" },
      ],
    statList: [
        { name: "진행", value: "Ongoing" },
        { name: "종료", value: "End" },
        { name: "준비", value: "Preparing" },
      ],
  }),
  mounted(){
    if (this.$store.state.user_emp_id == ""){
      alert("로그인이 필요한 페이지입니다");
      this.$router.replace("/");
    }
    axios.get('http://localhost:4000/projList').then(res => {
                this.origin = res.data;
                this.projTable = res.data;
              });
  },
  methods: {
    isActive(ps){
      switch(ps){
        case "Ongoing":
          if (this.filter[0]) return true;
          break;
        case "End":
          if (this.filter[1]) return true;
          break;
        case "Preparing":
          if (this.filter[2]) return true;
          break;
      }
      return false;
    },
    searching(){
    if(this.search != "" && this.selectedSearch != ""){
      axios.post('http://localhost:4000/project/search/'+this.selectedSearch+'/'+this.search).then(res => {
                this.projTable = res.data;
              });
    }
    },
    showDev(c, n) {
      this.$router.push({
        name: "projdevinfo",
        query: { code: c, name : n },
      });
    },
    getStat(s){
      switch(s){
        case "Ongoing":
          return "진행";
        case "End":
          return "종료";
        case "Preparing":
          return "준비";
      }
    },
    getDate(d){
      return (d.split('T')[0]);
    },
    numSort(){
      if (this.sortType){
        this.projTable.sort(function(a,b){
          return a.project_id - b.project_id;
        });
      }else{
        this.projTable.sort(function(a,b){
          return b.project_id - a.project_id;
        });
      }
      this.sortType = !this.sortType;
    },
    nameSort(){
      if (this.sortType){
        this.projTable.sort(function(a,b){
          return a.name.localeCompare(b.name);
        });
      }else{
        this.projTable.sort(function(a,b){
          return b.name.localeCompare(a.name);
        });
      }
      this.sortType = !this.sortType;
    },
    sdSort(){
      if (this.sortType){
        this.projTable.sort(function(a,b){
          return a.start_date.localeCompare(b.start_date);
        });
      }else{
        this.projTable.sort(function(a,b){
          return b.start_date.localeCompare(a.start_date);
        });
      }
      this.sortType = !this.sortType;
    },
    edSort(){
      if (this.sortType){
        this.projTable.sort(function(a,b){
          return a.end_date.localeCompare(b.end_date);
        });
      }else{
        this.projTable.sort(function(a,b){
          return b.end_date.localeCompare(a.end_date);
        });
      }
      this.sortType = !this.sortType;
    },
    clientSort(){
      if (this.sortType){
        this.projTable.sort(function(a,b){
          return a.cname.localeCompare(b.cname);
        });
      }else{
        this.projTable.sort(function(a,b){
          return b.cname.localeCompare(a.cname);
        });
      }
      this.sortType = !this.sortType;
    },
    statSort(){
      if (this.sortType){
        this.projTable.sort(function(a,b){
          return a.status.localeCompare(b.status);
        });
      }else{
        this.projTable.sort(function(a,b){
          return b.status.localeCompare(a.status);
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
  .projTable {
    margin-left: auto;
    margin-right: auto;
  }
  .selStat {
    width: 72px;
    text-align: center;
    margin-left: 1px;
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
