if __name__ == '__main__':

    import sys
    from websocket_protocol import MyServerProtocol

    from twisted.python import log
    from twisted.internet import reactor
    log.startLogging(sys.stdout)

    from autobahn.twisted.websocket import WebSocketServerFactory
    factory = WebSocketServerFactory()
    factory.protocol = MyServerProtocol

    reactor.listenTCP(8765, factory)
    reactor.run()
