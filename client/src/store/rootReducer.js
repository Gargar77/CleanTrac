const initialState = {
    user: {
        userId: 1,
        firstName: "John",
        lastName: "Doe",
        email: "jonnyboy@gmail.com",
        phone: "321-301-4444"
    },
    leader: {
        name: "Richard Bronson",
        phone: "204-944-9282"
    },
    company: {
        id: 12,
        name: "clean Co.",
        website: "www.cleanCo.com"
    },
    accounts: {
        12:{
            accountName:"urology associates",
            primaryContactName: "Mark Johnson",
            primaryContactPhone: "321-902-4444 x000",
            cleaningDays:[
                {monday:true},
                {tuesday:false},
                {wednesday:true},
                {thursday:false},
                {friday:true},
                {saturday:false},
                {sunday:false}
            ],
            cleanStartTime: "5:00PM",
            cleanEndTime: null
        }
    },
    errors: {
        login: ["Incorrect username/password combination"]
    },
    session: { currentUserId: 25 }
}

const reducer = (state = initialState,action) => {
    // code...
    return state;
}

export default reducer;