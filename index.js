const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const Post = require("./models/Post");

app.use(express.static('public/'));

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", function(require, response){
    Post.findAll({order: [['id', 'DESC']]}).then(function(posts){
        response.render('home/home-posts', {posts: posts});
    });
});

app.get("/delete/:id", function(require, response){
    Post.destroy({where: {'id': require.params.id}}).then(function(){
        response.redirect("/");
    }).catch(function(error){
        response.send('Fail to deleted post: ' + error);
    });
});

app.get("/create", function(require, response){
    response.render('forms/register-post');
});

app.post("/create/post", function(require, response){
    Post.create({
        title: require.body.title,
        content: require.body.content
    }).then(function(){
        response.redirect("/");
    }).catch(function(error){
        response.send('Fail created new post: ' + error);
    });
});

app.get("/update/:id", function(require, response){
    Post.findOne({where: {'id': require.params.id}}).then(function(post){
        response.render('forms/update-post', {post: post});
    });
});

app.post("/update/post/:id", function(require, response){
    Post.update({
        'title': require.body.title,
        'content': require.body.content},
        {where: {'id': require.params.id}}).then(function(){
            response.redirect("/");
    }).catch(function(error){
        response.send('Fail in update this post: ' + error);
    });
});

app.listen(3333, function(){
    console.log('aplication was started...');
});