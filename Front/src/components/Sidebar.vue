<template>

    <aside id="left-panel" class="left-panel">
        <nav class="navbar navbar-expand-sm navbar-default">

            <SidebarHeader/>

            <div id="main-menu" class="main-menu collapse navbar-collapse">
                <ul class="nav navbar-nav">

             
                    <template v-for="(item, index) in navItems">
                        <template v-if="item.title">
                           
                        </template>
                        <template v-else-if="item.divider">
                           
                        </template>

                        <template v-else>
                            <template v-if="item.children">
                                <!-- First Level Dropdown -->
                                
                            </template>
                            <template>
                                <SidebarNavItem :classes="item.class" >
                                    <SidebarNavLink :name="item.name" :url="item.url" :icon="item.icon" :badge="item.badge" :variant="item.variant"/>
                                </SidebarNavItem>
                            </template>
                        </template>
                    </template>


                </ul>
            </div><!-- /.navbar-collapse -->
        </nav>
    </aside><!-- /#left-panel -->

</template>



<script>

import SidebarHeader from './sidebar/SidebarHeader.vue';
import SidebarNavDropdown from './sidebar/SidebarNavDropdown.vue';
import SidebarNavTitle from './sidebar/SidebarNavTitle.vue';
import SidebarNavLink from './sidebar/SidebarNavLink.vue';
import SidebarNavItem from './sidebar/SidebarNavItem.vue';
import SidebarFooter from './sidebar/SidebarFooter.vue';


export default{
    name: 'sidebar',
    props: {
        navItems: {
          type: Array,
          required: true,
          default: () => []
      }
    },
    components: {
        SidebarHeader,
        // SidebarNavDropdown,
        SidebarNavLink,
        // SidebarNavTitle,
        SidebarNavItem,
        SidebarFooter
    },
    methods: {
        handleClick (e) {
          e.preventDefault()
          e.target.parentElement.classList.toggle('show')
      }
    }
}
</script>
