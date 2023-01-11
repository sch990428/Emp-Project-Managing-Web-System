var express = require('express');
var router = express.Router();
var app = express();
var port = 4000;

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',   
  password: '55361',
  database: 'project_managing'  
});  

app.listen(port);

//사번 할당을 위한 사번의 최댓값
app.get('/maxId', (req, res) => {
  connection.query('SELECT MAX(employee_id) AS mi FROM employee', function (error, results, fields) {
  if (error) throw error;
  res.send(results);  
  })
});

//로그인
app.post('/login', (req, res) => {
  connection.query('SELECT employee_id FROM employee WHERE web_id = ? AND web_password = ?', [req.body.userId, req.body.userPass], function (error, results, fields) {
    if (error) throw error;
      res.send(results);  
  });
});

//마이페이지 정보 불러오기
app.post('/data', (req, res) => {
  connection.query('SELECT * FROM employee WHERE employee_id = ?', [req.body.code], function (error, results, fields) {
    if (error) throw error;
      res.send(results);  
  });
});

//직원 명단 모두 출력하기
app.get('/empList', (req, res) => {
  connection.query('SELECT * FROM employee', function (error, results, fields) {
  if (error) throw error;
  res.send(results);  
  })
});

//프로젝트 목록 모두 출력하기
app.get('/projList', (req, res) => {
  connection.query('SELECT project_id,project.name,end_date,start_date,status,client.name as cname FROM project,client WHERE project.client_id = client.client_id', function (error, results, fields) {
  if (error) throw error;
  res.send(results);  
  })
});

//프로젝트에 참여한 개발자 목록 모두 출력하기
app.post('/projDevList/:id', (req, res) => {
  let targetProj = req.params.id;
  connection.query('SELECT developer_id, role, name FROM input_dev, employee WHERE project_id = ? and developer_id = employee_id', [targetProj], function (error, results, fields) {
    if (error) throw error;
    res.send(results);  
    })
});

//프로젝트 코드로 검색하기
app.post('/project/search/id/:id', (req, res) => {
  let target = req.params.id;
  connection.query('SELECT project_id,project.name,end_date,start_date,status,client.name as cname FROM project,client WHERE project_id = ? AND client.client_id = project.client_id', [target], function (error, results, fields) {
  if (error) throw error;
    res.send(results);  
  });
});

//프로젝트 이름으로 검색하기
app.post('/project/search/name/:id', (req, res) => {
  let target = req.params.id;
  connection.query('SELECT project_id,project.name,end_date,start_date,status,client.name as cname FROM project,client WHERE project.name LIKE ? AND client.client_id = project.client_id', ['%' + target + '%'], function (error, results, fields) {
  if (error) throw error;
    res.send(results);  
  });
});

//프로젝트 발주처 이름으로 검색하기
app.post('/project/search/cliname/:id', (req, res) => {
  let target = req.params.id;
  connection.query('SELECT project_id,project.name,end_date,start_date,status,client.name as cname FROM project,client WHERE client.name LIKE ? AND client.client_id = project.client_id', ['%' + target + '%'], function (error, results, fields) {
  if (error) throw error;
    res.send(results);  
  });
});

//사번으로 검색하기
app.post('/employee/search/id/:id', (req, res) => {
  let target = req.params.id;
  connection.query('SELECT * FROM employee WHERE employee_id = ?', [target], function (error, results, fields) {
  if (error) throw error;
    res.send(results);  
  });
});

//사원 이름으로 검색하기
app.post('/employee/search/name/:id', (req, res) => {
  let target = req.params.id;
  connection.query('SELECT * FROM employee WHERE name LIKE ?', ['%' + target + '%'], function (error, results, fields) {
  if (error) throw error;
    res.send(results);  
  });
});

//사원 직무로 검색하기
app.post('/employee/search/role/:id', (req, res) => {
  let target = req.params.id;
  connection.query('SELECT * FROM employee WHERE team = ?', [target], function (error, results, fields) {
  if (error) throw error;
    res.send(results);  
  });
});

//사번으로 개발자 검색하기
app.post('/devinfo/search/id/:id', (req, res) => {
  let target = req.params.id;
  connection.query('SELECT * FROM developer_info, employee WHERE developer_id = employee_id AND employee_id = ?', [target], function (error, results, fields) {
  if (error) throw error;
    console.log(results);
    res.send(results);  
  });
});

//사원 이름으로 개발자 검색하기
app.post('/devinfo/search/name/:id', (req, res) => {
  let target = req.params.id;
  connection.query('SELECT * FROM developer_info, employee WHERE developer_id = employee_id AND name LIKE ?', ['%' + target + '%'], function (error, results, fields) {
  if (error) throw error;
    res.send(results);  
  });
});

//개발자 등급으로 개발자 검색하기
app.post('/devinfo/search/grade/:id', (req, res) => {
  let target = req.params.id;
  connection.query('SELECT * FROM developer_info, employee WHERE grade = ?', [target], function (error, results, fields) {
  if (error) throw error;
    res.send(results);  
  });
});

//개발자 경력 목록 모두 출력하기
app.get('/devinfo', (req, res) => {
  connection.query('SELECT * FROM developer_info, employee WHERE employee_id = developer_id', function (error, results, fields) {
    if (error) throw error;
    res.send(results);  
    })
});

//특정 개발자 경력 불러오기
app.post('/devinfo/:id', (req, res) => {
  let target = req.params.id;
  connection.query('SELECT career,grade,skill_set,developer_id,name FROM developer_info, employee WHERE developer_id = ? AND employee_id = developer_id', [target], function (error, results, fields) {
  if (error) throw error;
    res.send(results);  
  });
});

//특정 개발자가 수행한 평가 불러오기
app.post('/devinfo/eval/:id', (req, res) => {
  let target = req.params.id;
  connection.query('SELECT communication_detail,communication_grade,ability_detail,ability_grade,type,evaluated_id,evaluator_id,project_id, employee.name AS ename FROM evaluation, employee WHERE evaluator_id = ? AND employee_id = evaluated_id', [target], function (error, results, fields) {
  if (error) throw error;
    res.send(results);  
  });
});

//특정 개발자가 참여한 프로젝트 불러오기
app.post('/devinfo/proj/:id', (req, res) => {
  let target = req.params.id;
  connection.query('SELECT project.name,input_dev.start_date,input_dev.end_date,input_dev.status FROM input_dev, project, employee WHERE input_dev.developer_id = ? AND input_dev.project_id = project.project_id AND employee_id = developer_id;', [target], function (error, results, fields) {
  if (error) throw error;
    res.send(results);  
  });
});

//특정 개발자의 경력 정보 수정하기
app.post('/dev/edit', (req, res) => {
  connection.query('update developer_info set career = ?, grade = ?, skill_set = ? WHERE developer_id = ?;', [req.body[0].career, req.body[0].grade, req.body[0].skill_set, req.body[0].developer_id], function (error, results, fields) {
    if (error) throw error;
      res.send(results);  
  });
});

//회원가입
app.post('/signup', (req, res) => {
  connection.query('INSERT INTO employee VALUES(?, ?, ?, ?, ?, ?, ?);', [req.body.code, req.body.spec, req.body.team, req.body.name, req.body.socialNo, req.body.ID, req.body.PW], function (error, results, fields) {
    if (error) throw error;
      res.send(results);  
  });
});

//내 정보 수정하기
app.post('/my/edit', (req, res) => {
  connection.query('update employee set web_password = ? WHERE employee_id = ?;', [req.body.PW, req.body.code], function (error, results, fields) {
    if (error) throw error;
      res.send(results);  
  });
});

module.exports = router;
