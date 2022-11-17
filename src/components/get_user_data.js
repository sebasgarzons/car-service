import { getDataUser } from "../components/firebase.js";

export async function get_data_user(){
    const querySnapshot = await getDataUser()

    const user_uid = JSON.parse(window.localStorage.getItem('user_uid_id'));

    querySnapshot.forEach(doc => {
        let user_id = (doc.data().id)

        if (user_uid == user_id){
            let user_perf = (doc.data().perf)
            window.localStorage.setItem('perf_user', JSON.stringify(user_perf));
        }
    });
}