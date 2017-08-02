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
            .sort("-lastUpdated")
            .skip(pageSize * pageIndex)
            .limit(pageSize)
            .exec()
            .then(function (data) {
                res.status(200);
                let next;
                let prev;

                let pages = Math.ceil(rows / pageSize)

                if (parseInt(pageIndex) < pages - 1)
                    next = parseInt(pageIndex) + 1;
                if (parseInt(pageIndex) > 0)
                    prev = parseInt(pageIndex) - 1;
                res.render('pages/blogs', { blogs: data, metadata: { prev: prev, next: next, current: pageIndex + 1, rows: rows, pages: pages } });
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
    },

    save: function (req, res) {
        //console.log(req.body);
        let blog = new Blog(req.body);

        blog.save(function (err, success) {
            if (!err) {
                res.redirect("/blogs");
            }
            else {
                res.status(500);
                res.send("Failed");  //TODO:redirect to an error page
            }
        });

        //localhost:5000/blogs
    }
}