<template>
    <div class="d-flex flex-column my-5 gap-4">
        <div class="d-flex justify-content-between flex-wrap px-2">
            <div class="fs-3 fw-bold">
                Artists
            </div>
            <div>
                <button @click="togglePopup()" class="btn btn-success">
                    <div class="fw-bold">
                        Add New
                    </div>
                </button>
            </div>
        </div>
        <div v-for="artist in artists" class="list-container rounded p-4"  @click="$router.push({name:'artistDetails', params:{id:artist.id}})" :key="artist.id">
            <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                <div class="d-flex justify-content-center align-items-center gap-4">
                    <div>
                        <img class="logo" src="artist.jpg">
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                        <div class="fw-normal fs-2">{{artist.name}}</div>
                    </div>
                </div>
                <div class="d-none d-sm-block">
                    <button class="btn btn-danger" @click.stop="deleteArtist(artist)">
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
                        <span class="fw-bold fs-4">Add A New Artist</span>
                    </div>
                    <div>
                        <span @click="togglePopup()" class="btn btn-sm btn-dark">x</span>
                    </div>
                </div>
                <form action="#" class="d-flex flex-column mt-3 gap-2">
                    <div>
                        <label class="fw-bold" for="name">Name*</label><br>
                        <input v-model="artist.name" type="text" name="name" id="name" placeholder="Enter Name" required>
                    </div>
                    <div>
                        <label class="fw-bold" for="dob">Date of birth</label><br>
                        <input v-model="artist.dob" type="date" name="dob" id="dob">
                    </div>
                    <div>
                        <label class="fw-bold" for="gender">Gender</label><br>
                        <select v-model="artist.gender" name="gender" id="gender">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label class="fw-bold" for="address">Address</label><br>
                        <input v-model="artist.address" type="text" name="address" id="address" placeholder="Enter Address">
                    </div>
                    <div>
                        <label class="fw-bold" for="first_release_year">First Release Year</label><br>
                        <input v-model="artist.first_release_year" type="text" name="first_release_year" id="first_release_year" placeholder="Enter First Release Year">
                    </div>
                    <div>
                        <label class="fw-bold" for="no_of_albums_released">No Of Albums Released</label><br>
                        <input v-model="artist.no_of_albums_released" type="number" name="no_of_albums_released" id="no_of_albums_released" placeholder="No Of Albums Released">
                    </div>
                    <div class="d-flex justify-content-center justify-content-lg-start flex-wrap mt-3 gap-2">
                        <div>
                            <span @click="addArtist()" class="btn btn-success">Create</span>
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
name: 'Artists',
inject: ['$globals', '$bus'],
data(){
    return {
        artists : [],
        artist: {
            name: null,
            dob: null,
            gender: null,
            address: null,
            first_release_year: null,
            no_of_albums_released: null
        },
        popup: false,
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
    async getArtists(key){
        const options = {
            method: 'GET',
            url: this.$globals.get('apiUrl')+'/artists/',
            headers: {
                'Authorization': 'Bearer '+key,
            }
        };
        await axios.request(options)
        .then(response => {
            this.artists = response.data.data;
        }).catch(error => {
            console.log(error.message);
        });
    },
    async deleteArtist(artist){
        let key = localStorage.getItem('key');
        const options = {
            method: 'DELETE',
            url: this.$globals.get('apiUrl')+'/artists/'+artist.id,
            headers: {
                'Authorization': 'Bearer '+key,
            }
        };
        await axios.request(options)
        .then(response => {
            this.$bus.$emit('success', response.data.message);
        }).catch(error => {
            console.log(error.message);
        });
        let index = this.artists.indexOf(artist);
        this.artists.splice(index, 1);
    },
    async addArtist(){
        let url = this.$globals.get('apiUrl')+'/artists';
        const data = {
            name : this.artist.name,
        };
        if(this.artist.dob){
            data.dob = this.artist.dob+'T'+'00:00:00.000Z';
        }
        if(this.artist.gender){
            data.gender = this.artist.gender;
        }
        if(this.artist.address){
            data.address = this.artist.address;
        }
        if(this.artist.first_release_year){
            data.first_release_year = this.artist.first_release_year;
        }
        if(this.artist.no_of_albums_released){
            data.no_of_albums_released = this.artist.no_of_albums_released;
        }
        const headers = {
            headers : {
                'Authorization' : 'Bearer '+localStorage.getItem('key')
            }
        }
        await axios.post(url, data, headers)
        .then(response => {
            this.togglePopup();
            this.artist = {
                name: null,
                dob: null,
                gender: null,
                address: null,
                first_release_year: null,
                no_of_albums_released: null
            }
            this.$bus.$emit('success', response.data.message);
            this.artists.push(response.data.data);
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
    this.getArtists(localStorage.getItem('key'));
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