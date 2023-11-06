<template lang="">
    <div>
        
    </div>
</template>
<script>
export default {
    inject: ['$bus', '$globals'],
    created(){
        localStorage.removeItem('key');
        this.$globals.set('auth', 0);
        this.$globals.delete('user');
        this.$bus.$emit('updateNav');
        this.$router.push({name: 'login'});
    }
}
</script>