//fungsi untuk mendapatkan tanggal hari ini
function getCurrentDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    let yyyy = today.getFullYear();

    return dd + '-' + mm + '-' + yyyy;
}

const users = JSON.parse(localStorage.getItem('users')) || [];
const emailActive = JSON.parse(localStorage.getItem('emailActive'));
let userIndex, updateId;

for(let i = 0; i < users.length; i++){
    if(users[i].email === emailActive){
      userIndex = i;
    }
}

let notes = users[userIndex].notes;

//mencari localStorage notes jika ada dan menparse-nya ke js object. 
//Jika tidak akan menyimoan array kosong ke notes 
// const notes = JSON.parse(localStorage.getItem("notes") || "[]");

//mendeklarasi bbrp variabel pendukung
let titleTag = document.querySelector('.modal-note-title')
let dateTag = document.querySelector('.modal-note-date')
let labelTag = document.querySelector('.modal-note-label')
let contentTag = document.querySelector('.modal-note-content')
let updateBtn = document.querySelector(".modal-button .btn-success")
let deleteBtn = document.querySelector(".modal-button .btn-danger")
let archiveBtn = document.querySelector(".modal-button .btn-primary")
let sortButton = document.querySelector('.sort');
let timeSortButton = document.querySelector('.time');
let alphabetSortButton = document.querySelector('.alphabet');
let swapButton = document.querySelector('.btn span.material-symbols-outlined');
let UserName = document.querySelector(".UserName")
let welcome = document.querySelector(".welcome")
let date = document.querySelector(".date")

//Fungsi menampilkan notes
function showNotes(){
    document.querySelectorAll(".note-wrap").forEach(note => note.remove());
    notes.forEach((note, index) => {
        if(note.archive === true){
            let divTag = `<div class="note-wrap col-6 col-xl-2 col-lg-3 col-md-4 m-3">
                            <div class="note card p-3" onclick="displayNote(${index}, '${note.title}', '${note.date}', '${note.label}', '${note.content}')">
                                <h5 class="card-title">${note.title}</h5>
                                <p class="card-date mb-2" style="font-size: 14px; color: #6A6A6A;">${note.date}</p>
                                <p class="card-text">${note.content}</p>
                            </div>
                        </div>`;
            document.querySelector('.background .row').innerHTML += divTag;
        }
    });
}
showNotes(); //tampilkan notes

// Fungsi update note (memunculkan modal) ketika note ditekan
function displayNote(noteId, title, date, label, content){
    titleTag.value = title;
    dateTag.textContent = date;
    labelTag.value = label;
    contentTag.value = content;
    noteIndex = noteId;
    var noteModal = new bootstrap.Modal(document.getElementById('noteModal'));
    noteModal.show();
}

function updateNote(noteId, title, date, label, content, isArchived){
    updateId = noteId
    notes[updateId] = {title: title, date: date, label: label, content:content, archive:isArchived}; //updating specified note
    //Menyimpan note yang telah diperbarui ke local storage
    users[userIndex] = {email: users[userIndex].email, notes: notes, password: users[userIndex].password}
    localStorage.setItem('users', JSON.stringify(users));
    // localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

// Fungsi untuk mengurutkan berdasarkan waktu
function sortByTime() {
    sortButton.textContent = 'Time Created';
    /* notes.sort((a, b) => {
        return b.date - a.date;
    }); */
    
    // sort berdasarkan waktu, jika sama maka akan sort berdasarkan alfabet
    for(i = 1; i < notes.length; i++){
        for(j = 0; j < notes.length-i; j++){
            if(notes[j].date > notes[j+1].date){
                temp = notes[j];
                notes[j] = notes[j+1];
                notes[j+1] = temp;
            }
            else if(notes[j].date === notes[j+1].date){
                if(notes[j].title.toLowerCase() > notes[j+1].title.toLowerCase()){
                    temp = notes[j];
                    notes[j] = notes[j+1];
                    notes[j+1] = temp;
                }
            }
        }
    }
    // if (swapButton.classList.contains('reversed')) {
    //     notes.reverse();
    // }
    showNotes();
}

// Fungsi untuk mengurutkan secara alfabetis
function sortByAlphabet() {
    sortButton.textContent = 'Alphabet';
    notes.sort((a, b) => {
        let titleA = a.title.toLowerCase();
        let titleB = b.title.toLowerCase();
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
    });
    // if (swapButton.classList.contains('reversed')) {
    //     notes.reverse();
    // }
    showNotes();
}


// Fungsi untuk membalikkan hasil sort
function reverseSort() {
    notes.reverse();
    showNotes();
}

//membuat event onclick pada update button
updateBtn.addEventListener("click", () => {
    updateNote(noteIndex, titleTag.value, dateTag.textContent, labelTag.value, contentTag.value, notes[noteIndex].archive)
    document.querySelector(".modal-header .btn-close").click();
});

//membuat event onclick pada delete button
deleteBtn.addEventListener("click", () => {
    notes.splice(noteIndex, 1); //menghapus note dari array
    //simpan note yang telah terupdate ke localStorage
    users[userIndex] = {email: users[userIndex].email, notes: notes, password: users[userIndex].password}
    localStorage.setItem('users', JSON.stringify(users));
    // localStorage.setItem("notes", JSON.stringify(notes));
    document.querySelector(".modal-header .btn-close").click();
    showNotes();
});

//membuat event onclick pada archive button
archiveBtn.addEventListener("click", () => {
    notes[noteIndex].archive = false;
    //simpan note yang telah terupdate ke localStorage
    users[userIndex] = {email: users[userIndex].email, notes: notes, password: users[userIndex].password}
    localStorage.setItem('users', JSON.stringify(users));
    // localStorage.setItem("notes", JSON.stringify(notes));
    document.querySelector(".modal-header .btn-close").click();
    showNotes();
});

// Event Listener untuk tombol sort by Time Created
timeSortButton.addEventListener('click', sortByTime);

// Event Listener untuk tombol sort by Alphabet
alphabetSortButton.addEventListener('click', sortByAlphabet);

// Event Listener untuk tombol swap_vert
swapButton.addEventListener('click', reverseSort);

//fungsi untuk mendapatkan tanggal dan hari sekarang
function getCurrentDateAndDay() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    const now = new Date();
    const dayOfWeek = days[now.getDay()];
    const month = months[now.getMonth()];
  
    const date = now.getDate();
    const year = now.getFullYear();
  
    return `${dayOfWeek}, ${date} ${month} ${year}`;
  }

//mengubah content document sesuai info user
document.addEventListener('DOMContentLoaded', function() {
    UserName.textContent = emailActive.split('@')[0].charAt(0).toUpperCase()+emailActive.split('@')[0].slice(1);
    welcome.textContent = 'Welcome to Archive, '+emailActive.split('@')[0].charAt(0).toUpperCase()+emailActive.split('@')[0].slice(1)+'!';
    date.textContent = getCurrentDateAndDay();
});