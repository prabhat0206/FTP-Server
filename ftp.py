from pyftpdlib.authorizers import DummyAuthorizer
from pyftpdlib.handlers import FTPHandler
from pyftpdlib.servers import FTPServer

authorizer = DummyAuthorizer()
authorizer.add_user("user", "12345", "./public", perm="elradfmwMT")
authorizer.add_anonymous("./public/orgs")

handler = FTPHandler
handler.authorizer = authorizer
handler.permit_foreign_addresses = True

server = FTPServer(("0.0.0.0", 21), handler)
server.serve_forever()