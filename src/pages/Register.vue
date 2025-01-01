<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import { socket } from '../socket';
    import { useClassStore } from '../stores/class';

    // get store
    const store = useClassStore();

    // router
    const router = useRouter();

      // fetch data 
    onMounted(() => {
        localStorage.removeItem("class")
        store.init()
    })

    // temp style variable
    const inputClass = 'w-full min-h-3 border border-gray-500 rounded-md px-3 py-1';
    const inputContainerClass = 'flex flex-col space-y-1 md:flex-row md:space-x-4 md:items-center'

    // temporary varizable
    const username = ref('')
    const userId = ref('1')
    const classId = ref('01')
    const classname = ref('')
    const errorMessage = ref('')


    // action register to quiz
    const register = () => {
        store.setUserData(username.value, userId.value)
        store.setClassData({ 
            id: classId.value,  
            name: classname.value, 
            userList: [{username: username.value, id: userId.value}] 
        })
        socket.emit('register', { classId: classId.value, username: username.value });
    }

    socket.on("connect_error", function(error) {
        errorMessage.value = error.message
    });

    // listen event register success
    socket.on('register_success', () => {
        router.push({ name: 'Draw' })
    })

    // listen event register error
    socket.on('register_error', () => {
        errorMessage.value = 'Registration error, please in put the right quiz id!'
    })
</script>


<template>
    <div class="min-h-screen flex flex-col justify-center">
        <div class="flex justify-center">

            <!-- register form -->
            <div class="w-11/12 md:w-5/12 lg:w-4/12 p-10 shadow-lg bg-blue-100 space-y-4">
                <!-- quiz id -->
                <div :class="inputContainerClass">
                    <p class="min-w-32">Class Id:</p>
                    <input 
                        v-model="classId" 
                        placeholder="class id" 
                        :class="inputClass" 
                        @input=" errorMessage  = ''" />
                </div>

                <!-- username -->
                <div :class="inputContainerClass">
                    <p class="min-w-32">User's name:</p>
                    <input 
                        v-model="username" 
                        placeholder="your name" 
                        :class="inputClass" 
                        @input=" errorMessage  = ''" />
                </div>

                <!-- register -->
                <div class="flex justify-end">
                    <button @click="register"
                        class="shadow-sm bg-blue-500 py-1 px-3 text-white hover:bg-red-700 rounded-lg">
                        Join
                    </button>
                </div>

                <!-- error message -->
                <p class="text-red-500 font-sm absolute top-20" >{{ errorMessage }}</p>
            </div>

        </div>
    </div>
</template>

