# Social Network API

![License Badge](https://img.shields.io/badge/License-MIT-blue)  
[GitHub Repository](https://github.com/atmason90/social-network-api)

## Table of Contents

- [Description](#description)
- [Demo Video](#demo-video)
- [Code Examples](#code-examples)
- [Technologies Used](#technologies-used)
- [Questions](#questions)
- [License](#license)

## Description

The purpose of this project was to create an API for a social network web application where users can share their thoughts, react to other's thoughts, and create a friend list.

Express.js was used for routing, a MongoDB database was used to store User and Thought data, and Mongoose was used for object data modeling (ODM).

## Demo Video

This video displays all api routes being tested for functionality in Insomnia.

## Code Examples

This example shows how I modeled my Users data.

```js
const UsersSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thoughts",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);
```

This example displays the controller for the api route that lets a user post a thought.

```js
  createThoughts({ params, body }, res) {
        Thoughts.create(body)
        .then(({ _id }) => {
            return Users.findOneAndUpdate(
                { _id: params.userId},
                { $push: { thoughts: _id } },
                { new: true });
        })
        .then(ThoughtsData => {
            if(!ThoughtsData) {
                res.status(404).json({ message: 'Invalid Thoughts Id' });
                return;
            }
            res.json(ThoughtsData)
        })
        .catch(err => res.json(err));
    },
```

## Technologies Used

![JavaScript Badge](https://img.shields.io/badge/Language-JavaScript-yellow)
![Express.js Badge](https://img.shields.io/badge/Backend-Express.js-informational)
![MongoDB Badge](https://img.shields.io/badge/Database-MongoDB-green)
![Mongoose Badge](https://img.shields.io/badge/ODM-Mongoose-important)
![Moment.js Badge](https://img.shields.io/badge/NPM-Moment.js-red)

## Questions

If you have any questions regarding this project, please reach out to me via email at [atmason90@gmail.com](mailto:atmason90@gmail.com).

You can view my other projects on GitHub by visiting my profile. [atmason90](https://github.com/atmason90)

## License

MIT License

Copyright (c) 2022 Andrew Mason

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
