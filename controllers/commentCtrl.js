let Comment = require('./../models/commentModel');

function CommentCtrl() {

    let add = function (req, res) {
        let comment = new Comment(req.body);

        comment.save(function (err, comment) {
            if (!err) res.redirect(`/blogs/${req.body.blogId}`);
            else res.status(500).send(err);
        });
    }

    return {
        add: add
    }

};

module.exports = CommentCtrl();