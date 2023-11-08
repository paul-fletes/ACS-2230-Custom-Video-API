const Purchase = require('../models/purchase');
const User = require('../models/user')
const Video = require('../models/video');

module.exports = (app) => {
  // GET all videos
  app.get('/videos', async (req, res) => {
    try {
      const videos = await Video.find();
      res.render('videos/index', { videos });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });

  // GET a specific video by ID
  app.get('/videos/:id', async (req, res) => {
    try {
      const video = await Video.findById(req.params.id);
      if (!video) {
        return res.status(404).send('Video not found');
      }
      res.render('videos/show', { video });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });

  // POST a new video
  app.post('/videos', async (req, res) => {
    try {
      const { name, price, description, image } = req.body;
      const video = new Video({ name, price, description, image });
      await video.save();
      res.redirect('/videos');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });

  // PUT update a specific video by ID
  app.put('/videos/:id', async (req, res) => {
    try {
      const { name, price, description, image } = req.body;
      const updatedVideo = await Video.findByIdAndUpdate(req.params.id, { name, price, description, image }, { new: true });
      if (!updatedVideo) {
        return res.status(404).send('Video not found');
      }
      res.json({ updatedVideo });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });

  // DELETE a specific video by ID
  app.delete('/videos/:id', async (req, res) => {
    try {
      const deletedVideo = await Video.findByIdAndDelete(req.params.id);
      if (!deletedVideo) {
        return res.status(404).send('Video not found');
      }
      res.json({ deletedVideo });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });
};
