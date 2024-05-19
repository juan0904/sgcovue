<template>
  <div class="container">
    <h1>
      Listado Matriculaciones |
      <button @click="newMatriculacion()" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Curso</th>
          <th scope="col">Estudiante</th> 
          <th scope="col">Fecha Matriculacion</th> 
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(matriculacion, index) in matriculaciones" :key="index">
          <th scope="row">{{ matriculacion.id }}</th>
          <td>{{ matriculacion.curso }}</td>
          <td>{{ matriculacion.estudiante }}</td> 
          <td>{{ matriculacion.fecha_matriculacion }}</td> 
          <td>
            <button
              @click="deleteMatriculacion(matriculacion.id)"
              class="btn btn-danger mx-2"
            >
              <font-awesome-icon icon="trash" />
            </button>
            <button
              @click="editMatriculacion(matriculacion.id)"
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
      matriculaciones: [],
    };
  },
  methods: {
    deleteMatriculacion(codigo) {
      Swal.fire({
        title: `Do you want to delete the Matriculacion with id ${codigo}?`,
        showCancelButton: true,
        confirmButtonText: "Delete",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://127.0.0.1:8000/api/matriculaciones/${codigo}`)
            .then((response) => {
              if (response.data.success) {
                Swal.fire("Deleted!!", "", "success");
                this.matriculaciones = response.data.matriculaciones;
              }
            });
        }
      });
    },
    editMatriculacion(id){
        this.$router.push({name:'EditarMatriculacion', params:{id: `${id}`}})
    },
    newMatriculacion(){
        this.$router.push({name:'NewMatriculacion'});
    }
  },
  mounted() {
    axios
      .get("http://127.0.0.1:8000/api/matriculaciones") // Corrected URL
      .then((response) => {
        this.matriculaciones = response.data.matriculaciones;
      });
  },
};
</script>
