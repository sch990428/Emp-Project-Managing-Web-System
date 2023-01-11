<template>
    <h1 align = "center">{{$route.query.code}}: {{$route.query.name}} 개발자 목록</h1>
    <table align = "center">
     <tr>
        <td><input type = "button" class = "btn" value = "추가"></td>
      <td><input type = "button" class = "btn" value = "제외" @click="delProj"></td>
    </tr>
</table>
    <table align = "center" border = "1">
        <tr>
            <td>선택</td>
            <td>사번</td>
            <td>직무</td>
            <td>이름</td>
        </tr>
        <tr v-for="(dev, i) in devTable" :key="i">
            <td><input type="checkbox" v-model= "devSelect[i]"></td>
            <td>{{ dev.developer_id }}</td>
            <td>{{ dev.role }}</td>
            <td @click="showDev(dev.developer_id, dev.name)">{{ dev.name }}</td>
        </tr>
    </table>
    </template>
    
    <script>
    import axios from 'axios';

    export default {
      data: () => ({
        devTable: [],
        devSelect: []
      }),
      mounted(){
        axios.post('http://localhost:4000/projDevList/'+this.$route.query.code).then(res => {
                this.devTable = res.data;
              });
      },
      methods: {
        showDev(c, n) {
            this.$router.push({
            name: "targetdevinfo",
            query: { code: c, name : n },
      });
        },
        delEmp() {
          for (let k = 0; k < this.empSelect.length; k++){
            if (this.empSelect[k]){
              this.empSelect.splice(k, 1);
              this.empTable.splice(k, 1);
              k = -1;
            }
          }
        }
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
    