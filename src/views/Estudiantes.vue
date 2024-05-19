<template>
  <div class="container">
    <h1>
      Listado estudiante
      <button @click="newEstudiante" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Nombre</th>
          <th scope="col">Apellido</th>
          <th scope="col">Email</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(estudiante, index) in estudiantes" :key="index">
          <th scope="row">{{ estudiante.id }}</th>
          <td>{{ estudiante.nombre }}</td>
          <td>{{ estudiante.apellido }}</td>
          <td>{{ estudiante.email }}</td>
          <td>
            <button
              @click="deleteEstudiante(estudiante.id)"
              class="btn btn-danger mx-2"
            >
              <font-awesome-icon icon="trash" />
            </button>
            <button
              @click="editEstudiante(estudiante.id)"
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
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "estudiante",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      estudiantes: [],
    };
  },
  methods: {
    async deleteEstudiante(id) {
      const result = await Swal.fire({
        title: `Do you want to delete the Student with id ${id}?`,
        showCancelButton: true,
        confirmButtonText: "Delete",
      });
      
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`http://127.0.0.1:8000/api/estudiantes/${id}`);
          if (response.data.success) {
            Swal.fire("Deleted!!", "", "success");
            this.estudiantes = response.data.estudiantes;
          }
        } catch (error) {
          Swal.fire("Error!", "There was an error deleting the student." , "error");
        }
      }
    },
    editEstudiante(id) {
      this.$router.push({ name: 'EditarEstudiante', params: { id } });
    },
    newEstudiante() {
      this.$router.push({ name: 'NewEstudiante' });
    }
  },
  async mounted() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/estudiantes");
      this.estudiantes = response.data.estudiantes;
    } catch (error) {
      Swal.fire("Error!", "There was an error fetching the students.", "error");
    }
  }
};
</script>