import { signUp, login, logout, onAuthStateChanged } from "./auth"
import {db} from "./config"
import { doc, getDocs, setDoc, collection, getFirestore, getDoc, deleteDoc} from "firebase/firestore";


const saveSong = async function () {

    const  songName = document.getElementById("titleInput").value.trim()
    const  artistName = document.getElementById("artistInput").value.trim()
    const  yearReleased = document.getElementById("yearInput").value.trim()
    
  
    try{
      
      const songRef = doc(db,"songs", songName.toLowerCase())
     
      await setDoc(songRef, {
        title:songName,
        artist:artistName,
        year:yearReleased,
      })
  
      alert("Good Job! You're song was saved")
      document.getElementById("titleInput").value = ""
      document.getElementById("artistInput").value = ""
      document.getElementById("yearInput").value = ""

      location.reload();
  
    }catch(error){
      console.log("error saving the song", error)
    }
    
  }

  const addForm = document.querySelector("#addSong")
addForm.addEventListener("submit",(event)=>{
  event.preventDefault()
  saveSong()
})

const deleteSong = async function () {
  const songToDelete = document.getElementById("deleteTitleInput").value.trim().toLowerCase();

  try {
    
    const songDocRef = doc(db, "songs", songToDelete);

    const docSnapshot = await getDoc(songDocRef);

    if (docSnapshot.exists()) {
     
      await deleteDoc(songDocRef);
      console.log(`Song deleted: ${songDocRef.id}`);
      
      alert("Song deleted successfully.");

    
      document.getElementById("deleteTitleInput").value = "";

      location.reload();

    } else {
      alert("Song not found. Please check the title and try again.");
    }
  } catch (error) {
    console.error("Error deleting the song", error);
    alert("Error deleting song. Please check the title and try again.");
  }
};

const deleteForm = document.querySelector("#deleteSong");
deleteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  deleteSong();
});

  

  async function getSongs(){
    try{
      const songsCol = collection(db, "songs");
      const snapshot = await getDocs(songsCol); 
      const songs = snapshot.docs.map(doc => ({id:doc.id, ...doc.data()}));
    
      console.log(songs);
  
     
      const songListDiv = document.getElementById("songList");
      songListDiv.innerHTML = "";
  
      
      songs.forEach(song => {
        const songDiv = document.createElement("div");
        songDiv.classList.add("list-group-item", "mb-2");
  
        const songDetails = `
          <h5>${song.title}</h5>
          <p><strong>Artist:</strong> ${song.artist}</p>
          <p><strong>Year Released:</strong> ${song.year}</p>
        `;
        
        songDiv.innerHTML = songDetails;
  
        songListDiv.appendChild(songDiv);
      });
  
    } catch(error){
      console.error("Error getting songs", error);
    }
  }
  
  getSongs();
  
  