<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Editar</h1>
    <div class="card">
      <div class="card-header fw-bold">Curso</div>
      <div class="card-body">
        <form @submit.prevent="updateCurso">
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
                placeholder="Código Curso"
                disabled
                v-model="curso.id"
              />
            </div>
          </div>
          <div class="row mb-3">
            <label for="comu_nomb" class="form-label">Titulo :</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="building" />
              </div>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Name curso"
                v-model="curso.titulo"
              />
            </div>
          </div>
          <div class="row mb-3">
            <label for="descripcion" class="form-label">Descripcion:</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="building" />
              </div>
              <input
                type="text"
                class="form-control"
                id="descripcion"
                placeholder="descripcion curso"
                v-model="curso.descripcion"
              />
            </div>
          </div>
          
          <div class="row mb-3">
            <label for="instructor_id" class="form-label">Instructor:</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="bank" />
              </div>
              <select class="form-select" v-model="curso.instructor_id">
                <option
                 v-for="instructor in instructores" 
                  :key="instructor.id"
                  v-bind:value="instructor.id">
                  {{ instructor.nombre }}
                </option>
              </select>
            </div>
          </div>

          <div class="row mb-3">
            <label for="stock" class="form-label">Fecha Inicio:</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="building" />
              </div>
              <input
                type="date"
                class="form-control"
                id="stock"
                placeholder="Fecha Inicio"
                v-model="curso.fecha_inicio"
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="stock" class="form-label">Fecha Fin:</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="building" />
              </div>
              <input
                type="date"
                class="form-control"
                id="stock"
                placeholder="Fecha Fin Curso"
                v-model="curso.fecha_fin"
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
  name: "EditarCurso",
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
    cancelar() {
      this.$router.push({ name: "Cursos"  });
    },
    async updateCurso() {
      const res = await axios.put(
        `http://127.0.0.1:8000/api/cursos/${this.curso.id}`,
        this.curso
      );
      if (res.status == 200) {
        this.$router.push({ name: "Cursos" });
        Swal.fire({ 
          icon: "success",
          title: "curso has been updated",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    },
  },
  mounted() {
    this.curso.id = this.$route.params.id;
    axios
      .get(`http://127.0.0.1:8000/api/cursos/${this.curso.id}`)
      .then((response) => {
        this.curso = response.data.curso;
        this.instructores = response.data.instructores;
      });
  },
};
</script>
