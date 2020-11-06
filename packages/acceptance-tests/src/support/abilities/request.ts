import request from 'supertest'
import { Before, After } from '@cucumber/cucumber'
import { Server } from 'http'
import { startWebServer } from 'git-en-boite-web'
import { World } from '../world'
import { Logger } from 'git-en-boite-core'

let webServer: Server

Before(function (this: World) {
  webServer = startWebServer(this.app, 8888, Logger.none)
  this.request = request(webServer)
})

After(function () {
  if (webServer) webServer.close()
})
