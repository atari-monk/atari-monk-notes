function createJSONFile() {
  var name = document.getElementById('name').value;
  var type = document.getElementById('type').value;
  var navId = document.getElementById('navId').value;
  var title = document.getElementById('title').value;
  var note = document.getElementById('note').value;
  var jsonFile = document.getElementById('jsonFile').files[0];

  if (name && type && navId && title) {
    // Create a new JSON object
    var newObject = {
      type: type,
      navId: navId,
      title: title,
      note: [note],
    };

    // Load an existing JSON file
    if (jsonFile) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var existingData = JSON.parse(e.target.result);
        existingData.note.push(newObject);

        // Save the modified data to a file
        var data =
          'data:text/json;charset=utf-8,' +
          encodeURIComponent(JSON.stringify(existingData));
        var link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', name + '.json');
        link.click();
      };
      reader.readAsText(jsonFile);
    } else {
      // Create a new JSON file with the new object
      var data = JSON.stringify({
        type: type,
        navId: navId,
        title: title,
        note: [note],
      });
      var blob = new Blob([data], { type: 'application/json' });
      var url = URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', name + '.json');
      link.click();
    }
  } else {
    alert('Please fill in all fields');
  }
}
