<template>
    <Navbar />
    <div class="container-fluid">
        <div class="row">
            <Sidebar />
            <main class="col-12 px-md-4 container-view">
                <router-view />
            </main>
        </div>
    </div>
</template>

<script>
    import Navbar from "./components/Navbar.vue";
    import Sidebar from "./components/Sidebar.vue";

    export default {
        components: {
            Navbar,
            Sidebar,
        },
    };
</script>

<style lang="scss">
    body {
        background-color: $gray-bg;
    }
</style>