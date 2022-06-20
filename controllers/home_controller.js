module.exports.home = function(req,res) {
console.log(req.cookies);
res.cookie('somthing', 'blah')
    return res.render('home',{
        title: "home"
    });
    // return res.end('<h1> express is up for codial</h1>');
    
}   