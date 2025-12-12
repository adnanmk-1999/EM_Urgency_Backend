function emailList(list) {

    var emailList = []

    for (var i = 0; i < list.length; ++i){
        emailList.push(list[i].Email)
    }
    return emailList;
    
}

module.exports = emailList;