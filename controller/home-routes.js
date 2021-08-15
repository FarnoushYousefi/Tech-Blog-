const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const sequelize = require('../config/connection');
//home route server homepage
router.get('/', (req, res) => {
  //we need to get all posts
  Post.findAll({
    attributes: ['id', 'title', 'body', 'user_id', 'created_at'],
    include: [
      {
        model: User,
        attributes: ['username'],
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'user_id'],
      },
    ],
  })
    .then((dbPostData) => {
      //serialize data
      if (!dbPostData) {
        res.status(404).json({ message: 'No Posts Available' });
        return;
      }
      const posts = dbPostData.map((post) => post.get({ plain: true })); // serialize all the posts
      console.log(posts);
      if (req.session.loggedIn) {
        res.render('homepage', { posts, loggedIn: req.session.loggedIn });
      } else {
        res.render('login');
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//serve up the single post page
router.get('/post/:id', (req, res) => {
  //we need to get all posts
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'title', 'body', 'user_id'],
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['username'],
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'user_id'],
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      },
    ],
  })
    .then((dbPostData) => {
      //serialize data
      if (!dbPostData) {
        res.status(404).json({ message: 'No Posts Available' });
        return;
      }
      const post = dbPostData.get({ plain: true }); // serialize all the posts
      console.log(post);
      const myPost = post.user_id == req.session.user_id;
      res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn,
        currentUser: myPost,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//serve up the login page
router.get('/login', (req, res) => {
  console.log('Is logged in?', req.session.loggedIn);
  res.render('login', { loggedIn: req.session.loggedIn });
});

router.get('/post', (req, res) => {
  res.render('create-post', { loggedIn: req.session.loggedIn });
});
//load the edit page
router.get('/post/:id', (req, res) => {
  //    post_id: req.postID,
  Post.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      //{
      //   model: Post,
      //   attributes: ['id', 'title', 'body'],
      // },
      {
        model: Comment,

        attributes: ['id', 'comment_text', 'post_id'],
      },
    ],
  }).then((dbpostdata) => {
    console.log(dbpostdata);
    res.render('single-post', {
      loggedIn: req.session.loggedIn,
      post: dbpostdata,
    });
  });
});
router.get('/post/edit/:id', (req, res) => {
  //we need to get all posts
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'title', 'body', 'user_id'],
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['username'],
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'user_id'],
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      },
    ],
  })
    .then((dbPostData) => {
      //serialize data
      if (!dbPostData) {
        res.status(404).json({ message: 'No Posts Available' });
        return;
      }
      const post = dbPostData.get({ plain: true }); // serialize all the posts
      console.log(post);
      const myPost = post.user_id == req.session.user_id;
      res.render('update', {
        post,
        loggedIn: req.session.loggedIn,
        currentUser: myPost,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
module.exports = router;
