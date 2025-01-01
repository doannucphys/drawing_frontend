<script setup lang="ts">
    import { useClassStore } from '../stores/class';

    defineProps<{ userList:  User[]}>()
    const store = useClassStore();
</script>

<template>
    <!-- table head -->
    <div class="flex w-full justify-center px-5">
        <div class="flex w-6/12 py-1  font-bold text-blue-500" v-for="head in ['No', 'Student name']">
            {{ head }}
        </div>
    </div>

    <!-- table body -->
    <div :class="['flex w-full px-5 py-1 justify-center ', id%2 ? '' : 'bg-blue-100', store.userData?.username == user.username ? 'text-red-500 font-bold' : '' ]" v-for="(user, id) in userList">
        <p class="w-6/12">{{id + 1}}</p>
        <p class="w-6/12">{{user.username}}</p>
    </div>
</template>