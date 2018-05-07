// Saves options to chrome.storage.sync.
function save_options() {
  var isBlossom = document.getElementById('blossom').checked;
  chrome.storage.sync.set({
    isBlossom: isBlossom
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = '설정이 저장되었습니다.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    isBlossom: true
  }, function(items) {
    document.getElementById('blossom').checked = items.isBlossom;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
