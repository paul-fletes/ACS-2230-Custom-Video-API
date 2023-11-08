const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it } = require('mocha');
const app = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Videos', function () {
  // Test the GET /videos route
  describe('GET /videos', function () {
    it('should return all videos', function (done) {
      chai.request(app)
        .get('/videos')
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });

  // Test the POST /videos route
  describe('POST /videos', function () {
    it('should create a new video', function (done) {
      const video = {
        name: 'Home Alone',
        iso: 400,
        formats: ['Standard', 'Blu-Ray'],
        price: 10.99
      };
      chai.request(app)
        .post('/videos')
        .send(video)
        .end(function (err, res) {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('name').eql('Home Alone');
          done();
        });
    });
  });

  // Test the GET /videos/:id route
  describe('GET /videos/:id', function () {
    it('should return a single video', function (done) {
      const video = {
        name: 'Flubber',
        iso: 400,
        formats: ['Standard', 'Directors Cut'],
        price: 9.99
      };
      chai.request(app)
        .post('/videos')
        .send(video)
        .end(function (err, res) {
          const videoId = res.body._id;
          chai.request(app)
            .get(`/videos/${videoId}`)
            .end(function (err, res) {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('name').eql('Flubber');
              done();
            });
        });
    });
  });

  // Test the PUT /videos/:id route
  describe('PUT /videos/:id', function () {
    it('should update a video', function (done) {
      const video = {
        name: 'Jumanji',
        iso: 400,
        formats: ['Directors Cut', 'Blu-Ray'],
        price: 20.99
      };
      chai.request(app)
        .post('/videos')
        .send(video)
        .end(function (err, res) {
          const videoId = res.body._id;
          chai.request(app)
            .put(`/videos/${videoId}`)
            .send({ price: 22.99 })
            .end(function (err, res) {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('price').eql(22.99);
              done();
            });
        });
    });
  });
  // Test the DELETE /videos/:id route
  describe('DELETE /videos/:id', function () {
    it('should delete a video', function (done) {
      const video = {
        name: 'Spider-Man 3',
        iso: 400,
        formats: ['Blu-Ray'],
        price: 13.99
      };
      chai.request(app)
        .post('/videos')
        .send(video)
        .end(function (err, res) {
          const videoId = res.body._id;
          chai.request(app)
            .delete(`/videos/${videoId}`)
            .end(function (err, res) {
              res.should.have.status(204);
              done();
            });
        });
    });
  });
});  