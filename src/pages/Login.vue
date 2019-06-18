<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <h4>Login</h4>

        <form @submit.prevent="login()">
          <div class="form-group">
            <label>Email:</label>
            <input v-model="loginData.email" type="text" class="form-control" required="required">
          </div>

          <div class="form-group">
            <label>Password:</label>
            <input v-model="loginData.password" type="password" class="form-control" required="required">
          </div>

          <button type="submit" class="btn btn-success">Login</button>
        </form>

      </div>
    </div>
  </div>
</template>
<script>
    import axios from 'axios'

    export default {
        name: 'Login',
        data() {
            return {
                loginData: {
                    email: null,
                    password: null
                }
            }
        },
        methods: {
            /**
             * Login method
             */
            login() {
                axios.post(`/auth/login`, this.loginData)
                    .then(({data}) => {
                        if (data.success) {
                            localStorage.setItem('auth_token', data.data.token);
                            this.$router.push(`/books/index`);
                        }
                    })
                    .catch(() => {
                        this.flashMessage.error({title: 'Error', message: 'Incorrect username or password combination'});
                    });
            }
        }
    }
</script>
<style scoped>
</style>
