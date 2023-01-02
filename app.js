

const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");
const mongoose = require('mongoose');
const _ = require("lodash");

console.log(date);

const app = express();

// var items = [];
// var workItems = [];     previous storing array

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

// mongoose database
// mongodb://127.0.0.1:27017/todolistDB
mongoose.connect('mongodb+srv://sahilkadge:DEADMAN7@cluster0.p9bmwek.mongodb.net/todolistDB');
mongoose.set('strictQuery', true);
const itemSchema = new mongoose.Schema ({
    name: String
  });

const Item = mongoose.model("Item", itemSchema);
const item1 = new Item({
    name: "Hi!! Welcome to your to-do list."
  });
const item2 = new Item({
    name: "Hit + button to add items to your list'"
  });
const item3 = new Item({
    name: "<--- Hit check button to delete items from list."
  });

const defaultItems = [item1, item2, item3]
// saving default data in database
// Item.insertMany(defaultItems, function(err){
//     if (err){
//         console.log(err);
//     }else{
//         console.log("sucessfully store default items ");
//     }
// })


// list Schema
const listSchema = new mongoose.Schema({
    name: String,
    item: [itemSchema]
});

const List = mongoose.model("List", listSchema);




app.get("/", function(req, res){
    var day = date.getDate();

    // adding items only one time without repeating the use item 
    Item.find({}, function(err, foundItems){
        if(foundItems.length === 0 ){
            Item.insertMany(defaultItems, function(err){
                    if (err){
                        console.log(err);
                    }else{
                        console.log("sucessfully store default items ");
                    }
                });

        }else{
            res.render('list', {
                listTitle: "Today",
                newListItems: foundItems
            }); 

        }
    });









    // adding content to the list on web 
    // Item.find({}, function(err, foundItems){
    //     res.render('list', {
    //         listTitle: day,
    //         newListItems: foundItems
    //     }); 
    // });  
});

// creating dinamic route 
app.get("/:customListName",function(req, res){
    // console.log(req.params.customListName);
    const customListName = _.capitalize(req.params.customListName);

    List.findOne({name: customListName}, function(err, foundList){
        if(!err){
            if(!foundList){
                // create a new list
                const list = new List({
                    name: customListName,
                    item: defaultItems
                });
                list.save();
                res.redirect("/"+ customListName);
            }else{
                // show an existing list
                res.render("list",{listTitle: foundList.name, newListItems: foundList.item});
            }
        }
    });
    
});

app.post("/", function(req, res){
// adding items using mongoose
    const itemName = req.body.newItem;
    const listName = req.body.list;
    const item = new Item({
        name: itemName
    });

    if(listName === "Today"){
        //
        item.save();
        res.redirect("/");
    }else{
        List.findOne({name: listName}, function(err, foundList){
            foundList.item.push(item);
            foundList.save();
            res.redirect("/"+ listName);
        });
    }
    


    // for adding new item in arry 
    // var item = req.body.newItem;
    // if(req.body.list === "work"){
    //     workItems.push(item);
    //     res.redirect("/work");
    // }else{
    //     items.push(item);
    //     res.redirect("/");

    // }
    // // console.log(item);
   
    // // console.log(req.body); we get req.body.list as work

    // res.redirect("/");
});

app.post("/delete", function(req, res){
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;

    if (listName === "Today"){
        Item.findByIdAndRemove(checkedItemId, function(err){
            if(!err){
                console.log("item remove successfully!");
                res.redirect("/");
            }
        });
    }else{
        List.findOneAndUpdate({name:listName},{$pull:{item:{_id: checkedItemId}}}, function(err, foundList){
            if(!err){
                res.redirect("/" + listName);
            }
        });
        
    }
    
});

// app.get("/work", function(req, res){
//     res.render('list',{
//         listTitle: "work List",
//         newListItems: workItems
//     });
// });

// app.post("/work", function(req, res){
//     let item = req.body.newItem;
//     workItems.push(item);
//     res.redirect("/work");
// });

app.get("/about",function(req,res){
    res.render("about");
});

app.listen(3000,function (){
    console.log("server is running on port 3000.");
});










// app.get("/", function(req, res){
//     var today = new Date();
//     var currentDay = today.getDate();
//     var day = "";
//     if (currentDay ===6 || currentDay === 0   ) {
//         day = "weekend";
//         // res.render('list', {kindOfDay: day});

//     }else{
//         day = "weekday";
//         // res.render('list', {kindOfDay: day});

//     }
//     res.render('list', {kindOfDay: day});

       
    
// });



// var currentDay = today.getDay();
//     var day = "";
// switch (currentDay){
//     case 0:
//         day = "Sunday";
//         break;
//     case 1:
//         day = "Monday";
//         break;
//     case 2:
//         day = "Tuesday";
//         break;
//     case 3:
//         day = "Wednesday";
//         break;
//     case 4:
//         day = "Thusday";
//         break;
//     case 5:
//         day = "Friday";
//         break;
//     case 6:
//         day = "Saturday";
//         break;
//     default:
//         console.log("Error! current day doesn't exist");
//         console.log(currentDay);
//         break;
// }