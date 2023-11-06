<template>
    <div class="d-flex justify-content-center my-5 gap-5 flex-wrap">
        <!-- artist image row -->
        <div>
            <div class="d-flex flex-column justify-content-center align-items-center gap-3">
                <div>
                    <img class="user-logo" :src="$globals.get('baseUrl')+'/artist.jpg'">
                </div>
                <div class="text-center">
                    <h3>{{artist.name?artist.name:'none'}}</h3>
                </div>
            </div>
        </div>
        <!-- artist detail row -->
        <div class="col-12 col-lg-7">
            <!-- artist detail column -->
            <div class="d-flex flex-column gap-3">
                <div class="d-flex flex-column justify-content-center main-container rounded p-4 gap-1">
                    <div class="d-flex align-items-center flex-wrap">
                        <div class="fw-bold fs-5 me-2">
                            Date of Birth:
                        </div>
                        <div>
                            {{artist.dob?artist.dob:'none'}}
                        </div>
                    </div>
                    <div class="d-flex align-items-center flex-wrap">
                        <div class="fw-bold fs-5 me-2">
                            Gender:
                        </div>
                        <div>
                            {{artist.gender?artist.gender:'none'}}
                        </div>
                    </div>
                    <div class="d-flex align-items-center flex-wrap">
                        <div class="fw-bold fs-5 me-2">
                            Address:
                        </div>
                        <div>
                            {{artist.address?artist.address:'none'}}
                        </div>
                    </div>
                    <div class="d-flex align-items-center flex-wrap">
                        <div class="fw-bold fs-5 me-2">
                            First Release Year:
                        </div>
                        <div>
                            {{artist.first_release_year?artist.first_release_year:'none'}}
                        </div>
                    </div>
                    <div class="d-flex align-items-center flex-wrap">
                        <div class="fw-bold fs-5 me-2">
                            No of Albums Released:
                        </div>
                        <div>
                            {{artist.no_of_albums_released?artist.no_of_albums_released:'none'}}
                        </div>
                    </div>
                    <div class="d-flex align-items-center flex-wrap">
                        <div class="fw-bold fs-5 me-2">
                            Updated at:
                        </div>
                        <div>
                            {{artist.updated_at?artist.updated_at:'none'}}
                        </div>
                    </div>
                    <div class="d-flex align-items-center flex-wrap">
                        <div class="fw-bold fs-5 me-2">
                            Created at:
                        </div>
                        <div>
                            {{artist.created_at?artist.created_at:'none'}}
                        </div>
                    </div>
                    <div class="d-flex justify-content-center justify-content-lg-start flex-wrap mt-3 gap-2">
                        <div>
                            <button @click="togglePopup(0)" class="btn btn-success">Edit Details</button>
                        </div>
                        <div>
                            <button @click="deleteArtist()" class="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </div>

                <!-- column -->
                <div class="d-flex justify-content-between flex-wrap px-2">
                    <div class="fs-3 fw-bold">
                        Songs
                    </div>
                    <div>
                        <button @click="togglePopup(1)" class="btn btn-success">
                            <div class="fw-bold">
                                Add New
                            </div>
                        </button>
                    </div>
                </div>

                <!-- songs column -->
                <div class="d-flex flex-column gap-2">
                    <!-- column -->
                    <div v-for="(song, index) in songs" class="list-container rounded p-4"  @click="$router.push({name:'songDetails', params:{id:song.id}})" :key="index">
                        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                            <!-- row -->
                            <div class="d-flex justify-content-center align-items-center gap-4">
                                <div>
                                    <img class="song-logo" :src="$globals.get('baseUrl')+'/song.jpg'">
                                </div>
                                <div class="d-flex flex-column justify-content-center">
                                    <div class="fw-normal fs-3">{{song.title}}</div>
                                    <div class="fw-normal">{{song.album_name}}</div>
                                </div>
                            </div>
                            <!-- row -->
                            <div class="d-none d-sm-block">
                                <button class="btn btn-danger" @click.stop="deleteSong(song)">
                                    <img :src="$globals.get('baseUrl')+'/trash.png'">
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    
    <!-- Artist Popup -->
    <div class="popup-window justify-content-center" :class="popupClass">
        <div class="d-flex justify-content-center align-items-center" style="max-width:95%">
            <div class="main-container rounded d-flex flex-column p-5">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <span class="fw-bold fs-4">Edit Details</span>
                    </div>
                    <div>
                        <span @click="togglePopup(0)" class="btn btn-sm btn-dark">x</span>
                    </div>
                </div>
                <form action="#" class="d-flex flex-column mt-3 gap-2">
                    <div>
                        <label class="fw-bold" for="name">Name*</label><br>
                        <input v-model="updatedArtist.name" type="text" name="name" id="name" placeholder="Enter Name" required>
                    </div>
                    <div>
                        <label class="fw-bold" for="dob">Date of birth</label><br>
                        <input v-model="updatedArtist.dob" type="date" name="dob" id="dob">
                    </div>
                    <div>
                        <label class="fw-bold" for="gender">Gender</label><br>
                        <select v-model="updatedArtist.gender" name="gender" id="gender">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label class="fw-bold" for="address">Address</label><br>
                        <input v-model="updatedArtist.address" type="text" name="address" id="address" placeholder="Enter Address">
                    </div>
                    <div>
                        <label class="fw-bold" for="first_release_year">First Release Year</label><br>
                        <input v-model="updatedArtist.first_release_year" type="text" name="first_release_year" id="first_release_year" placeholder="Enter First Release Year">
                    </div>
                    <div>
                        <label class="fw-bold" for="no_of_albums_released">No Of Albums Released</label><br>
                        <input v-model="updatedArtist.no_of_albums_released" type="number" name="no_of_albums_released" id="no_of_albums_released" placeholder="No Of Albums Released">
                    </div>
                    <div class="d-flex justify-content-center justify-content-lg-start flex-wrap mt-3 gap-2">
                        <div>
                            <span @click="update()" class="btn btn-success">Update</span>
                        </div>
                        <div>
                            <span @click="togglePopup(0)" class="btn btn-dark">Cancel</span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!--Song Popup -->
    <div class="popup-window justify-content-center" :class="songPopupClass">
        <div class="d-flex justify-content-center align-items-center" style="max-width:95%">
            <div class="main-container rounded d-flex flex-column p-5">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <span class="fw-bold fs-4">Add A New Song</span>
                    </div>
                    <div>
                        <span @click="togglePopup(1)" class="btn btn-sm btn-dark">x</span>
                    </div>
                </div>
                <form action="#" class="d-flex flex-column mt-3 gap-2">
                    <div>
                        <label class="fw-bold" for="title">Title*</label><br>
                        <input v-model="newSong.title" type="text" name="title" id="title" placeholder="Enter Title" required>
                    </div>
                    <div>
                        <label class="fw-bold" for="album_name">Album Name</label><br>
                        <input v-model="newSong.album_name" type="text" name="album_name" id="album_name" placeholder="Enter Album Name">
                    </div>
                    <div>
                        <label class="fw-bold" for="genre">Genre</label><br>
                        <select v-model="newSong.genre" name="genre" id="genre">
                            <option value="Rhythm and Blues">Rhythm and Blues</option>
                            <option value="Country">Country</option>
                            <option value="classic">classic</option>
                            <option value="Rock">Rock</option>
                            <option value="Jazz">Jazz</option>
                        </select>
                    </div>
                    <div class="d-flex justify-content-center justify-content-lg-start flex-wrap mt-3 gap-2">
                        <div>
                            <span @click="addSong()" class="btn btn-success">Add</span>
                        </div>
                        <div>
                            <span @click="togglePopup(1)" class="btn btn-dark">Cancel</span>
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
name: 'ArtistDetails',
props: ['id'],
inject: ['$globals', '$bus'],
data(){
    return{
        artist : {
            name: null,
            dob: null,
            gender: null,
            address: null,
            first_release_year: null,
            no_of_albums_released: null,
            updated_at: null,
            created_at: null,
        },
        songs: [],
        updatedArtist : {},
        popup : false,
        songPopup : false,
        newSong: {
            artist_id: null,
            title: null,
            album_name: null,
            genre: null,
            artist: {
                name: null
            }
        }
    }
},
computed : {
    popupClass() {
        return {
            'd-flex' : this.popup,
            'd-none' :!this.popup
        }
    },
    songPopupClass() {
        return {
            'd-flex' : this.songPopup,
            'd-none' :!this.songPopup
        }
    },
},
methods: {
    async artistDetail(){
        const options = {
            method: 'GET',
            url: this.$globals.get('apiUrl')+'/artists/'+this.id,
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('key'),
            }
        };
        await axios.request(options)
        .then(response => {
            if(response.data.code == 0){
                this.$bus.$emit('error', 'Artist Not Found');
            }
            else{
                this.artist = response.data.data;
                if(this.artist.dob){
                    this.artist.dob = this.artist.dob.split('T')[0];
                }
                let created_at = this.artist.created_at.split('T');
                this.artist.created_at = created_at[0]+ ' ' + created_at[1].split('.')[0];
                let updated_at = this.artist.updated_at.split('T');
                this.artist.updated_at = updated_at[0]+ ' ' + updated_at[1].split('.')[0];
                this.updatedArtist = structuredClone(this.artist);
                this.songs = this.artist.songs;
            }
        }).catch(error => {
            if(error.response.status == 429){
                this.$bus.$emit('error', 'Too Many Requests');
            }else{
                console.log(error.message);
            }
        });
    },
    async update(){
        let url = this.$globals.get('apiUrl')+'/artists/'+this.id;
        let headers = {
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('key'),
            }
        };
        const data = {
            name: this.updatedArtist.name
        };
        if(this.updatedArtist.dob){
            data.dob = this.updatedArtist.dob+'T'+'00:00:00.000Z';
        }
        if(this.updatedArtist.gender){
            data.gender = this.updatedArtist.gender;
        }
        if(this.updatedArtist.address){
            data.address = this.updatedArtist.address;
        }
        if(this.updatedArtist.first_release_year){
            data.first_release_year = this.updatedArtist.first_release_year;
        }
        if(this.updatedArtist.no_of_albums_released){
            data.no_of_albums_released = this.updatedArtist.no_of_albums_released;
        }
        await axios.put(url, data, headers)
        .then(response => {
            this.$bus.$emit('success', response.data.message);
            this.artistDetail();
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
    togglePopup(popId){
        if(popId){
            this.songPopup = !this.songPopup;
        }else{
            this.popup = !this.popup;
        }
    },
    async deleteArtist(){
        let key = localStorage.getItem('key');
        const options = {
            method: 'DELETE',
            url: this.$globals.get('apiUrl')+'/artists/'+this.id,
            headers: {
                'Authorization': 'Bearer '+key,
            }
        };
        await axios.request(options)
        .then(response => {
            this.$router.push({name: 'artists'});
            this.$bus.$emit('success', response.data.message);
        }).catch(error => {
            this.$bus.$emit('error', 'Something went wrong.');
            console.log(error.message);
        });
    },
    async addSong(){
        let url = this.$globals.get('apiUrl')+'/songs/';
        let headers = {
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('key'),
            }
        };
        const data = {
            artist_id : this.id,
            title : this.newSong.title,
        };
        if(this.newSong.album_name){
            data.album_name = this.newSong.album_name;
        }
        if(this.newSong.genre){
            data.genre = this.newSong.genre;
        }
        await axios.post(url, data, headers)
        .then(response => {
            this.togglePopup(1);
            this.$bus.$emit('success', response.data.message);
            this.songs.push(response.data.data);
            this.newSong = {
                artist_id: null,
                title: null,
                album_name: null,
                genre: null,
                artist: {
                    name: null
                }
            };
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
    async deleteSong(song){
        let key = localStorage.getItem('key');
        const options = {
            method: 'DELETE',
            url: this.$globals.get('apiUrl')+'/songs/'+song.id,
            headers: {
                'Authorization': 'Bearer '+key,
            }
        };
        await axios.request(options)
        .then(response => {
            let index = this.songs.indexOf(song);
            this.songs.splice(index, 1);
            this.$bus.$emit('success', response.data.message);
        }).catch(error => {
            this.$bus.$emit('error', 'Something went wrong.');
            console.log(error.message);
        });
    }
},
mounted(){
    let key = localStorage.getItem('key');
    this.artistDetail();
},
watch: {
    id(newId, oldId){
        let key = localStorage.getItem('key');
        this.artistDetail();
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

.song-logo{
    height:80px;
    width:80px;
    border-radius:40px;
    box-shadow: 0px 0px 20px 5px rgba(21, 155, 179, 0.158);
}

.main-container {
    background-color: #fff;
    box-shadow: 0px 0px 5px 5px #00000009;
    transition: 0.5s ease;
}

</style>
    