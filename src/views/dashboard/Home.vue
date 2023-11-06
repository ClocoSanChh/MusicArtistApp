<template>
    <div class="d-flex flex-column my-5 gap-4">
        <div class="d-flex justify-content-between flex-wrap px-2">
            <div class="fs-3 fw-bold">
                Dashboard
            </div>
        </div>
        <div class="list-container rounded p-4">
            <div class="d-flex justify-content-between align-items-center" @click="$router.push({name:'users'})">
                <div class="d-flex justify-content-center align-items-center gap-4">
                    <div>
                        <img class="logo" src="user.png">
                    </div>
                    <div class="fw-normal fs-2">Users</div>
                </div>
                <div class="fw-bold">
                    Total: {{userCount}}
                </div>
            </div>
        </div>
        <div class="list-container rounded p-4" @click="$router.push({name:'artists'})">
            <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex justify-content-center align-items-center gap-4">
                    <div>
                        <img class="logo" src="artist.jpg">
                    </div>
                    <div class="fw-normal fs-2">Artists</div>
                </div>
                <div class="fw-bold">
                    Total: {{artistCount}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: 'Home',
    inject: ['$globals'],
    data(){
        return {
            userCount: 0,
            artistCount: 0
        }
    },
    mounted(){
        let key = localStorage.getItem('key');
        let getCount = async (key)=>{
            const options1 = {
                method: 'GET',
                url: this.$globals.get('apiUrl')+'/users',
                headers: {
                    'Authorization': 'Bearer '+key,
                }
            };
            const options2 = {
                method: 'GET',
                url: this.$globals.get('apiUrl')+'/artists',
                headers: {
                    'Authorization': 'Bearer '+key,
                }
            };
            await axios.request(options1)
            .then(response => {
                this.userCount = response.data.count;
            }).catch(error => {
                console.log(error.message);
            });
            await axios.request(options2)
            .then(response => {
                this.artistCount = response.data.count;
            }).catch(error => {
                console.log(error.message);
            });
        }
        getCount(key);
    }
}
</script>

<style>
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
</style>