<template>
  <div class="container">
    <h1>
      Listado Evaluaciones |
      <button @click="newEvaluacion()" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Curso</th>
          <th scope="col">Estudiante</th> 
          <th scope="col">Nota</th>
          <th scope="col">Comentarios</th>  
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(evaluacion, index) in evaluaciones" :key="index">
          <th scope="row">{{ evaluacion.id }}</th>
          <td>{{ evaluacion.curso }}</td>
          <td>{{ evaluacion.estudiante }}</td> 
          <td>{{ evaluacion.nota }}</td> 
          <td>{{ evaluacion.comentarios }}</td> 
          <td>
            <button
              @click="deleteEvaluacion(evaluacion.id)"
              class="btn btn-danger mx-2"
            >
              <font-awesome-icon icon="trash" />
            </button>
            <button
              @click="editEvaluacion(evaluacion.id)"
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
      evaluaciones: [],
    };
  },
  methods: {
    deleteEvaluacion(codigo) {
      Swal.fire({
        title: `Do you want to delete the Evaluacion with id ${codigo}?`,
        showCancelButton: true,
        confirmButtonText: "Delete",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://127.0.0.1:8000/api/evaluaciones/${codigo}`)
            .then((response) => {
              if (response.data.success) {
                Swal.fire("Deleted!!", "", "success");
                this.evaluaciones = response.data.evaluaciones;
              }
            });
        }
      });
    },
    editEvaluacion(id){
        this.$router.push({name:'EditarEvaluacion', params:{id: `${id}`}})
    },
    newEvaluacion(){
        this.$router.push({name:'NewEvaluacion'});
    }
  },
  mounted() {
    axios
      .get("http://127.0.0.1:8000/api/evaluaciones") // Corrected URL
      .then((response) => {
        this.evaluaciones = response.data.evaluaciones;
      });
  },
};
</script>
