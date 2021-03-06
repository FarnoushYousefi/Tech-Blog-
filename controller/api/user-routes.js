const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
//get all the users
router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] },
    include: [
      {
        model: Post,
        attributes: ['id', 'title', 'body'],
      },
      {
        model: Comment,

        attributes: ['id', 'comment_text', 'post_id'],
      },
    ],
  }) //include the posts and comments of this user
    .then((dbUserData) => {
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get user by id
router.get('/:id', (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
    attributes: { exclude: ['password'] },
    include: [
      {
        model: Post,

        attributes: ['id', 'title', 'body'],
      },
      {
        model: Comment,

        attributes: ['id', 'comment_text', 'post_id'],
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No User found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//add user through the signup form
router.post('/', (req, res) => {
  console.log(req.body);
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbUserData) => {
      //save the data into a session
      req.session.save(() => {
        // we run the save function
        req.session.user_id = dbUserData.id; //and give it the data we want to save
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
        res.json(dbUserData); //Run this in callback so we make sure the session is updated before we respond
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
//log in the user
router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((dbUserData) => {
      //check if there was a user present
      if (!dbUserData) {
        res.status(400).json({ message: 'User not found' });
        return;
      }
      const validPassword = dbUserData.checkPassword(req.body.password);

      //procede based on results
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect Password!' });
        return;
      }

      //save things into session
      req.session.save(() => {
        //declare session variables
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
        //send response
        res.json({ user: dbUserData, message: 'You are now logged in!' });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
//update user
router.put('/:id', (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
//update user
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No User found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/logout', (req, res) => {
  console.log('I am logout************');
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      // end the session
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
module.exports = router;
