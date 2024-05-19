<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Editar</h1>
    <div class="card">
      <div class="card-header fw-bold">Evaluacion</div>
      <div class="card-body">
        <form @submit.prevent="updateEvaluacion">
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
                v-model="evaluacion.id"
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="estudiante_id" class="form-label">Estudiante:</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="bank" />
              </div>
              <select class="form-select" v-model="evaluacion.estudiante_id">
                <option
                  v-for="estudiante in estudiantes"
                  :key="estudiante.id"
                  v-bind:value="estudiante.id"
                >
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
              <select class="form-select" v-model="evaluacion.curso_id">
                <option
                  v-for="curso in cursos"
                  :key="curso.id"
                  v-bind:value="curso.id"
                >
                  {{ curso.titulo }}
                </option>
              </select>
            </div>
          </div>

          <div class="row mb-3">
            <label for="stock" class="form-label">Nota:</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="building" />
              </div>
              <input
                type="number"
                step= 0.01
                class="form-control"
                id="stock"
                placeholder="Fecha Matriculacion"
                v-model="evaluacion.nota"
              />
            </div>
          </div>
          <div class="row mb-3">
            <label for="stock" class="form-label">Comentarios:</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="building" />
              </div>
              <input
                type="text"
                class="form-control"
                id="stock"
                placeholder="Comentarios"
                v-model="evaluacion.comentarios"
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
  name: "EditarEvaluacion",
  data() {
    return {
     evaluacion: {
          id: 0,
          curso_id: 0,
          estudiante_id: 0, 
          nota	: 0, 
          comentarios : ""
        },
      estudiantes: [],
      cursos: [],
    };
  },
  methods: {
    cancelar() {
      this.$router.push({ name: "Evaluaciones" });
    },
    async updateEvaluacion() {
      const res = await axios.put(
        `http://127.0.0.1:8000/api/evaluaciones/${this.evaluacion.id}`,
        this.evaluacion
      );
      if (res.status == 200) {
        this.$router.push({ name: "Evaluaciones" });
        Swal.fire({
          icon: "success",
          title: "Evaluacion has been updated",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    },
  },
  mounted() {
    this.evaluacion.id = this.$route.params.id;
    axios
      .get(`http://127.0.0.1:8000/api/evaluaciones/${this.evaluacion.id}`)
      .then((response) => {
        this.evaluacion = response.data.evaluacion;
        this.cursos = response.data.cursos;
        this.estudiantes = response.data.estudiantes;
      });
  },
};
</script>
