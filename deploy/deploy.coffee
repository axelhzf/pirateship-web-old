shh = require "shh"
async = require "async"

client = new shh.Client(
    host : "imac"
)

connect = (cb) ->
    client.connect(cb)

close = (cb) ->
    client.close(cb)

run = (cmd) ->
    (cb) -> client.exec cmd, (err, result) ->
        console.log(result)
        cb(err)

commands = [
    connect
    run("cd dev/deploy/pirateship-web")
    run("npm run-script stop")
    run("git pull")
    run("npm run-script build")
    run("npm run-script start")
    close
]

async.series(commands)
