<template lang="">
    <ul class="navbar-nav me-auto" v-if="type=='Horizontal'">
        <li v-for="(menu, index) in menus" class="nav-item me-4" :key="menu.index">
            <router-link 
            :to="menu.link"
            class="link link-hover"
            active-class="active"
            :title="`This link goes to ${menu.name} page.`">
                {{ menu.name }}
            </router-link>
        </li>
    </ul>

    <ul class="navbar-nav me-auto" v-else>
        <li v-if="auth" v-for="(menu, index) in menus" class="nav-item me-4 mb-3" :key="menu.name">
            <router-link 
            :to="menu.link"
            class="link link-hover"
            active-class="active"
            :title="`This link goes to ${menu.name} page.`">
                {{ menu.name }}
            </router-link>
        </li>
    </ul>
</template>
<script>
export default {
    props: ['menus', 'type', 'auth']
}
</script>
<style scoped>
.active{
    color: #4CAF50!important;
}
</style>