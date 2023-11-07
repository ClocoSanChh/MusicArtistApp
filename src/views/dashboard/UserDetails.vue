<template>
<div class="d-flex flex-column justify-content-center my-5 gap-5 flex-wrap">
    <div class="d-flex justify-content-between flex-wrap px-2">
        <div class="fs-3 fw-bold">
            User <span 
            :class="{
                'd-inline' : this.id != $globals.get('user').id,
                'd-none' : this.id == $globals.get('user').id
            }">Details</span><span 
            :class="{
                'd-none' : this.id != $globals.get('user').id,
                'd-inline' : this.id == $globals.get('user').id
            }">Profile</span>
        </div>
        <div>
            <button 
            :class="{
                'd-block' : this.id != $globals.get('user').id,
                'd-none' : this.id == $globals.get('user').id
            }"
            @click="$router.go(-1)" class="d-flex btn btn-dark align-items-center">
                <div class="fw-bold">
                    &lt; Go Back
                </div>
            </button>
        </div>
    </div>
    <div class="d-flex flex-wrap justify-content-center gap-5">
        <div class="">
            <div class="d-flex flex-column justify-content-center align-items-center gap-3">
                <div>
                    <img class="user-logo" :src="$globals.get('baseUrl')+'/user.png'">
                </div>
                <div class="text-center">
                    <h3>{{user.firstname+' '+user.lastname}}</h3>
                    <h6>{{user.email}}</h6>
                </div>
            </div>
        </div>
        <div class="col-12 col-lg-7">
            <div class="d-flex flex-column justify-content-center main-container rounded p-4 gap-1">
                <div class="d-flex align-items-center flex-wrap">
                    <div class="fw-bold fs-5 me-2">
                        Phone:
                    </div>
                    <div>
                        {{user.phone?user.phone:'none'}}
                    </div>
                </div>
                <div class="d-flex align-items-center flex-wrap">
                    <div class="fw-bold fs-5 me-2">
                        Date of Birth:
                    </div>
                    <div>
                        {{user.dob?user.dob:'none'}}
                    </div>
                </div>
                <div class="d-flex align-items-center flex-wrap">
                    <div class="fw-bold fs-5 me-2">
                        Gender:
                    </div>
                    <div>
                        {{user.gender?user.gender:'none'}}
                    </div>
                </div>
                <div class="d-flex align-items-center flex-wrap">
                    <div class="fw-bold fs-5 me-2">
                        Address:
                    </div>
                    <div>
                        {{user.address?user.address:'none'}}
                    </div>
                </div>
                <div class="d-flex align-items-center flex-wrap">
                    <div class="fw-bold fs-5 me-2">
                        Updated at:
                    </div>
                    <div>
                        {{user.updated_at}}
                    </div>
                </div>
                <div class="d-flex align-items-center flex-wrap">
                    <div class="fw-bold fs-5 me-2">
                        Created at:
                    </div>
                    <div>
                        {{ user.created_at }}
                    </div>
                </div>
                <div class="d-flex justify-content-center justify-content-lg-start flex-wrap mt-3 gap-2">
                    <div>
                        <button @click="togglePopup()" class="btn btn-success">Edit Details</button>
                    </div>
                    <div 
                    :class="{
                        'd-block' : this.id != $globals.get('user').id,
                        'd-none' : this.id == $globals.get('user').id
                    }">
                        <button @click="deleteUser()" class="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="popup-window justify-content-center" :class="popupClass">
    <div class="d-flex justify-content-center align-items-center" style="max-width:95%">
        <div class="main-container rounded d-flex flex-column p-5">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <span class="fw-bold fs-4">Edit Details</span>
                </div>
                <div>
                    <span @click="togglePopup()" class="btn btn-sm btn-dark">x</span>
                </div>
            </div>
            <form action="#" class="d-flex flex-column mt-3 gap-2">
                <div>
                    <label class="fw-bold" for="firstname">First Name*</label><br>
                    <input v-model="updatedUser.firstname" type="text" name="firstname" id="firstname" placeholder="Enter First Name" required>
                </div>
                <div>
                    <label class="fw-bold" for="lastname">Last Name*</label><br>
                    <input v-model="updatedUser.lastname" type="text" name="lastname" id="lastname" placeholder="Enter Last Name" required>
                </div>
                <div>
                    <label class="fw-bold" for="email">Email*</label><br>
                    <input v-model="updatedUser.email" type="email" name="email" id="email" placeholder="Enter Email" required>
                </div>
                <div>
                    <label class="fw-bold" for="phone">Phone</label><br>
                    <input v-model="updatedUser.phone" type="text" name="phone" id="phone" placeholder="Enter Phone">
                </div>
                <div>
                    <label class="fw-bold" for="dob">Date of birth</label><br>
                    <input v-model="updatedUser.dob" type="date" name="dob" id="dob">
                </div>
                <div>
                    <label class="fw-bold" for="gender">Gender</label><br>
                    <select v-model="updatedUser.gender" name="gender" id="gender">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div>
                    <label class="fw-bold" for="address">Address</label><br>
                    <input v-model="updatedUser.address" type="text" name="address" id="address" placeholder="Enter Address">
                </div>
                <div class="d-flex justify-content-center justify-content-lg-start flex-wrap mt-3 gap-2">
                    <div>
                        <span @click.prevent="update()" class="btn btn-success">Update</span>
                    </div>
                    <div>
                        <span @click.prevent="togglePopup()" class="btn btn-dark">Cancel</span>
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
name: 'UserDetails',
props: ['id'],
inject: ['$globals', '$bus'],
created(){

},
computed : {
    popupClass() {
        return {
            'd-flex' : this.popup,
            'd-none' :!this.popup
        }
    },
},
data() {
    return {
        user : {
            id: null,
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            dob: '',
            gender: '',
            address: '',
            updated_at: '',
            created_at: ''
        },
        updatedUser: {},
        popup: 0,
    }
},
methods: {
    async userDetail(){
        const options = {
            method: 'GET',
            url: this.$globals.get('apiUrl')+'/users/'+this.id,
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('key'),
            }
        };
        await axios.request(options)
        .then(response => {
            if(response.data.code == 0){
                this.$bus.$emit('error', 'User Not Found');
            }
            else{
                this.user = response.data.data;
                if(this.user.dob){
                    this.user.dob = this.user.dob.split('T')[0];
                }
                let created_at = this.user.created_at.split('T');
                this.user.created_at = created_at[0]+ ' ' + created_at[1].split('.')[0];
                let updated_at = this.user.updated_at.split('T');
                this.user.updated_at = updated_at[0]+ ' ' + updated_at[1].split('.')[0];
                this.updatedUser = {...this.user}
            }
        }).catch(error => {
            try{
                if(error.response.status == 429){
                    this.$bus.$emit('error', 'Too Many Requests');
                }else{
                    console.log(error.message);
                }
            }catch(e){
                console.log(e.message);
                console.log(error.message);
            }
            
        });
    },
    async update(){
        let url = this.$globals.get('apiUrl')+'/users/'+this.id;
        let headers = {
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('key'),
            }
        };
        let dob = this.updatedUser.dob+'T'+'00:00:00.000Z'?this.updatedUser.dob:null;
        const data = {
            firstname : this.updatedUser.firstname,
            lastname : this.updatedUser.lastname,
            phone : this.updatedUser.phone,
            dob : dob,
            gender : this.updatedUser.gender?this.updatedUser.gender:null,
            address: this.updatedUser.address
        };
        if(this.user.email != this.updatedUser.email){
            data['email'] = this.updatedUser.email;
        }
        await axios.put(url, data, headers)
        .then(response => {
            this.$bus.$emit('success', response.data.message);
            this.userDetail();
            this.togglePopup();
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
    },
    async deleteUser(){
        let key = localStorage.getItem('key');
        const options = {
            method: 'DELETE',
            url: this.$globals.get('apiUrl')+'/users/'+this.id,
            headers: {
                'Authorization': 'Bearer '+key,
            }
        };
        await axios.request(options)
        .then(response => {
            this.$router.push({name: 'users'});
            this.$bus.$emit('success', response.data.message);
        }).catch(error => {
            this.$bus.$emit('error', 'Something went wrong.');
            console.log(error.message);
        });
    }
},
mounted(){
    this.userDetail();
},
watch: {
    id(newId, oldId){
        this.userDetail();
    }
}


}
</script>

<style scoped>
.main-container {
    background-color: #fff;
    box-shadow: 0px 0px 5px 5px #00000009;
    transition: 0.5s ease;
}

.user-logo{
    height:200px;
    width:200px;
    border-radius:100px;
    box-shadow: 0px 0px 20px 5px rgba(21, 155, 179, 0.158);
}

</style>