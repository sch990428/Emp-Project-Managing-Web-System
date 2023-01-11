import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Project from '../views/Project.vue'
import Employee from '../views/Employee.vue'
import DevInfo from '../views/DevInfo.vue'
import MyPage from '../views/MyPage.vue'
import ProjDevInfo from '../views/ProjDevInfo.vue'
import TargetDevInfo from '../views/TargetDevInfo.vue'
import TargetDevInfoEdit from '../views/TargetDevInfoEdit.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/project',
    name: 'project',
    component: Project
  },
  {
    path: '/employee',
    name: 'employee',
    component: Employee
  },
  {
    path: '/devinfo',
    name: 'devinfo',
    component: DevInfo
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: MyPage
  },
  {
    path: '/projdevinfo',
    name: 'projdevinfo',
    component: ProjDevInfo
  },
  {
    path: '/targetdevinfo',
    name: 'targetdevinfo',
    component: TargetDevInfo
  },
  {
    path: '/targetdevinfoEdit',
    name: 'targetdevinfoEdit',
    component: TargetDevInfoEdit
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;
