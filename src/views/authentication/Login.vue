<template>
    <div class="d-flex justify-content-center mt-5">
        <div class="box d-flex flex-column p-5">
            <div>
                <h5 class="fw-bold">LOGIN</h5>
            </div>
            <form action="" class="mt-3">
                <div>
                    <label for="email">Email</label><br>
                    <input v-model="email" type="email" name="email" id="email">
                </div>
                <div>
                    <label for="password">Password</label><br>
                    <input v-model="password" type="password" name="password" id="password">
                </div>
                <div v-if="error.length>0" class="text-danger text-center mt-2">
                    {{error}}
                </div>
                <div class="d-grid gap-2 mt-3">
                    <button @click.prevent="login()" type="submit" class="btn btn-lg btn-success">Login</button>
                    <button @click.prevent="$router.push({name:'register'})" class="btn btn-lg btn-dark">Register</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    inject: ['$globals', '$bus'],
    data(){
        return{
            email:'',
            password:'',
            error: '',
        }
    },
    created(){

    },
    methods: {
        login() {
            axios.post(this.$globals.get('apiUrl')+'/login', {
            email: this.email,
            password: this.password
            })
            .then(response => {
                if(response.status == 200){
                    localStorage.setItem('key', response.data.access_token);
                    this.$bus.$emit('updateNav');
                    this.$router.push({name: 'home'});
                }
                else{
                    localStorage.setItem('key', null);
                    this.error = 'Invalid Email or Password!';
                }
            }).catch(error => {
                console.log(error.message);
                this.error = 'Invalid Email or Password!';
            });
        }
    },
    mounted(){
        if(this.$globals.get('loginError')){
            this.error = this.$globals.get('loginError');
            this.$globals.set('loginError', '');
        }
    }
}
</script>
<style scoped>
.box{
    border-radius: 5px;
    box-shadow: 0 0 2px  0 rgba(0, 0, 0, 0.2), 0 6px 30px 2px rgba(0, 0, 0, 0.19);
    width: 500px;
}
</style>