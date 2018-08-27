module.exports = app => [{
    method: "get",
    url: "/",
    controller: "aha:index:index",
    middleware: 'auth'
},
    {
        method: "get",
        url: "/test",
        controller: "index:test"
    }
];
