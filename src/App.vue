<template>
    <div id="app">

        <header class="blog-header py-3">
            <div class="row flex-nowrap justify-content-between align-items-center">
                <div class="col-4 pt-1"></div>
                <div class="col-4 text-center">
                    <a class="blog-header-logo text-dark" href="#">Books Management</a>
                </div>
                <div class="col-4 d-flex justify-content-end align-items-center">
                    <button v-if="isLoggedIn()" @click="logoutUser()" class="btn btn-danger"><i class="fas fa-power-off"></i> Logout</button>
                </div>
            </div>
        </header>

        <div class="nav-scroller py-1 mb-2">
            <nav class="nav d-flex justify-content-between">
                <a class="p-2 text-muted cursor-pointor"></a>
            </nav>
        </div>

        <main role="main" class="container">
            <div class="row">
                <div class="col-md-12 blog-main">
                    <router-view></router-view>
                    <FlashMessage></FlashMessage>
                </div>
            </div>
        </main>

    </div>
</template>

<script>
    import VueRouter from 'vue-router'

    export default {
        components: {VueRouter},
        methods: {
            logoutUser() {
                localStorage.clear();
                this.$router.push('/');
            },
            isLoggedIn() {
                return !!localStorage.getItem('auth_token');
            }
        }
    }
</script>

<style>
    #app {
        font-size: 14px;
        font-family: 'Roboto', sans-serif;
    }
    .ft-14 {
        font-size: 14px;
    }
    .cursor-pointor {
        cursor: pointer;
    }
</style>
