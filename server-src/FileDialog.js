const axios = require('axios');

class FileDialog {
  #dirId;

  constructor() {
    this.#dirId = 0;
  }

  async getDataFromApi(endpoint) {
    try {
      const response = await axios.get(endpoint);
      //console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching data from API');
    }
  }

  // this handles directories
  async handleRequest(req, res) {
    let id = req.query.id;
    try {
      let data;
      if (id === undefined) {
        data = (await this.getDataFromApi('http://localhost:3001/api/v1/files'))
          .data;
      } else {
        data = (
          await this.getDataFromApi(`http://localhost:3001/api/v1/files/${id}`)
        ).data;
        this.#dirId = id;
      }
      res.render('file-dialog', { data });
    } catch (err) {
      const msg = `Error reading directory id: ${id ?? '-1'}`;
      console.error(msg);
      res.status(500).send(msg);
    }
  }

  // this handles files
  async handleSelected(req, res) {
    let id = req.query.id;
    try {
      const data = (
        await this.getDataFromApi(
          `http://localhost:3001/api/v1/files/${this.#dirId}/${id}`
        )
      ).data;
      res.render('file-menu', {
        fileName: data.file.name,
        filePath: data.file.path,
      });
    } catch (err) {
      const msg = `Error reading file id: ${id ?? '-1'}`;
      console.error(msg);
      res.status(500).send(msg);
    }
  }
}

exports.FileDialog = FileDialog;
