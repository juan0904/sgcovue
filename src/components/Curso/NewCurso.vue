<template>
    <div class="container text-start">
      <h1 class="text-primary fw-bold">Nuevo</h1>
      <div class="card">
        <div class="card-header fw-bold">
          Curso
        </div>
        <div class="card-body">
          <form @submit.prevent="saveCurso">
            <div class="row mb-3"> 
              <label for="id" class="form-label">Código</label> 
              <div class="input-group">
                <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                <input type="text" class="form-control" id="id" placeholder="Código Producto" disabled
                  v-model="curso.id">
              </div>
            </div>
  
            <div class="row mb-3"> 
              <label for="name" class="form-label">Titulo :</label>
              <div class="input-group">
                <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                <input type="text" class="form-control" id="name" placeholder="Titulo curso"
                  v-model="curso.titulo">
              </div>
            </div> 
  
            <div class="row mb-3"> 
              <label for="price" class="form-label">Descripcion:</label>
              <div class="input-group">
                <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                <input type="text" class="form-control" id="descripcion" placeholder="Descripcion Curso"
                  v-model="curso.descripcion">
              </div>
            </div> 
  
  
            <div class="row mb-3"> 
              <label for="muni_codi" class="form-label">Instructor :</label>
              <div class="input-group">
                <div class="input-group-text"><font-awesome-icon icon="bank" /></div>
                <select class="form-select" v-model="curso.instructor_id">
                  <option selected value="0">Seleccione un Instructor</option>
                  <option v-for="instructor in instructores" :key="instructor.id" :value="instructor.id">
                    {{ instructor.nombre }}  {{instructor.apellido}}
                  </option>
                </select>
              </div>
            </div>

            
            <div class="row mb-3"> 
              <label for="stock" class="form-label">Fecha Inicio:</label>
              <div class="input-group">
                <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                <input type="date" class="form-control" id="fecha_inicio" placeholder="Fecha Inicio Curso"
                  v-model="curso.fecha_inicio">
              </div>
            </div> 

            
            <div class="row mb-3"> 
              <label for="stock" class="form-label">Fecha Fin:</label>
              <div class="input-group">
                <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                <input type="date" class="form-control" id="fecha_fin" placeholder="Fecha Fin Curso"
                  v-model="curso.fecha_fin">
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
        curso: {
          id: 0,
          titulo: "",
          descripcion: "",
          instructor_id: 0,
          fecha_incio: "",
          fecha_fin:""
        },
        instructores: [],
      };
    },
    methods: {
      cancel() {
        this.$router.push({ name: "Cursos" });
      },
  
      async saveCurso() {
        const res = await axios.post("http://127.0.0.1:8000/api/cursos", this.curso);
        console.log(res);
        if (res.status == 200) {
          this.$router.push({ name: "Cursos" });
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
      axios.get("http://127.0.0.1:8000/api/instructores").then((response) => {
        this.instructores = response.data.instructores;
      });
    },
  };
  </script>