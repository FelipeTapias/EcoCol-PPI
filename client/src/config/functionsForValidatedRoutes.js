import { getFromLocal } from './localStorage'
const userData = JSON.parse(getFromLocal("user"));

export const validateEditorRoutes = () => {
    if (userData !== undefined && userData !== null && userData.typeUser === "editor") return 200;
    else return 500; 
}

export const validateTravelerRoutes = () => {
    if(userData !== undefined && userData !== null && userData.typeUser === "traveler") return 200; 
    else return 500; 
}



