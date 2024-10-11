
//import { db, auth } from './../config/FireBaseConfig.js'; // Asegúrate de tener Firebase configurado

import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";


export default getLearnedElements=async( db,auth, setFilteredElements,setUserData, groupID )=>{
    const user = auth.currentUser;
    if (!groupID) {
        console.error('Valor de groupID vacío!');
        return;
    }
    //setLoading(true); 
    try {
        // Obtener datos del usuario y elementos en paralelo
        const [userDoc, elementsSnapshot] = await Promise.all([
            getDoc(doc(db, 'users', user.uid)),
            getDocs(query(collection(db, 'elements'), where('groupID', '==', groupID)))
        ]);

        if (userDoc.exists()) {
            setUserData(userDoc.data());
        } else {
            console.log('No se encontraron datos para el usuario.');
        }

        const elementsList = elementsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFilteredElements(elementsList);
    } catch (error) {
        console.error('Error al obtener datos:', error);
    } finally {
        //setLoading(false);
    }
}