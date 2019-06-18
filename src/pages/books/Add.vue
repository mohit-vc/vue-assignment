<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <p>
          <router-link to="/books/index" class="btn btn-sm btn-warning"> <i class="fas fa-arrow-left"></i> Books Listing</router-link>
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <h4 v-if="state==='add'">Add New Book</h4>
        <h4 v-if="state==='update'">Update Book</h4>

        <form @submit.prevent="saveBook()">
          <div class="form-group">
            <label>Book Name:</label>
            <input v-model="book.name" type="text" class="form-control" required="required" maxlength="200">
          </div>

          <div class="form-group">
            <label>Description:</label>
            <textarea v-model="book.description" class="form-control" required="required"></textarea>
          </div>

          <div class="form-group">
            <label>Author:</label>
            <input v-model="book.author" type="text" class="form-control" required="required" maxlength="80">
          </div>

          <div class="form-group">
            <label>ISBN:</label>
            <input v-model="book.isbn" type="text" class="form-control" required="required" maxlength="10">
          </div>

          <button v-if="state === 'add'" type="submit" class="btn btn-success">Add Book</button>
          <button v-else type="submit" class="btn btn-success">Edit Book</button>
        </form>

      </div>
    </div>
  </div>
</template>
<script>
    import axios from 'axios'

    export default {
        name: 'BooksAdd',
        data() {
            return {
                book: {
                  name: null,
                  description: null,
                  author: null,
                  isbn: null,
                  user_id: null
                },
                state: 'add',
                id: null
            }
        },
        mounted() {
            if(this.$route.params.id !== undefined) {
                this.id = this.$route.params.id;
                this.getBook(this.$route.params.id);
                this.state = 'update';
            } else {
                this.state = 'add';
            }
        },
        methods: {
            /**
             * Adds or Updates a book object
             */
            saveBook() {
                let reqHandler;
                if(this.state === 'add') {
                    reqHandler = axios.post(`/books`, this.book);
                } else {
                    reqHandler = axios.put(`/books/${this.id}`, this.book);
                }

                reqHandler.then(({data}) => {
                        if (data.success) {
                            this.$router.push(`/books/index`);
                        }
                    })
                    .catch(() => {
                        this.flashMessage.error({title: 'Error', message: 'Something went wrong in the system, please contact support'});
                    })
            },
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
