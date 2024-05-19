<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Editar</h1>
    <div class="card">
      <div class="card-header fw-bold">Matriculacion</div>
      <div class="card-body">
        <form @submit.prevent="updateMatriculacion">
          <div class="row mb-3">
            <label for="codigo" class="form-label">Código</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="tag" />
              </div>
              <input
                type="text"
                class="form-control"
                id="id"
                placeholder="Código Matriculacion"
                disabled
                v-model="matriculacion.id"
              />
            </div>
          </div>
         
          
          <div class="row mb-3">
            <label for="estudiante_id" class="form-label">Estudiante:</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="bank" />
              </div>
              <select class="form-select" v-model="matriculacion.estudiante_id">
                <option
                 v-for="estudiante in estudiantes" 
                  :key="estudiante.id"
                  v-bind:value="estudiante.id">
                  {{ estudiante.nombre }}
                </option>
              </select>
            </div>
          </div>

            <div class="row mb-3">
            <label for="estudiante_id" class="form-label">Curso:</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="bank" />
              </div>
              <select class="form-select" v-model="matriculacion.curso_id">
                <option
                 v-for="curso in cursos" 
                  :key="curso.id"
                  v-bind:value="curso.id">
                  {{ curso.titulo }}
                </option>
              </select>
            </div>
          </div>

          <div class="row mb-3">
            <label for="stock" class="form-label">Fecha Matriculacion:</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="building" />
              </div>
              <input
                type="date"
                class="form-control"
                id="stock"
                placeholder="Fecha Matriculacion"
                v-model="matriculacion.fecha_matriculacion"
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
  name: "EditarMatriculacion",
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
    cancelar() {
      this.$router.push({ name: "Matriculaciones"  });
    },
    async updateMatriculacion() {
      const res = await axios.put(
        `http://127.0.0.1:8000/api/matriculaciones/${this.matriculacion.id}`,
        this.matriculacion
      );
      if (res.status == 200) {
        this.$router.push({ name: "Matriculaciones" });
        Swal.fire({ 
          icon: "success",
          title: "matriculacion has been updated",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    },
  },
  mounted() {
    this.matriculacion.id = this.$route.params.id;
    axios
      .get(`http://127.0.0.1:8000/api/matriculaciones/${this.matriculacion.id}`)
      .then((response) => {
        this.matriculacion = response.data.matriculacion;
        this.cursos = response.data.cursos;
        this.estudiantes = response.data.estudiantes;
      });
  },
};
</script>
