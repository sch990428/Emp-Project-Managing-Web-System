<template>
  <h1 align = "center">회원가입</h1>
        <table align = "center">
            <tr>
                <td><label for = "name">이름</label></td>
                <td><input type = "text" v-model="name" placeholder="이름"></td>
            </tr>
            <tr>
                <td><label for = "id">주민등록번호</label></td>
                <td><input type = "text" v-model="social_id_front" placeholder="" style="width:100px;">
                  -
                  <input type = "password" v-model="social_id_back" placeholder="" style="width:100px;"></td>
            </tr>
            <tr>
                <td><label for = "id">아이디</label></td>
                <td><input type = "text" v-model="userId" id = "id" placeholder="아이디"></td>
                <td>
                	<input type ="button" class = "searchBtn" value = "중복확인">
                </td>
            </tr>
            <tr>
                <td><label for = "password">비밀번호</label></td>
                <td><input type = "password" v-model="userPass" id = "password"  placeholder="비밀번호"></td>
            </tr>
            <tr>
                <td><label for = "confirm">비밀번호 확인</label></td>
                <td><input type = "password" v-model="userPassConfirmed" id = "confirm" placeholder="비밀번호 확인"></td>
            </tr>
            <tr class="text-info" v-if="userPass != userPassConfirmed" rowspan = "2" align = "center">일치하지 않습니다</tr>
            <tr>
                <td><label for = "team">소속</label></td>
                <td><select v-model="team" @change="change" >
                  <option value = "Management">경영관리</option>
                  <option value = "Marketing">마케팅</option>
                  <option value = "Developer">개발자</option>
                  <option value = "RD">연구개발</option>
                </select></td>
            </tr>
            <tr>
                <td><label for = "spec">최종학력</label></td>
                <td><select v-model="spec" @change="change" >
                  <option value = "초졸">초졸</option>
                  <option value = "중졸">중졸</option>
                  <option value = "고졸">고졸</option>
                  <option value = "대졸">대졸</option>
                  <option value = "전문학사">전문학사</option>
                  <option value = "학사">학사</option>
                  <option value = "석사">석사</option>
                  <option value = "박사">박사</option>
                </select></td>
            </tr>
            <tr>
                <td colspan = "2" align = "center">
                	<input type ="button" class = "signupBtn" value = "회원가입" @click="signUp">
                </td>
            </tr>
        </table>

</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    name: "",
    userId: "",
    userPass: "",
    userPassConfirmed: "",
    social_id_front: "",
    social_id_back: "",
    team: "",
    spec: "",
    code: 0
  }),
  mounted(){
    axios.get('http://localhost:4000/maxId').then(res => {
      this.code = res.data[0].mi;
    });
  },
  methods: {
    signUp() {
      let info = {code: this.code + 1, name: this.name, ID: this.userId, PW: this.userPass, team: this.team, spec: this.spec, socialNo: this.social_id_front + "-" + this.social_id_back};

      axios.post('http://localhost:4000/signup', info).then(res2 => {
        alert("회원가입이 완료되었습니다.");
        this.$router.replace("/");
      });
    },
    back() {
      this.$router.replace("/");
    },
  },
};
</script>

<style scoped>
  .searchBtn {
    width: 64px;
    height: 24px;
    background-color: #e8a541;
    color: #ffffff;
    border: 3px;
    border-radius: 5px;
    font-size: 12px;
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
    margin-left: 15px;
  }
  .backBtn {
    width: 72px;
    height: 32px;
    background-color: #e8a541;
    color: #ffffff;
    border: 3px;
    border-radius: 5px;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    margin-left: 15px;
  }
  .text-info {
    color: #e84141;
    font-size: 12px;
    text-align: center;
  }
</style>
