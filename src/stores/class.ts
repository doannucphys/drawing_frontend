import { defineStore } from "pinia";
import { ref } from "vue";

export const useClassStore = defineStore(
  "class",
  () => {
    const drawingClassData = ref({} as DrawingClass);
    const userData = ref<User>();
    const initialImage = ref();

    const setInitImg = (data: any) => {
      initialImage.value = data;
    };

    const init = () => {
      userData.value = {} as User;
      drawingClassData.value = {} as DrawingClass;
    };

    const setUserData = (username: string, id: string) => {
      userData.value = { username, id };
    };

    const setClassData = (data: DrawingClass) => {
      drawingClassData.value = { ...data };
    };

    const initUserlist = (users: User[]) => {
      drawingClassData.value.userList = [...users];
    };

    const updateUserList = (user: User) => {
      if (
        drawingClassData.value.userList.findIndex(
          (e) => e.username == user.username
        ) < 0
      ) {
        drawingClassData.value.userList.push(user);
      }
    };

    const removeUserFromList = (username: string) => {
      drawingClassData.value.userList = drawingClassData.value.userList.filter(
        (e) => e.username !== username
      );
    };

    return {
      userData,
      drawingClassData,
      initialImage,
      setUserData,
      setClassData,
      updateUserList,
      initUserlist,
      init,
      setInitImg,
      removeUserFromList,
    };
  },
  { persist: true }
);
