<template>
    <div class="sidebar border border-right col p-0 sidebar-size">
        <div class="offcanvas-md offcanvas-end" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
            <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-0 overflow-y-auto">
                <img class="logo" :src="logo" :alt="company">
                <ul class="nav nav-top flex-column">
                    <li class="nav-item" v-for="(link, index) in links" :key="index">
                        <router-link :to="link.route" @click="getActive(index)" class="nav-link d-flex align-items-center gap-2 active sidbar-icon" :class="[link.active ? 'icon-active ' + link.icon : link.icon]" aria-current="page"></router-link>
                    </li>
                </ul>
                <ul class="nav nav-bottom flex-column">
                    <li class="nav-item">
                        <router-link  to="/perfil" class="nav-link d-flex align-items-center gap-2 active sidbar-icon icon-exit icon-active" aria-current="page"></router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Sidebar",
        data() {
            return {
                logo: "/img/logo1.png",
                company: "TATÁ Sushi",
                links: [
                    { icon: "icon-grid", name: "", route: "/", active: false},
                    { icon: "icon-graph", name: "", route: "/", active: false},
                    { icon: "icon-settings", name: "", route: "/perfil", active: true},
                    { icon: "icon-clipboard", name: "", route: "/", active: false},
                ]
            } 
        },
        methods: {
            getActive(index) {
                this.links.map((link, i) => {
                    link.active = i === index ? true : false ;
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .logo {
        width: 31px;
        height: 32px;
        margin: auto;
        margin-top: 20px;
    }
    .sidebar-size {
        width: 72px;
        height: 100%;
        position: fixed;
        bottom: 0;
        z-index: 1100;
        border: none !important;
        background-color: $black-primary;
    }
    .sidbar-icon {
        text-align: center;
        width: 30px;
        height: 30px;
        background-size: 17px 17px;
        background-repeat: no-repeat;
        background-position: center center;
        opacity: 0.3;
        margin: auto;
    }
    .nav-top li {
        padding-top: 40px;
        padding-bottom: 40px;
        width: 30px;
        margin: auto;
        border-bottom: 1px solid $gray-space;
    }
    .nav-bottom {
        position: absolute;
        bottom: 25px;
        width: 100%;
    }
    .icon-active {
        opacity: 1;
    }
</style>