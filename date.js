// console.log(module);
// module.exports = "Hello world";
exports.getDate = function (){
    var today = new Date();
    var options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    
    return today.toLocaleDateString("en-US",options);
};

exports.getDay = function (){
    var today = new Date();
    var options = {
        weekday: 'long'
    };
    return today.toLocaleDateString("en-US",options);

};















// // console.log(module);
// // module.exports = "Hello world";
// module.exports.getDate = getDate ;
// function getDate(){
//     var today = new Date();
//     var options = {
//         weekday: 'long',
//         year: 'numedric',
//         month: 'long',
//         day: 'numeric'
//     };
//     var day = today.toLocaleDateString("en-US",options);
//     return day;
//     // return today.toLocaleDateString("en-US",options);
// }

// module.exports.getDay = getDay ;
// function getDay(){
//     var today = new Date();
//     var options = {
//         weekday: 'long'
//     };
//     var day = today.toLocaleDateString("en-US",options);
//     return day;

// }


// console.log(module.exports);