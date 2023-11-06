<template>
<div class="d-flex justify-content-center my-5 gap-5 flex-wrap">
    <div class="">
        <div class="d-flex flex-column justify-content-center align-items-center gap-3">
            <div>
                <img class="song-logo" :src="$globals.get('baseUrl')+'/song.jpg'">
            </div>
            <div class="text-center">
                <h3>{{song.title}}</h3>
                <h6>{{song.artist.name}}</h6>
            </div>
        </div>
    </div>
    <div class="col-12 col-lg-7">
        <div class="d-flex flex-column justify-content-center main-container rounded p-4 gap-1">
            <div class="d-flex align-items-center flex-wrap">
                <div class="fw-bold fs-5 me-2">
                    Artist Name:
                </div>
                <div>
                    {{song.artist.name?song.artist.name:'none'}}
                </div>
            </div>
            <div class="d-flex align-items-center flex-wrap">
                <div class="fw-bold fs-5 me-2">
                    Album Name:
                </div>
                <div>
                    {{song.album_name?song.album_name:'none'}}
                </div>
            </div>
            <div class="d-flex align-items-center flex-wrap">
                <div class="fw-bold fs-5 me-2">
                    Genre:
                </div>
                <div>
                    {{song.genre?song.genre:'none'}}
                </div>
            </div>
            <div class="d-flex align-items-center flex-wrap">
                <div class="fw-bold fs-5 me-2">
                    Updated at:
                </div>
                <div>
                    {{song.updated_at}}
                </div>
            </div>
            <div class="d-flex align-items-center flex-wrap">
                <div class="fw-bold fs-5 me-2">
                    Created at:
                </div>
                <div>
                    {{ song.created_at }}
                </div>
            </div>
            <div class="d-flex justify-content-center justify-content-lg-start flex-wrap mt-3 gap-2">
                <div>
                    <button @click="togglePopup()" class="btn btn-success">Edit Details</button>
                </div>
                <div>
                    <button @click="deleteSong()" class="btn btn-danger">Delete</button>
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
                    <label class="fw-bold" for="title">Title*</label><br>
                    <input v-model="updatedSong.title" type="text" name="title" id="title" placeholder="Enter Title" required>
                </div>
                <div>
                    <label class="fw-bold" for="album_name">Album Name</label><br>
                    <input v-model="updatedSong.album_name" type="text" name="album_name" id="album_name" placeholder="Enter Album Name">
                </div>
                <div>
                    <label class="fw-bold" for="genre">Genre</label><br>
                    <select v-model="updatedSong.genre" name="genre" id="genre">
                        <option value="Rhythm and Blues">Rhythm and Blues</option>
                        <option value="Country">Country</option>
                        <option value="classic">classic</option>
                        <option value="Rock">Rock</option>
                        <option value="Jazz">Jazz</option>
                    </select>
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
name: 'SongDetails',
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
        song : {
            artist_id: null,
            title: null,
            album_name: null,
            genre: null,
            updated_at: null,
            created_at: null,
            artist: {
                name: null,
            },
        },
        updatedSong: {},
        popup: 0,
    }
},
methods: {
    async songDetail(){
        const options = {
            method: 'GET',
            url: this.$globals.get('apiUrl')+'/songs/'+this.id,
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('key'),
            }
        };
        await axios.request(options)
        .then(response => {
            try{
                if(response.data.data){
                    this.song = response.data.data;
                    let created_at = this.song.created_at.split('T');
                    this.song.created_at = created_at[0]+ ' ' + created_at[1].split('.')[0];
                    let updated_at = this.song.updated_at.split('T');
                    this.song.updated_at = updated_at[0]+ ' ' + updated_at[1].split('.')[0];
                    this.updatedSong = {...this.song};
                }else{
                    this.$bus.$emit('error', 'Song Not Found');
                }
            }catch(e){
                this.$bus.$emit('error', response.data.message);
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
        let url = this.$globals.get('apiUrl')+'/songs/'+this.id;
        let headers = {
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('key'),
            }
        };
        const data = {
            title : this.updatedSong.title,
        };
        if(this.updatedSong.album_name){
            data.album_name = this.updatedSong.album_name;
        }
        if(this.updatedSong.genre){
            data.genre = this.updatedSong.genre;
        }
        await axios.put(url, data, headers)
        .then(response => {
            this.$bus.$emit('success', response.data.message);
            this.songDetail();
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
    async deleteSong(){
        let key = localStorage.getItem('key');
        const options = {
            method: 'DELETE',
            url: this.$globals.get('apiUrl')+'/songs/'+this.id,
            headers: {
                'Authorization': 'Bearer '+key,
            }
        };
        await axios.request(options)
        .then(response => {
            this.$router.push({name: 'artistDetails', params:{id:this.song.artist_id}});
            this.$bus.$emit('success', response.data.message);
        }).catch(error => {
            this.$bus.$emit('error', 'Something went wrong.');
            console.log(error.message);
        });
    }
},
mounted(){
    this.songDetail();
},
watch: {
    id(newId, oldId){
        this.songDetail();
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

.song-logo{
    height:200px;
    width:200px;
    border-radius:100px;
    box-shadow: 0px 0px 20px 5px rgba(21, 155, 179, 0.158);
}

</style>