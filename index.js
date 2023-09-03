const express = require('express');
const path = require('path');


const port = 9000;

const db = require('./config/mongoos');
const Contact = require('./model/contact');
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded());
app.use(express.static('assets'));

var contactList = [
    {
        name: "Biswajit",
        phone_no: 8609300739
    },
    {
        name: "Bisu",
        phone_no: 8617076584
    },
    {
        name: "Suman",
        phone_no: 8384679564
    }
]
app.get('/', async function (req, res) {
    // console.log(import.meta.url);
    // res.send("<h1>cool, it is running or is it</h1>");
    // Contact.find({},function(err,contactList){
    //     if(err){
    //         console.log("Error in fetching contacts from db");
    //         return;
    //     }
    // })

    const contactList = await Contact.find({});

    // console.log(contactList)
    return res.render('home', { title: "My contact List", contact_list: contactList });
})
app.get('/practice', function (req, res) {
    return res.render('practice', {
        title: "Let us play ejs"
    })
})

// app.post('/create_contact',function(req,res){
//     // return res.redirect('/practice')
//     // contactList.push({
//     //     name: req.body.name,
//     //     phone_no: req.body.number
//     // });
//     Contact.create({
//         name: req.body.name,
//         phone_no: req.body.number
//     },function(err,newContact){
//         if(err){
//             console.log('error in creating a contact');
//             return;
//         }
//         console.log('**********',newContact);
//         return res.redirect('back');
//     });

//     // contactList.push(req.body);
//     // return res.redirect('back');
// });

app.post('/create_contact', async (req, res) => {
    contactList.push({
           name: req.body.name,
           phone_no: req.body.number
        });
    const { name, number } = req.body;
    try {
        await Contact.create({ name, phone: number });
    } catch (error) {
        console.log("Error in creating new contact", error);
    }
    return res.redirect('back');
})

app.get('/delete-contact/:id', async function (req, res) {
    // get the query from the url

    // let contactIndex = contactList.findIndex(contact => contact.phone_no == phone);

    // if (contactIndex != -1) {
    //     contactList.splice(contactIndex, 1);
    // }

    await Contact.findByIdAndDelete(req.params.id);

    return res.redirect('back');
});

app.listen(port, (err) => {
    if (err) {
        console("Error in running server", err);
    }
    console.log("Express server is running on port", port);
})



