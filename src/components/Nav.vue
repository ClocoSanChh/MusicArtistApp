<template>
    <div>
        <nav class="navbar navbar-dark navbar-expand-lg py-0 px-3 px-lg-5 d-flex justify-content-between align-items-center">
            <div class="container-fluid d-flex flex-column justify-content-center align-items-center mt-2">
                <div class="navbar-brand container-fluid d-flex justify-content-between align-items-center">
                    <div class="fs-4 fw-bold link">
                        <router-link :to="$globals.get('auth')?{name:'home'}:{name:'login'}"  class="link-hover">
                            <span class="text-success">Admin</span><span>Panel</span>
                        </router-link>
                    </div>
                    <div class="d-none d-lg-block">
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <NavLink v-if="auth" :menus="menus.logged" :type="'Horizontal'" :auth="auth"></NavLink>
                            <NavLink v-else :menus="menus.notLogged" :type="'Horizontal'" :auth="auth"></NavLink>
                        </div>
                    </div>
                    <div class="d-flex align-items-center">
                    <NavLink v-if="auth" :menus="menus.profile" :type="'Horizontal'" :auth="auth"></NavLink>
                        <div>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon" style="color:white;"></span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="navbar-brand d-block d-lg-none mt-0">
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <NavLink v-if="auth" :menus="menus.logged" :type="'Vertical'" :auth="auth"></NavLink>
                        <NavLink v-else :menus="menus.notLogged" :type="'Vertical'" :auth="auth"></NavLink>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>
<script>
import NavLink from "./NavLink.vue";
export default {
    inject: ['$globals', '$bus'],
    components:{
        NavLink
    },
    created(){
        this.$bus.$on('updateNav', () => {
            this.auth = this.$globals.get('auth');
            this.menus.profile[0] = {
                        'name' : this.$globals.get('user')? this.$globals.get('user').firstname: '',
                        'link': this.$globals.get('user')? {name:'userDetails', params:{id: this.$globals.get('user').id}}: '',
            };
        });
    },
    data(){
        return{
            menus : {
                logged : [
                    {'name' : 'Home', 'link':{name :'home'}},
                    {'name' : 'Users', 'link':{name :'users'}},
                    {'name': 'Artists', 'link':{name :'artists'}}
                ],
                notLogged : [
                    {'name' : 'Login', 'link':{name :'login'}},
                    {'name' : 'Register', 'link':{name :'register'}},
                ],
                profile : [
                    {
                        'name' : this.$globals.get('user')? this.$globals.get('user').firstname: '',
                        'link': this.$globals.get('user')? {name:'userDetails', params:{id: this.$globals.get('user').id}}: '',
                    },
                    {
                        'name' : 'LogOut',
                        'link': {name:'logout'}
                    }
                ]
            },
            auth: this.$globals.get('auth'),
        }
    },
}
</script>
<style scoped>
.navbar{
    min-height:70px;
    background-color: #1c1f22;
}


</style>