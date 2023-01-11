<template>
  <h1 align = "center">마이페이지</h1>
        <table align = "center">
            <tr>
                <td><label for = "name">사번</label></td>
                <td> {{myData.employee_id}}</td>
            </tr>
            <tr>
                <td><label for = "name">이름</label></td>
                <td>{{myData.name}}</td>
            </tr>
            <tr>
                <td><label for = "id">아이디</label></td>
                <td>{{myData.web_id}}</td>
            </tr>
            <br>
            <tr>
                <td><label for = "password">현재 비밀번호</label></td>
                <td><input type = "password" v-model="userPass" id = "password"></td>
            </tr>
            <tr class="text-info" v-if="userPass != myData.web_password" rowspan = "2" align = "center">비밀번호를 다시 확인해주세요</tr>
            <tr>
                <td><label for = "password">새 비밀번호</label></td>
                <td><input type = "password" v-model="userNewPass" id = "newPass"></td>
            </tr>
            <tr>
                <td><label for = "password">새 비밀번호 확인</label></td>
                <td><input type = "password" v-model="userNewPassConfirmed" id = "newPassConfirmed"></td>
            </tr>
            <tr class="text-info" v-if="userNewPass != userNewPassConfirmed" rowspan = "2" align = "center">일치하지 않습니다</tr>
            <br>
            <tr>
                <td><label for = "spec">최종학력</label></td>
                <td>{{myData.education}}</td>
            </tr>
            <tr>
                <td colspan = "2" align = "center">
                	<input type ="button" class = "signupBtn" value = "수정" @click="onEdit">
                </td>
            </tr>
        </table>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
      userPass: "",
      userNewPass: "",
      userNewPassConfirmed: "",
      spec: "",
      myData: [],
  }),
  mounted(){
    if (this.$store.state.user_emp_id == ""){
      alert("로그인이 필요한 페이지입니다");
      this.$router.replace("/");
    }
    axios.post('http://localhost:4000/data', {code: this.$store.state.user_emp_id}).then(res => {
      this.myData = res.data[0];
    });

  },
  methods: {
    onEdit(){
      axios.post('http://localhost:4000/my/edit', {code: this.$store.state.user_emp_id, PW: this.userNewPass}).then(res => {
        alert("수정이 완료되었습니다!");
      });
    }
  },
};
</script>

<style scoped>
  .signupBtn {
    width: 48px;
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
