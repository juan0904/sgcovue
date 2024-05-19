<template>
  <div class="container">
    <h1>
      Listado Cursos |
      <button @click="newCurso()" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Titulo</th>
          <th scope="col">Descripcion</th>
          <th scope="col">Instructor</th>
          <th scope="col">Fecha Inicio</th>
          <th scope="col">Fecha Final</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(curso, index) in cursos" :key="index">
          <th scope="row">{{ curso.id }}</th>
          <td>{{ curso.titulo }}</td>
          <td>{{ curso.descripcion }}</td>
          <td>{{ curso.instructores }}</td>
          <td>{{ curso.fecha_inicio }}</td>
          <td>{{ curso.fecha_fin }}</td>
          <td>
            <button
              @click="deleteCurso(curso.id)"
              class="btn btn-danger mx-2"
            >
              <font-awesome-icon icon="trash" />
            </button>
            <button
              @click="editCurso(curso.id)"
              class="btn btn-warning mx-2"
            >
              <font-awesome-icon icon="pencil" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "Curso",
  data() {
    return {
      cursos: [],
    };
  },
  methods: {
    deleteCurso(codigo) {
      Swal.fire({
        title: `Do you want to delete the Curso with id ${codigo}?`,
        showCancelButton: true,
        confirmButtonText: "Delete",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://127.0.0.1:8000/api/cursos/${codigo}`)
            .then((response) => {
              if (response.data.success) {
                Swal.fire("Deleted!!", "", "success");
                this.cursos = response.data.cursos;
              }
            });
        }
      });
    },
    editCurso(id){
        this.$router.push({name:'EditarCurso', params:{id: `${id}`}})
    },
    newCurso(){
        this.$router.push({name:'NewCurso'});
    }
  },
  mounted() {
    axios
      .get("http://127.0.0.1:8000/api/cursos") // Corrected URL
      .then((response) => {
        this.cursos = response.data.cursos;
      });
  },
};
</script>
