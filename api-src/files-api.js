const express = require('express');
const fs = require('fs/promises');
const path = require('path');

class JsonApi {
  constructor(jsonPath) {
    this.jsonPath = path.join(__dirname, jsonPath);
    this.data = [];
  }

  async load() {
    try {
      const jsonData = await fs.readFile(this.jsonPath, 'utf-8');
      this.data = JSON.parse(jsonData);
    } catch (err) {
      console.error(err);
    }
  }

  async save() {
    try {
      const jsonData = JSON.stringify(this.data, null, 2);
      await fs.writeFile(this.jsonPath, jsonData);
    } catch (err) {
      console.error(err);
    }
  }

  async getAll(req, res) {
    await this.load();
    res.json(this.data);
  }

  async getOne(req, res) {
    const id = req.params.id;
    await this.load();
    const item = this.data.find((item) => item.id === Number(id));
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  }

  async create(req, res) {
    const newItem = req.body;
    await this.load();
    this.data.push(newItem);
    await this.save();
    res.status(201).json(newItem);
  }

  async update(req, res) {
    const id = req.params.id;
    const updatedItem = req.body;
    await this.load();
    const index = this.data.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.data[index] = updatedItem;
      await this.save();
      res.json(updatedItem);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  }

  async delete(req, res) {
    const id = req.params.id;
    await this.load();
    const index = this.data.findIndex((item) => item.id === id);
    if (index !== -1) {
      const deletedItem = this.data.splice(index, 1)[0];
      await this.save();
      res.json(deletedItem);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  }

  registerRoutes(app) {
    app.get('/items', this.getAll.bind(this));
    app.get('/items/:id', this.getOne.bind(this));
    app.post('/items', this.create.bind(this));
    app.put('/items/:id', this.update.bind(this));
    app.delete('/items/:id', this.delete.bind(this));
  }
}

exports.JsonApi = JsonApi;
