<template>
    <header class="navbar sticky-top flex-md-nowrap p-0 shadow" data-bs-theme="dark">
        <div class="row content">
            <div class="col-md-3 col-lg-2">
                <a class="navbar-brand icon-arrow" href="#"></a>
            </div>
            <div class="col-md-9 col-lg-10 p-0 text-end">
                <a class="navbar-brand icon-bell" href="#"><span class="badge">{{ notifications }}</span></a>
                <a class="navbar-brand open-time input-base btn-round bg-light-blue no-hover" href="#"><span class="text">Aberto à</span> <span class="time">{{ time }}</span></a>
            </div>
        </div>
    </header>   
</template>

<script>
    export default {
        name: "Navbar",
        data() {
            return {
                time: "9 horas",
                notifications: 4
            } 
        }
    }
</script>

<style lang="scss" scoped>
    .navbar {
        padding-left: 72px !important;
        height: 70px;
        background-color: $black-secondary;
    }
    .navbar .content {
        width: 100%;
    }
    .navbar .icon-arrow {
        margin-left: 20px;
        margin-top: 6px;
        text-align: center;
        width: 30px;
        height: 30px;
        background-size: 25px 25px;
        background-repeat: no-repeat;
        background-position: center center;
        display: block;
    }
    .navbar .icon-bell {
        width: 30px;
        height: 30px;
        background-size: 23px 23px;
        background-repeat: no-repeat;
        background-position: center center;
        display: inline-block;
        position: relative;
        margin-top: 5px;
    }
    .navbar .icon-bell .badge {
        font-size: 12px;
        color: $black-primary;
        background-color: $light-blue;
        width: 17px;
        height: 17px;
        padding: 2px 3px 1px 1px;
        line-height: 1;
        text-align: center;
        border-radius: 50%;
        font-weight: 500;
        position: absolute;
        top: 0;
        right: -4px;
    }
    .navbar .open-time {
        position: relative;
        top: -10px;
    }
    .navbar .open-time .text {
        font-weight: normal;
    }
</style>