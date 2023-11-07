import { createRouter, createWebHistory } from 'vue-router';
import Login from './views/authentication/Login.vue';
import Register from './views/authentication/Register.vue';
import Logout from './views/authentication/Logout.vue';
import { inject } from "vue";
import axios from "axios";

import Home from './views/dashboard/Home.vue';
import Users from './views/dashboard/Users.vue';
import Artists from './views/dashboard/Artists.vue';
import UserDetails from './views/dashboard/UserDetails.vue';
import ArtistDetails from './views/dashboard/ArtistDetails.vue';
import SongDetails from './views/dashboard/SongDetails.vue';

const routes = [
  {
    path: '/',
    children: [
        {path: 'login', name: 'login', component: Login},
        {path: 'register', name:'register', component: Register},
        {path: 'logout', name:'logout', component: Logout},
    ]
  },
  {
    path: '/',
    redirect: 'home',
  },

  {
    path: '/',
    children: [
        {path: 'home', name: 'home', component: Home},
        {
          path: 'users', 
          children: [
            {path: '', name: 'users', component: Users},
            {path: ':id', name: 'userDetails', component: UserDetails, props:true},
          ]
        },
        {
          path: 'artists', 
          children: [
            {path: '', name: 'artists', component: Artists},
            {path: ':id', name: 'artistDetails', component: ArtistDetails, props:true},
          ]
        },
        {path: '/songs/:id', name: 'songDetails', component: SongDetails, props:true},
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const $globals = inject('$globals');
  const $bus = inject('$bus');
  let key = localStorage.getItem('key');
  let login = async (key)=>{
    const options = {
      method: 'GET',
      url: $globals.get('apiUrl')+'/user',
      headers: {
        'Authorization': 'Bearer '+key,
      }
    };
    await axios.request(options)
    .then(response => {
      if(response.status == 200){
        $globals.set('auth', 1);
        $globals.set('user', response.data);
        $bus.$emit('updateNav');
        if ( (to.name == 'login' || to.name == 'register') ){
          next({name:'home'});
        } 
        else{
          next();
        }
      }
    }).catch(error => {
      try{
        if(error.response.status == 429){
          $bus.$emit('error', 'Too Many Requests');
          if ( (to.name == 'login' || to.name == 'register') ){
            next({name:'home'});
          }
          else{
            next();
          }
        }
      }catch(e){
        $globals.set('auth', 0);
        $globals.delete('user');
        $bus.$emit('updateNav');
        localStorage.removeItem('key');
        if ( !(to.name == 'login' || to.name == 'register') ){
          $globals.set('loginError', 'Login First to Continue');
          next({name:'login'});
        }
        else{
          next();
        }
      }
    });
  };
  if(key){
    login(key);
  }
  else{
    $globals.set('auth', 0);
    $globals.delete('user');
    $bus.$emit('updateNav');
    if ( !(to.name == 'login' || to.name == 'register') ){
      $globals.set('loginError', 'Login First to Continue');
      next({name:'login'});
    }
    else{
      next();
    }
  }
})

export default router;
