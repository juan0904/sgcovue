<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Nuevo</h1>
    <div class="card">
      <div class="card-header fw-bold">
        Estudiante
      </div>
      <div class="card-body">
        <form @submit.prevent="saveEstudiante">
          <div class="row mb-3"> 
            <label for="id" class="form-label">Código</label> 
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
              <input type="text" class="form-control" id="id" placeholder="Código Estudiante" disabled
                v-model="estudiante.id">
            </div>
          </div>

          <div class="row mb-3"> 
            <label for="name" class="form-label">Nombre :</label>
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="building" /></div>
              <input type="text" class="form-control" id="name" placeholder="Nombre Estudiante"
                v-model="estudiante.nombre">
            </div>
          </div> 

          <div class="row mb-3"> 
            <label for="price" class="form-label">Apellidos:</label>
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="building" /></div>
              <input type="text" class="form-control" id="price" placeholder="Apellido Estudiante"
                v-model="estudiante.apellido">
            </div>
          </div> 

           <div class="row mb-3"> 
            <label for="name" class="form-label">Email :</label>
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="building" /></div>
              <input type="text" class="form-control" id="name" placeholder="Email Estudiante"
                v-model="estudiante.email">
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
  name: "NewEstudiante",
  data() {
    return {
      estudiante: {
        id: 0,
        nombre: "",
        apellido: "",
        email:""
      }
    };
  },
  methods: {
    cancel() {
      this.$router.push({ name: "Estudiantes" });
    },

    async saveEstudiante() {
      const res = await axios.post("http://127.0.0.1:8000/api/estudiantes", this.estudiante);
      console.log(res);
      if (res.status == 200) {
        this.$router.push({ name: "Estudiantes" });
        Swal.fire({
          icon: "success",
          title: "Estudiante ha sido guardado",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    },
  },

};
</script>
