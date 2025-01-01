<script setup lang="ts">
    import { socket } from '../socket'
    import { useClassStore } from '../stores/class'
    import VueDrawingCanvas from "vue-drawing-canvas";
    import { ref, useTemplateRef, onMounted , onUpdated} from 'vue'
    import UserList from '../components/UserList.vue';

    // get store
    const store = useClassStore();
    const users = ref<User[]>([])

    // check socket connected
    if (!socket.id) {
        socket.connect()
        const classPersistData = JSON.parse(localStorage.getItem('class') as string);
        socket.emit('reconnect', {
            classId: classPersistData.drawingClassData?.id, 
            username: classPersistData.userData?.username
        })
        
    }

    // fetch data 
    onMounted(() => {
        (async() => {
            await store.initUserlist([])

            users.value = 
            await fetch(`${import.meta.env.VITE_SOCKET_SEVER}/class/${store.drawingClassData.id}/users`)
            .then((r) => r.json());

            await store.initUserlist(users.value)

            const strokes = 
            await fetch(`${import.meta.env.VITE_SOCKET_SEVER}/class/${store.drawingClassData.id}/strokes`)
            .then((r) => r.json());

            initialImage.value = strokes;
            store.setInitImg(strokes)
        })()
        socket.emit('open_drawing_canvas', { classId: store.drawingClassData.id, username: store.userData?.username })
    })

    onUpdated(() => {
        VueCanvasDrawing?.value?.drawInitialImage()
    })

    // ref to Vue Drawing Canvas component
    const VueCanvasDrawing = useTemplateRef('DrawingCanvas')
   
    // listen event when a new user start drawing
    socket.on('new_user_start_drawing', (user: User) => {
        store.updateUserList(user)
    })

    // listen even when other user draw
    socket.on('update_draw_canvas', (data: any) => {
        store.setInitImg(data.strokes)
        VueCanvasDrawing?.value?.drawInitialImage()
    })

    // when 1 user leave room
    socket.on('user_leave', (data: SocketPayload) => {
        store.removeUserFromList(data.username)
    })

    // when 1 user leave room
    socket.on('user_reconnect', (data: SocketPayload) => {
        store.updateUserList({username: data.username, id: ''})
    })

    const lastEmit = ref(Date.now());
    const drawing = ref(false);
    const points = ref<Point[]>([])
    const initialImage = ref([])
    const additionalImages = ref([])
    const startPoint = ref<Point>({x: 0, y:0})

    // event start draw
    const handleMouseDown = (e: Event) => {
        e.preventDefault();
        drawing.value = true;
        points.value = []
        lastEmit.value = Date.now()
        startPoint.value = VueCanvasDrawing?.value?.getCoordinates(e) as Point
    };

    // even end draw
    const handleMouseUp = (e: Event) => {
        e.preventDefault();
        drawing.value = false;
    };

    // push cordinate list to server 
    const getCoordinate = (event: Event) => {
        if (drawing.value) {
            const cordinate = VueCanvasDrawing?.value?.getCoordinates(event)
            points.value.push(cordinate as Point)
            // emit event every 50 ms
            if (Date.now() - lastEmit.value > 50) {
                lastEmit.value = Date.now()
                socket.emit('draw', {
                    username: store.userData?.username,
                    classId: store.drawingClassData?.id,
                    strokes: [{
                        type: 'dash',
                        from: startPoint.value,
                        coordinates: points.value,
                        color: '#000000',
                        width: 3,
                        fill: false,
                        lineCap: 'round',
                        lineJoin: 'bevel'
                    }]
                });
                points.value = []
                startPoint.value = VueCanvasDrawing?.value?.getCoordinates(event) as Point
            }
        }
    }
</script>

<template>
    <!-- leaderboar  -->
    <div class="flex justify-center w-full mt-5">
        <div class="w-6/12 border shadow-lg">
            <p class="text-lg w-full text-center bg-blue-200 font-bold p-2">
                Drawing Class: {{ store.drawingClassData.id }}
            </p>
            <p class="py-1 px-3">
                Number of user joined: {{ store.drawingClassData.userList?.length }}
            </p>
            <div class="max-h-64 overflow-scroll">
                <UserList :userList = "store.drawingClassData.userList"/>
            </div>
        </div>
    </div>

    <!-- draw canvas -->
    <div class="p-5 flex justify-center">
        <VueDrawingCanvas  ref="DrawingCanvas" 
            :initial-image="store.initialImage"
            :additional-images="additionalImages"
            width="400" 
            height="400" 
            class="border border-blue-200" 
            lineJoin="bevel" 
            @mousemove="getCoordinate($event)" 
            @mousedown = "handleMouseDown" 
            @mouseup = "handleMouseUp" />
    </div>
</template>