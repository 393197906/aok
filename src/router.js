module.exports = ({config, middleware}) => [{
    method: "get",
    url: "/",
    controller: "index:index",
    middleware: middleware.auth
},
    {
        method: "get",
        url: "/test",
        controller: "index:test"
    }
];
