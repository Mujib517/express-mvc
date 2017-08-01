let Blog = require('../models/blogModel');
let Comment = require('../models/commentModel');

module.exports = {
    get: function (req, res) {

        let pageIndex = req.params.pageIndex || 0;
        let pageSize = req.params.pageSize || 5;
        let rows = 0;

        Blog.count()
            .exec()
            .then(function (count) {
                rows = count;
            });

        Blog.find()
            .skip(pageSize * pageIndex)
            .limit(pageSize)
            .exec()
            .then(function (data) {
                res.status(200);
                res.render('pages/blogs', { blogs: data, metadata: { rows: rows, pages: Math.ceil(rows / pageSize) } });
            })
            .catch(function (err) {
                res.status(200);
                res.send(err);
            });
    },

    getById: function (req, res) {
        let id = req.params.id;

        Blog.findById(id).exec()
            .then(function (blog) {

                let data = blog.toJSON();

                Comment.find({ blogId: blog._id })
                    .exec()
                    .then(function (comments) {
                        data.comments = comments;
                        res.status(200);
                        res.render("pages/blog-detail", data);
                    });
            })
            .catch(function (err) {
                res.status(500);
                res.send(err);
            });
    },

    new: function (req, res) {
        res.render("pages/add-blog");
    },

    post: function (req, res) {
        res.status(201);
        res.render('pages/blogs');
    }
}