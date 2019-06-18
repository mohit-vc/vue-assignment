<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <p>
          <router-link to="/books/index" class="btn btn-sm btn-warning"> <i class="fas fa-arrow-left"></i> Books Listing</router-link>
          <router-link :to="`/books/edit/${id}`" class="btn btn-sm btn-primary"> <i class="fas fa-pencil-alt"></i> Edit Book</router-link>
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <h4>Book Details: <span v-if="book != null">{{book.name}}</span><span v-else>Not set</span></h4>
        <table class="table table-hover">
          <tbody>
          <template v-if="book != null">
            <tr>
              <th>ID</th>
              <td>{{ book.id }}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{{ book.name }}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{{ book.description }}</td>
            </tr>
            <tr>
              <th>ISBN</th>
              <td>{{ book.isbn }}</td>
            </tr>
            <tr>
              <th>Author</th>
              <td>{{ book.author }}</td>
            </tr>
            <tr>
              <th>User ID</th>
              <td>{{ book.user_id }}</td>
            </tr>
            <tr>
              <th>Created At</th>
              <td>{{ book.created_at }}</td>
            </tr>
            <tr>
              <th>Updated At</th>
              <td>{{ book.updated_at }}</td>
            </tr>
          </template>
          <tr v-else>
            <td colspan="3"><p>Book data not available</p></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
    import axios from 'axios'

    export default {
        name: 'BooksView',
        data() {
            return {
                id: null,
                book: {
                  id: null,
                  name: null,
                  description: null,
                  author: null,
                  isbn: null,
                  user_id: null,
                  created_at: null,
                  updated_at: null
                }
            }
        },
        mounted() {
            this.id = this.$route.params.id;
            this.getBook(this.$route.params.id);
        },
        methods: {
            /**
             * Get single book from API
             * @param id
             */
            getBook(id) {
                axios.get(`/books/${id}`)
                    .then(({data}) => {
                        if (data.success) {
                            this.book = data.data;
                        }
                    })
                    .catch((data) => {
                        this.flashMessage.error({title: 'Error', message: 'Something went wrong in the system, please contact support'});
                    });
            }
        }
    }
</script>
<style scoped>
</style>
