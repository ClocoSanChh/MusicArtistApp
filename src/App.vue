<template>
  <Nav></Nav>
  <div class="container">
    <div class="d-flex justify-content-center">
      <div v-if="error" class="popup-notification fw-bold fs-5 text-danger text-center mt-5">
        {{ error }}
      </div>
      <div v-if="success" class="popup-notification fw-bold fs-5 text-success text-center mt-5">
        {{ success }}
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Nav from './components/Nav.vue';
export default {
  name: 'App',
  components: {
    Nav,
  },
  inject: ['$globals', '$bus'],
  created(){
    this.$globals.set('apiUrl', 'http://localhost:8000/api');
    if(localStorage.getItem('key')){
      this.$globals.set('auth', 1);
    }
    else{
      this.$globals.set('auth', 0);
    }
    this.$globals.set('baseUrl', window.location.origin);
    this.$bus.$on('error', (message)=>{
      this.error = message;
      setTimeout(()=>{
        this.error = null;
      }, 2000);
    });
    this.$bus.$on('success', (message)=>{
      this.success = message;
      setTimeout(()=>{
        this.success = null;
      }, 2000);
    })
  },
  data() {
    return {
      error: null,
      success: null,
    }
  },
  methods: {

  }
}
</script>

<style>
.link{
  cursor: pointer;
}
.link-hover{
  transition: 0.3s ease !important;
}
.link-hover:hover{
  color: #4CAF50 !important;
}
.popup-notification{
  position: fixed;
  top: 45px;
  z-index: 999;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  width:auto !important;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  border: 1px solid black;
}
input {
  width: 100%;
  padding: 12px 15px;
  margin: 8px 0;
  border: solid 1px black;
  border-radius: 5px;
  box-sizing: border-box;
  transition: 0.3s ease;
}
input:focus{
  box-shadow: 0 0 10px 10px rgba(0, 255, 34, 0.1);
  border-color: #4CAF50;
}
select{
  width: 100%;
  padding: 12px 15px;
  margin: 8px 0;
  border: solid 1px black;
  border-radius: 5px;
  box-sizing: border-box;
}
.popup-window {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  overflow-y: scroll;
}
</style>
