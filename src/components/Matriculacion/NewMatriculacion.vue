<template>
    <div class="container text-start">
      <h1 class="text-primary fw-bold">Nueva</h1>
      <div class="card">
        <div class="card-header fw-bold">
          Matriculacion
        </div>
        <div class="card-body">
          <form @submit.prevent="saveMatriculacion">
            <div class="row mb-3"> 
              <label for="id" class="form-label">Código</label> 
              <div class="input-group">
                <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                <input type="text" class="form-control" id="id" placeholder="Código Matriculacion" disabled
                  v-model="matriculacion.id">
              </div>
            </div>
    
  
            <div class="row mb-3"> 
              <label for="muni_codi" class="form-label">Estudiante :</label>
              <div class="input-group">
                <div class="input-group-text"><font-awesome-icon icon="bank" /></div>
                <select class="form-select" v-model="matriculacion.estudiante_id">
                  <option selected value="0">Seleccione un Estudiante</option>
                  <option v-for="estudiante in estudiantes" :key="estudiante.id" :value="estudiante.id">
                    {{ estudiante.nombre }}  {{estudiante.apellido}}
                  </option>
                </select>
              </div>
            </div>

             <div class="row mb-3"> 
              <label for="muni_codi" class="form-label">Curso :</label>
              <div class="input-group">
                <div class="input-group-text"><font-awesome-icon icon="bank" /></div>
                <select class="form-select" v-model="matriculacion.curso_id">
                  <option selected value="0">Seleccione un Curso</option>
                  <option v-for="curso in cursos" :key="curso.id" :value="curso.id">
                    {{ curso.titulo }} 
                  </option>
                </select>
              </div>
            </div>

            
            <div class="row mb-3"> 
              <label for="stock" class="form-label">Fecha Matriculacion:</label>
              <div class="input-group">
                <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                <input type="date" class="form-control" id="fecha_matriculacion	" placeholder="fecha matriculacion"
                  v-model="matriculacion.fecha_matriculacion	">
              </div>
            </div>   
            <button class="btn btn-primary" type="submit">Guardar</button>
            <button class="btn btn-secondary mx-2" @click="cancel">Cancelar</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import Swal from "sweetalert2";
  
  export default {
    name: "EditarProducto",
    data() {
      return {
        matriculacion: {
          id: 0,
          curso_id: 0,
          estudiante_id: 0, 
          fecha_matriculacion	: "", 
        },
        estudiantes: [],
        cursos: [],

      };
    },
    methods: {
      cancel() {
        this.$router.push({ name: "Matriculaciones" });
      },
  
      async saveMatriculacion() {
        const res = await axios.post("http://127.0.0.1:8000/api/matriculaciones", this.matriculacion);
        console.log(res);
        if (res.status == 200) {
          this.$router.push({ name: "Matriculaciones" });
          Swal.fire({
            icon: "success",
            title: "Curso ha sido guardado",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      },
    },
  
    mounted() {
      axios.get("http://127.0.0.1:8000/api/cursos").then((response) => {
        this.cursos = response.data.cursos;
      });
      axios.get("http://127.0.0.1:8000/api/estudiantes").then((response) => {
        this.estudiantes = response.data.estudiantes;
      });
    },
  };
  </script>