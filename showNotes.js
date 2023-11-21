// Function to show the modal with note details
function showNoteDetails(title, date, content) {
    document.querySelector('.modal-note-title').textContent = title;
    document.querySelector('.modal-note-date').textContent = date;
    document.querySelector('.modal-note-content').textContent = content;

    // Show the modal
    var noteModal = new bootstrap.Modal(document.getElementById('noteModal'));
    noteModal.show();
  }

  // Add an event listener to each note to trigger the modal
  var notes = document.querySelectorAll('.note');
  notes.forEach(function (note) {
    note.addEventListener('click', function () {
      var title = this.querySelector('.card-title').textContent;
      var date = this.querySelector('.card-date').textContent;
      var content = this.querySelector('.card-text').textContent;
      showNoteDetails(title, date, content);
    });
  });