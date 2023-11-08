const Purchase = require('../models/purchase');
const Video = require('../models/video');
const User = require('../models/user')

module.exports = (app) => {
  // CREATE a new purchase
  app.post('/purchases', async (req, res) => {
    try {
      const { video_id, quantity } = req.body;

      // Find the video being purchased
      const video = await Video.findById(video_id);

      // Calculate the total price of the purchase
      const total_price = video.price * quantity;

      // Create a new purchase record
      const purchase = new Purchase({
        user: req.user._id, // using JWT for authentication
        video: video_id,
        quantity,
        total_price,
      });

      // Save the purchase record to the database
      await purchase.save();

      res.status(201).json({ message: 'Purchase created successfully', purchase });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // READ all purchases
  app.get('/purchases', async (req, res) => {
    try {
      const purchases = await Purchase.find({ user: req.user._id }).populate('video');
      res.json({ purchases });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // READ a specific purchase by ID
  app.get('/purchases/:purchase_id', async (req, res) => {
    try {
      const { purchase_id } = req.params;
      const purchase = await Purchase.findById(purchase_id).populate('video');
      if (!purchase) {
        return res.status(404).json({ message: 'Purchase not found' });
      }
      if (purchase.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      res.json({ purchase });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // UPDATE a specific purchase by ID
  app.put('/purchases/:purchase_id', async (req, res) => {
    try {
      const { purchase_id } = req.params;
      const { quantity } = req.body;

      // Find the purchase being updated
      const purchase = await Purchase.findById(purchase_id).populate('video');
      if (!purchase) {
        return res.status(404).json({ message: 'Purchase not found' });
      }
      if (purchase.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // Find the video being purchased
      const video = await Video.findById(purchase.video._id);

      // Calculate the total price of the updated purchase
      const total_price = video.price * quantity;

      // Update the purchase record
      purchase.quantity = quantity;
      purchase.total_price = total_price;
      await purchase.save();

      res.json({ message: 'Purchase updated successfully', purchase });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // DELETE a specific purchase by ID
  app.delete('/purchases/:purchase_id', async (req, res) => {
    try {
      const { purchase_id } = req.params;

      // Find the purchase being deleted
      const purchase = await Purchase.findById(purchase_id);
      if (!purchase) {
        return res.status(404).json({ message: 'Purchase not found' });
      }
      if (purchase.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // Delete the purchase record from the database
      await purchase.remove();

      res.json({ message: 'Purchase deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
};

