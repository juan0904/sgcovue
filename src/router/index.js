import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Estudiantes from '../views/Estudiantes'
import NewEstudiante from '../components/Estudiante/NewEstudiante'
import EditarEstudiante from '../components/Estudiante/EditarEstudiante'
import Instructores from '../views/Instructores'
import NewInstructor from '../components/Instructor/NewInstructor'
import EditarInstructor from '../components/Instructor/EditarInstructor'
import Cursos from '../views/Cursos'
import NewCurso from '../components/Curso/NewCurso'
import EditarCurso from '../components/Curso/EditarCurso'
import Matriculaciones from '../views/Matriculaciones'
import NewMatriculacion from '../components/Matriculacion/NewMatriculacion'
import EditarMatriculacion from '../components/Matriculacion/EditarMatriculacion'
import Evaluaciones from '../views/Evaluaciones'
import NewEvaluacion from '../components/Evaluacion/NewEvaluacion'
import EditarEvaluacion from '../components/Evaluacion/EditarEvaluacion'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/estudiantes',
    name: 'Estudiantes',
    component: Estudiantes
  },
  {
    path: '/add-estudiante/',
    name: 'NewEstudiante',
    component: NewEstudiante
  },
  {
    path: '/edit-estudiante/:id',
    name: 'EditarEstudiante',
    component: EditarEstudiante
  },
  {
    path: '/instructores',
    name: 'Instructores',
    component: Instructores
  },
  {
    path: '/add-instructor/',
    name: 'NewInstructor',
    component: NewInstructor
  },
  {
    path: '/edit-instructor/:id',
    name: 'EditarInstructor',
    component: EditarInstructor
  },
  {
    path: '/cursos',
    name: 'Cursos',
    component: Cursos
  },
  {
    path: '/add-curso/',
    name: 'NewCurso',
    component: NewCurso
  },
  {
    path: '/edit-curso/:id',
    name: 'EditarCurso',
    component: EditarCurso
  },
  {
    path: '/matriculaciones',
    name: 'Matriculaciones',
    component: Matriculaciones
  },
  {
    path: '/add-matriculacion/',
    name: 'NewMatriculacion',
    component: NewMatriculacion
  },
  {
    path: '/edit-matriculacion/:id',
    name: 'EditarMatriculacion',
    component: EditarMatriculacion
  },
  {
    path: '/evaluaciones',
    name: 'Evaluaciones',
    component: Evaluaciones
  },
  {
    path: '/add-evaluacion/',
    name: 'NewEvaluacion',
    component: NewEvaluacion
  },
  {
    path: '/edit-evaluacion/:id',
    name: 'EditarEvaluacion',
    component: EditarEvaluacion
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
