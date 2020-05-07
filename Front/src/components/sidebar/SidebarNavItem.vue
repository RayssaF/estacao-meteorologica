<template>
    <li :class="classList">
        <slot></slot>
    </li>
</template>

<script>
    export default{
        // name: 'sidebar-nav-item',
       
        // computed: {
        //     classList(){
        //         return [
        //             'nav-item',
        //             ...this.itemClasses     // pull them all properties and create a key value pair
        //         ]
        //     },
        //     itemClasses(){
        //         return this.classes ? this.classes.split( ' ') : ''
        //     }
        // }

    }
</script>