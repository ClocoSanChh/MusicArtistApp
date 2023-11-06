<template>
    <div class="d-flex justify-content-center mt-5">
        <div class="box d-flex flex-column p-5 mb-5">
            <div>
                <h5 class="fw-bold">Create An Account</h5>
            </div>
            <form action="#" class="mt-3">
                <div>
                    <label class="fw-bold" for="firstname">First Name*</label><br>
                    <input v-model="user.firstname" type="text" name="firstname" id="firstname" placeholder="Enter First Name" required>
                </div>
                <div>
                    <label class="fw-bold" for="lastname">Last Name*</label><br>
                    <input v-model="user.lastname" type="text" name="lastname" id="lastname" placeholder="Enter Last Name" required>
                </div>
                <div>
                    <label class="fw-bold" for="email">Email*</label><br>
                    <input v-model="user.email" type="email" name="email" id="email" placeholder="Enter Email" required>
                </div>
                <div>
                    <label class="fw-bold" for="password">Password* <small>(Min 6 characters.)</small></label><br>
                    <input v-model="user.password" type="password" name="password" id="password" placeholder="Enter Password" minlength="6" required>
                </div>
                <div>
                    <label class="fw-bold" for="phone">Phone</label><br>
                    <input v-model="user.phone" type="text" name="phone" id="phone" placeholder="Enter Phone">
                </div>
                <div>
                    <label class="fw-bold" for="dob">Date of birth</label><br>
                    <input v-model="user.dob" type="date" name="dob" id="dob">
                </div>
                <div>
                    <label class="fw-bold" for="gender">Gender</label><br>
                    <select v-model="user.gender" name="gender" id="gender">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div>
                    <label class="fw-bold" for="address">Address</label><br>
                    <input v-model="user.address" type="text" name="address" id="address" placeholder="Enter Address">
                </div>
                <div class="d-grid gap-2 mt-3">
                    <span @click="registerUser()" type="submit" class="btn btn-lg btn-success">Sign Up</span>
                    <span @click.prevent="$router.push({name:'login'})" class="btn btn-lg btn-dark">Go Back</span>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    inject: ['$globals', '$bus'],
    created(){

    },
    data(){
        return {
            user : {
                firstname: null,
                lastname: null,
                email: null,
                password: null,
                phone: null,
                dob: null,
                gender: null,
                address: null
            },
        }
    },
    methods: {
        async registerUser(){
            let url = this.$globals.get('apiUrl')+'/register';
            let dob = this.user.dob+'T'+'00:00:00.000Z'?this.user.dob:null;
            const data = {
                firstname : this.user.firstname,
                lastname : this.user.lastname,
                email: this.user.email,
                phone : this.user.phone,
                password: this.user.password,
                dob : dob,
                gender : this.user.gender?this.user.gender:null,
                address: this.user.address
            };
            await axios.post(url, data)
            .then(response => {
                this.$router.push({name:'login'});
                this.$bus.$emit('success', response.data.message);
            }).catch(error => {
                try{
                    this.$bus.$emit('error', error.response.data.message);
                    console.log(error.message);
                }
                catch{
                    this.$bus.$emit('error', 'Something went wrong.');
                    console.log(error.message);
                }
            });        
        },
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