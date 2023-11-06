<template>
    <div class="d-flex flex-column my-5 gap-4">
        <div class="d-flex justify-content-between flex-wrap px-2">
            <div class="fs-3 fw-bold">
                Users
            </div>
            <div>
                <button @click="togglePopup()" class="btn btn-success">
                    <div class="fw-bold">
                        Add New
                    </div>
                </button>
            </div>
        </div>
        <div v-for="user in users" class="list-container rounded p-4" @click="$router.push({name:'userDetails', params:{id:user.id}})" :key="user.id">
            <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                <div class="d-flex justify-content-center align-items-center gap-4">
                    <div>
                        <img class="logo" src="user.png">
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                        <div class="fw-normal fs-2">{{user.firstname+' '+user.lastname}}</div>
                        <div class="fw-normal">{{user.email}}</div>
                    </div>
                </div>
                <div v-if="user.id != $globals.get('user').id" class="d-none d-sm-block">
                    <button class="btn btn-danger" @click.stop="deleteUser(user)">
                        <img :src="$globals.get('baseUrl')+'/trash.png'">
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="popup-window justify-content-center" :class="popupClass">
        <div class="d-flex justify-content-center align-items-center" style="max-width:95%">
            <div class="main-container rounded d-flex flex-column p-5">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <span class="fw-bold fs-4">Add A New User</span>
                    </div>
                    <div>
                        <span @click="togglePopup()" class="btn btn-sm btn-dark">x</span>
                    </div>
                </div>
                <form action="#" class="d-flex flex-column mt-3 gap-2">
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
                    <div class="d-flex justify-content-center justify-content-lg-start flex-wrap mt-3 gap-2">
                        <div>
                            <span @click="registerUser()" class="btn btn-success">Create</span>
                        </div>
                        <div>
                            <span @click="togglePopup()" class="btn btn-dark">Cancel</span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
name: 'Users',
inject: ['$globals', '$bus'],
data(){
    return {
        users : [],
        popup : 0,
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
computed : {
    popupClass() {
        return {
            'd-flex' : this.popup,
            'd-none' :!this.popup
        }
    },
},
methods: {
    async getUsers(key){
        const options = {
            method: 'GET',
            url: this.$globals.get('apiUrl')+'/users/',
            headers: {
                'Authorization': 'Bearer '+key,
            }
        };
        await axios.request(options)
        .then(response => {
            this.users = response.data.data;
        }).catch(error => {
            console.log(error.message);
        });
    },
    async deleteUser(user){
        let key = localStorage.getItem('key');
        const options = {
            method: 'DELETE',
            url: this.$globals.get('apiUrl')+'/users/'+user.id,
            headers: {
                'Authorization': 'Bearer '+key,
            }
        };
        await axios.request(options)
        .then(response => {
            let index = this.users.indexOf(user);
            this.users.splice(index, 1);
            this.$bus.$emit('success', response.data.message);
        }).catch(error => {
            console.log(error.message);
        });
        
    },
    async registerUser(){
        let url = this.$globals.get('apiUrl')+'/register';
        let dob = this.dob+'T'+'00:00:00.000Z'?this.user.dob:null;
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
            this.togglePopup();
            this.user = {
                firstname: null,
                lastname: null,
                email: null,
                password: null,
                phone: null,
                dob: null,
                gender: null,
                address: null
            },
            this.$bus.$emit('success', response.data.message);
            this.users.push(response.data.user);
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
    togglePopup(){
        this.popup = !this.popup;
    }
},
mounted(){
    this.getUsers(localStorage.getItem('key'));
}

}
</script>

<style scoped>
.list-container {
    cursor: pointer;
    background-color: #fff;
    box-shadow: 0px 0px 5px 5px #00000009;
    transition: 0.5s ease;
}

.list-container:hover {
    box-shadow: 0px 0px 20px 5px rgba(16, 230, 112, 0.158);
}

.logo{
    height:100px;
    width:100px;
    border-radius:50px;
    box-shadow: 0px 0px 20px 5px rgba(21, 155, 179, 0.158);
}

.main-container {
    background-color: #fff;
    box-shadow: 0px 0px 5px 5px #00000009;
    transition: 0.5s ease;
}
</style>