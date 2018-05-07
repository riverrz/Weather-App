const getUser = (id,callback)=> {
    const user = {
        id,
        name: "Shivam"
    };

    callback(user);
};


getUser(31,(user)=> {
    console.log(user);
    
});