
let note = [];
loadNote();
const addNoteBtn = document.getElementById('addNoteBtn');
const searchInput = document.getElementById('searchInput');

addNoteBtn.addEventListener('click',addNote);
searchInput.addEventListener('input',searchNote);



function saveNote(){
      localStorage.setItem('saveItem',JSON.stringify(note));
}

function loadNote(){     
      const saved = localStorage.getItem('saveItem');     
      if(saved) note = JSON.parse(saved);
      renderNote();
}

function addNote(){
      const noteTitle = document.getElementById('noteTitle').value.trim();
      const noteContent = document.getElementById('noteContent').value.trim();
      const noteColor = document.getElementById('noteColor').value;
      

      if(!noteContent || !noteTitle){
            alert('Please enter a title and some content');
      }else{
            note.unshift({
                  id: new Date().toString(),
                  title: noteTitle,
                  content: noteContent,
                  date: new Date().toLocaleString('en-US'),
                  color: noteColor,
                  pinned: false

            });
            saveNote();
            renderNote();
      }

     document.getElementById('noteTitle').value = '';
     document.getElementById('noteContent').value = '';
      
}

function renderNote() {
      const notesGrid = document.getElementById('notesGrid');
      if(note.length === 0){
            notesGrid.innerHTML = `
            <div class="col-12 text-center text-white py-5">                       
                  <h4 class="mt-3">No notes found</h4>
            </div>
            `;
            return;
      }
      notesGrid.innerHTML = note.map(note =>`
            <div class="col-lg-3 col-md-4 col-sm-6">
                  <div class="card my-3 shadow position-relative" id="noteCard" style = "background: ${note.color}">
                  ${note.pinned ? '<div class="pinned-note"></div>' : ''}
                  
                        <div class="card-body" >
                              <div class="card-title">
                                    <h6 class="note-title">
                                          ${note.title}
                                    </h6>
                              </div>
                              <div class="note-body">
                                    <p class="note-content">
                                          ${note.content}
                                    </p>
                              </div>
                              <div class="date-note">
                                    <small>${note.date}</small>
                              </div>
                              <div class="d-flex mt-3 justify-content-center gap-2">
                                    <a class="btn btn-sm btn-success pin-btn" onclick = "togglePin('${note.id}')" >
                                          pin
                                    </a>

                                    <a class="btn  btn-sm btn-primary edit-btn" onclick = "editNote('${note.id}')">
                                          edit
                                    </a>
                                    <a class="btn btn-sm btn-danger delete-btn" onclick="deleteNote('${note.id}')">
                                          delete
                                    </a>
                              </div>

                        </div>
                  </div>
            </div>`
      ).join('');
}


function deleteNote(id){
      if(confirm("Are you sure you want to delete this note?")){           
            note = note.filter(n => n.id !== id);
            saveNote();
            renderNote();
      }
          
}

function editNote(id){
      const findNote = note.find(n => n.id === id);
      if(findNote){
            const newTitle = prompt('New title:', findNote.title);
            const newContent = prompt('New content:', findNote.content);
            findNote.title = newTitle;
            findNote.content = newContent;
            saveNote();
            renderNote();
      }     
}
function searchNote(){
      const searchVal = searchInput.value.toLowerCase().trim();
      if(searchVal !== ''){
            note = note.filter(n => 
            n.title.toLowerCase().includes(searchVal) ||
            n.content.toLowerCase().includes(searchVal));
      renderNote();
      }else{
            loadNote();
      }           
}
function togglePin(id){
      const pinnedNote = note.find(n => n.id == id); 
      if(pinnedNote){            
            pinnedNote.pinned = !pinnedNote.pinned;
            
            console.log(pinnedNote.pinned);
            note.sort((a, b) => {
                  if (a.pinned === b.pinned) return 0;
                  return a.pinned ? -1 : 1;
            });
            saveNote();
            renderNote();
      }

}