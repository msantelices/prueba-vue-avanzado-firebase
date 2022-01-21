<template>
  <div>
    <v-container>
      <v-row
        style="height: 150px;"
      >
        <v-col
          cols="12"
          sm="4"
          v-for="(course, index) in Courses"
          :key="index"
        >
          <Card :CoursesProp="course"></Card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Card from '../components/Card.vue'
import Courses from '../../courses.js'
export default {

  components: {
    Card
  },

  data() {
    return {
      Courses: Courses
    };
  },
}
</script>