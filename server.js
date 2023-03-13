const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);
 
app.use(express.static(__dirname + '/public'));
//set the view engine to ejs
app.set('view engine','ejs');

//use res.render to load up an ejs view file
app.use(express.json());
app.use(express.urlencoded({ extended: true}));



// index page
app.get('/' , ( req, res ) => {
    // res.writeHead(200,{'Content-type':'text/html'});
    // res.end('Testing');

    // Passing Data to Views and Partials
    const people=[
        {name: 'Han', department: "IT", birth_year: 2000},
        {name: 'John', department: "Software", birth_year: 1996},
        {name: 'Kelly', department: "Finance", birth_year: 1995},
    ];
    const tagline = "EJS Template Engine";

    // res.render('pages/index');
    res.render('pages/index',{
        people: people,
        tagline: tagline
    })
});

app.get('/about',(req, res) => {
    res.render('pages/about');
})

//about search

//get method
app.get('/search', (req, res) => {
    // console.log(req.query.q);
    const search = req.query.q;
    const fnSearch = req.query.fn;
    const lnSearch = req.query.ln;
    // const idtxt = req.query.id;
    // const tdtxt = req.query.td; 
    const inforForm01 = [
        { s: search , fn: fnSearch , ln: lnSearch},
    ];  
    const tagline = " Search Details Box";
    res.render('partials/search',{
        inforForm01 : inforForm01,
        tagline : tagline,
    });   
    // res.render('partials/search');
    // res.send({
    //     'Search infor' : search,
    //     'Fisrt name' : fnSearch,
    //     'Last name' : lnSearch,
    // })
});

//post method
app.post('/search',(req, res) => {
    const q = req.body.q;
    const fn = req.body.fn;
    const ln = req.body.ln;
    const idtxt = req.body.id;
    const potxt = req.body.ps;
    const cttxt = req.body.ct;
    const agtxt = req.body.ag;
    const adtxt = req.body.ad;
    const sltxt = req.body.sl;
    const inforForm02_result = [];
    // const inforForm02 = [];
    const inforForm02 = [
        { id: idtxt, position: potxt, contact: cttxt, age: agtxt , address: adtxt, salary: sltxt},
    ];
    // inforForm02_result.push({ID:idtxt}); 
    inforForm02_result.push({ "ID" : idtxt, "Position" : potxt , "Contact" : cttxt , "Age" : agtxt , "Address" : adtxt , "Salary" : sltxt });
    // inforForm02.push({"ID": idtxt, Position: potxt, Contact: cttxt, Age: agtxt , Address: adtxt, Salary: sltxt});
    // inforForm02_result.push(inforForm02);

    const tagline = "Welcome To Details Page";
    res.render('pages/detail',{
        inforForm02_result : inforForm02_result,
        // inforForm02_result : inforForm02,
        tagline : tagline
    });
    // inforForm02 =;
    console.log(inforForm02_result);
    
    // res.send({
    //     'Information' : q,
    //     'Fisrt Name' : fn,
    //     'Last Name' : ln
    // }) 
       
    
});




app.listen( port , () => {
    console.log(`App is listening port ${port}`);
});
