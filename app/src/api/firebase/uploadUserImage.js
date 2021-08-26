import firebase from "firebase";
import { firebaseStorage } from ".";

export let userImageURL = undefined;

export default function uploadUserImage(userUid, file) {
    console.log(userUid);
    // Upload file and metadata to the object 'images/mountains.jpg'
    let uploadTask = firebaseStorage.ref("userPhoto").child(userUid).put(file);
    
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    alert("У пользователя нет разрешения на доступ к объекту")
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    alert("Пользователь отменил загрузку")
                    // User canceled the upload
                    break;
    
                    // ...
    
                case 'storage/unknown':
                    alert("Произошла неизвестная ошибка, проверьте error.serverResponse")
                    // Unknown error occurred, inspect error.serverResponse
                    break;
                default:
                    alert (error.code);
            }
        },
        () => {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
                userImageURL = downloadURL;
            });
        }
    );
}