<template>
    <div class="container text-start">
      <h1 class="text-primary fw-bold">Editar</h1>
      <div class="card">
        <div class="card-header fw-bold">Instructor</div>
        <div class="card-body">
          <form @submit.prevent="updateInstructor">
            <div class="row mb-3">
              <label for="id" class="form-label">Código</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="tag" />
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="id"
                  placeholder="Código instructor"
                  disabled
                  v-model="instructor.id"
                />
              </div>
            </div>
            <div class="row mb-3">
              <label for="name" class="form-label">Nombre :</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="building" />
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Nombre instructor"
                  v-model="instructor.nombre"
                />
              </div>
            </div>
            <div class="row mb-3">
              <label for="description" class="form-label">Apellido:</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="building" />
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="description"
                  placeholder="Apellido instructor"
                  v-model="instructor.apellido"
                />
              </div>
            </div>
             <div class="row mb-3">
              <label for="name" class="form-label">Especialidad :</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="building" />
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="email"
                  placeholder="Especialidad estudiante"
                  v-model="instructor.especialidad"
                />
              </div>
            </div>
        
            <button class="btn btn-primary" type="submit">Actualizar</button>
            <button class="btn btn-secondary mx-2" @click="cancelar">
              Cancelar
            </button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
 
<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "EditarInstructor",
  data() {
    return {
     instructor: {
        id: 0,
        nombre: "",
        apellido: "",
        especialidad:""
      },
    };
  },
  methods: {
    cancelar() {
      this.$router.push({ name: "Instructores"  });
    },
    async updateInstructor() {
      const res = await axios.put(
       ` http://127.0.0.1:8000/api/instructores/${this.instructor.id}`,
        this.instructor
      );
      if (res.status == 200) {
        this.$router.push({ name: "Instructores" });
        Swal.fire({
          icon: "success",
          title: "instructor has been updated",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    },
  },
  mounted() {
    
    this.instructor.id = this.$route.params.id;
    axios
      .get(`http://127.0.0.1:8000/api/instructores/${this.instructor.id}`)
      .then((response) => {
        this.instructor = response.data.instructor;
      });
  },
};
</script>