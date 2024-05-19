<template>
  <div class="container">
    <h1>
      Listado Instructores
      <button @click="newInstructor" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Nombre</th>
          <th scope="col">Apellido</th>
          <th scope="col">Especialidad</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(instructor, index) in instructores" :key="index">
          <th scope="row">{{ instructor.id }}</th>
          <td>{{ instructor.nombre }}</td>
          <td>{{ instructor.apellido }}</td>
          <td>{{ instructor.especialidad }}</td>
          <td>
            <button
              @click="deleteInstructor(instructor.id)"
              class="btn btn-danger mx-2"
            >
              <font-awesome-icon icon="trash" />
            </button>
            <button
              @click="editInstructor(instructor.id)"
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
  name: "instructor",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      instructores: [],
    };
  },
  methods: {
    async deleteInstructor(id) {
      const result = await Swal.fire({
        title: `Do you want to delete the Instructor with id ${id}?`,
        showCancelButton: true,
        confirmButtonText: "Delete",
      });
      
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`http://127.0.0.1:8000/api/instructores/${id}`);
          if (response.data.success) {
            Swal.fire("Deleted!!", "", "success");
            this.instructores = response.data.instructores;
          }
        } catch (error) {
          Swal.fire("Error!", "There was an error deleting the instructor." , "error");
        }
      }
    },
    editInstructor(id) {
      this.$router.push({ name: 'EditarInstructor', params: { id } });
    },
    newInstructor() {
      this.$router.push({ name: 'NewInstructor' });
    }
  },
  async mounted() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/instructores");
      this.instructores = response.data.instructores;
    } catch (error) {
      Swal.fire("Error!", "There was an error fetching the instructores.", "error");
    }
  }
};
</script>