<template>
    <div class="container text-start">
      <h1 class="text-primary fw-bold">Editar</h1>
      <div class="card">
        <div class="card-header fw-bold">Estudiante</div>
        <div class="card-body">
          <form @submit.prevent="updateEstudiante">
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
                  placeholder="Código estudiante"
                  disabled
                  v-model="estudiante.id"
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
                  placeholder="Nombre estudiante"
                  v-model="estudiante.nombre"
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
                  placeholder="Apellido estudiante"
                  v-model="estudiante.apellido"
                />
              </div>
            </div>
             <div class="row mb-3">
              <label for="name" class="form-label">Email :</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="building" />
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="email"
                  placeholder="Email estudiante"
                  v-model="estudiante.email"
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
  name: "EditarEstudiante",
  data() {
    return {
     estudiante: {
        id: 0,
        nombre: "",
        apellido: "",
        email:""
      },
    };
  },
  methods: {
    cancelar() {
      this.$router.push({ name: "Estudiantes"  });
    },
    async updateEstudiante() {
      const res = await axios.put(
       ` http://127.0.0.1:8000/api/estudiantes/${this.estudiante.id}`,
        this.estudiante
      );
      if (res.status == 200) {
        this.$router.push({ name: "Estudiantes" });
        Swal.fire({
          icon: "success",
          title: "estudiante has been updated",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    },
  },
  mounted() {
    
    this.estudiante.id = this.$route.params.id;
    axios
      .get(`http://127.0.0.1:8000/api/estudiantes/${this.estudiante.id}`)
      .then((response) => {
        this.estudiante = response.data.estudiante;
      });
  },
};
</script>