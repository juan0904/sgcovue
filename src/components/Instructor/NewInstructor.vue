<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Nuevo</h1>
    <div class="card">
      <div class="card-header fw-bold">
        Instructor
      </div>
      <div class="card-body">
        <form @submit.prevent="saveInstructor">
          <div class="row mb-3"> 
            <label for="id" class="form-label">Código</label> 
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
              <input type="text" class="form-control" id="id" placeholder="Código Instructor" disabled
                v-model="instructor.id">
            </div>
          </div>

          <div class="row mb-3"> 
            <label for="name" class="form-label">Nombre :</label>
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="building" /></div>
              <input type="text" class="form-control" id="name" placeholder="Nombre Instructor"
                v-model="instructor.nombre">
            </div>
          </div> 

          <div class="row mb-3"> 
            <label for="price" class="form-label">Apellidos:</label>
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="building" /></div>
              <input type="text" class="form-control" id="price" placeholder="Apellido Instructor"
                v-model="instructor.apellido">
            </div>
          </div> 

           <div class="row mb-3"> 
            <label for="name" class="form-label">Especialidad :</label>
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="building" /></div>
              <input type="text" class="form-control" id="name" placeholder="Especialidad Instructor"
                v-model="instructor.especialidad">
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
  name: "NewInstructor",
  data() {
    return {
      instructor: {
        id: 0,
        nombre: "",
        apellido: "",
        especialidad:""
      }
    };
  },
  methods: {
    cancel() {
      this.$router.push({ name: "Instructores" });
    },

    async saveInstructor() {
      const res = await axios.post("http://127.0.0.1:8000/api/instructores", this.instructor);
      console.log(res);
      if (res.status == 200) {
        this.$router.push({ name: "Instructores" });
        Swal.fire({
          icon: "success",
          title: "Instructor ha sido guardado",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    },
  },

};
</script>
