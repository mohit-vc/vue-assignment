<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <p>
          <router-link to="/books/add" class="btn btn-sm btn-success"> <i class="fas fa-user-plus"></i> Add Book</router-link>
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <table class="table table-hover">
          <thead>
          <tr>
            <th>#</th>
            <th>Book Name</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-if="books.length > 0" v-for="book, i in books">
            <td>{{i+1}}</td>
            <td>{{ book.name }}</td>
            <td>{{ book.author }}</td>
            <td>{{ book.isbn }}</td>
            <td>
              <button class="btn btn-sm btn-primary" @click="viewBook(book.id)"><i class="fas fa-eye"></i></button>
              <button class="btn btn-sm btn-warning" @click="editBook(book.id)"><i class="fas fa-pencil-alt"></i></button>
              <button class="btn btn-sm btn-danger" @click="deleteBook(book.id)"><i class="fas fa-trash-alt"></i></button>
            </td>
          </tr>
          <tr v-else>
            <td colspan="3"><p>No books available</p></td>
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
        name: 'BooksIndex',
        data() {
            return {
                books: []
            }
        },
        mounted() {
            this.getBooks();
        },
        methods: {
            /**
             * Get books from API
             */
            getBooks() {
                axios.get(`/books`)
                    .then(({data}) => {
                        if (data.success) {
                            this.books = data.data;
                        }
                    })
                    .catch((data) => {
                        this.flashMessage.error({title: 'Error', message: 'Something went wrong in the system, please contact support'});
                    });
            },
            /**
             * Switch to book details page route
             * @param id
             */
            viewBook(id) {
                return this.$router.push(`/books/view/${id }`);
            },
            /**
             * Switches to books edit page route
             * @param id
             */
            editBook(id) {
                return this.$router.push(`/books/edit/${id}`);
            },
            /**
             * delete books api with confirmation
             * @param id
             */
            deleteBook(id) {
                if(confirm(`Are you sure you want to delete this book ?`)) {
                    axios.delete(`/books/${id}`)
                        .then(({data}) => {
                            if (data.success) {
                                this.getBooks();
                            }
                        })
                        .catch((data) => {
                            this.flashMessage.error({title: 'Error', message: 'Something went wrong in the system, please contact support'});
                        });
                }
            }
        }
    }
</script>
<style scoped>

</style>
