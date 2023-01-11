<template>
  <h1 align = "center">{{$route.query.code}}: {{$route.query.name}} 경력조회</h1>
    <table align = "center" border = "1">
        <tr>
            <td>사번</td>
            <td>이름</td>
            <td>경력</td>
            <td>개발자 등급</td>
            <td>경험한 기술</td>
            <td></td>
        </tr>
        <tr v-for="(dev, i) in devInfoTable" :key="i">
            <td>{{ dev.developer_id }}</td>
            <td>{{ dev.name }}</td>
            <td>{{ dev.career }}</td>
            <td>{{ dev.grade }}</td>
            <td>{{ dev.skill_set }}</td>
            <td class = "edit" @click="editInfo(dev.developer_id, dev.name)">수정</td>
        </tr>
      </table>
      <h3 align = "center">프로젝트 참여 기록</h3>
      <table align = "center" border = "1">
        <tr>
          <td>프로젝트 이름</td>
          <td>투입일</td>
          <td>제외일</td>
          <td>상태</td>
        </tr>
        <tr v-for="(proj, i) in projTable" :key="i">
          <td>{{proj.name}}</td>
          <td>{{getDate(proj.start_date)}}</td>
          <td>{{getDate(proj.end_date)}}</td>
          <td>{{getStat(proj.status)}}</td>
        </tr>
      </table>
      <h3 align = "center">평가 수행 기록</h3>
      <table align = "center" border = "1">
        <tr>
          <td rowspan = "2">종류</td>
          <td rowspan = "2">프로젝트</td>
          <td colspan = "2">대상</td>
          <td colspan = "2">커뮤니케이션 평가</td>
          <td colspan = "2">능력 평가</td>
        </tr>
        <tr>
            <td>사번</td>
            <td>이름</td>
            <td>평점</td>
            <td>세부내용</td>
            <td>평점</td>
            <td>세부내용</td>
        </tr>
        <tr v-for="(eva, i) in evalTable" :key="i">
            <td>{{getType(eva)}}</td>
            <td>{{eva.project_id}}</td>
            <td>{{eva.evaluated_id}}</td>
            <td @click="editInfo(eva.evaluated_id, eva.ename)">{{eva.ename}}</td>
            <td>{{eva.communication_grade}}</td>
            <td>{{eva.communication_detail}}</td>
            <td>{{eva.ability_grade}}</td>
            <td>{{eva.ability_detail}}</td>
        </tr>
      </table>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    devInfoTable: [],
    evalTable: [],
    projTable: []
  }),
  mounted(){
    axios.post('http://localhost:4000/devInfo/'+this.$route.query.code).then(res => {
      this.devInfoTable = res.data;
      });

      axios.post('http://localhost:4000/devInfo/eval/'+this.$route.query.code).then(res => {
      this.evalTable = res.data;
      });

      axios.post('http://localhost:4000/devInfo/proj/'+this.$route.query.code).then(res => {
      this.projTable = res.data;
      });
  },
  methods: {
    getDate(d){
      return (d.split('T')[0]);
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
    getType(t) {
      switch(t.type){
        case "PM":
          return "PM평가";
        case "Colleague":
          return "동료평가";
        case "Client":
          return "고객평가";
      }
    },
    showDev(name) {
      alert(name + " 정보")
    },
    editInfo(c, n) {
      this.$router.push({
            name: "targetdevinfoEdit",
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
  .text-info {
    color: #e84141;
    font-size: 12px;
    text-align: center;
  }
  .edit{
    color: #786ba5;
    text-decoration: underline;
    font-size: 12px;
  }

  .nav-menu {
    margin-left: 50px;
    text-decoration: none;
  }
</style>
