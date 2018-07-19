module.exports = app => [{
        method: "get",
        url: "/",
        controller: "index:index"
    },
    {
        method: "get",
        url: "/test",
        controller: "index:test"
    }
]