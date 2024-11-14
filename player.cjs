const yargs = require('yargs')

const { pipelines } = require('media-stream-library')

const argv = yargs.options({
  uri: { type: 'string', describe: 'rtsp://hostname/path' },
  host: { type: 'string', describe: 'hostname', conflicts: 'uri' },
  vapix: {
    type: 'string',
    describe: 'key=value [key=value ...]',
    conflicts: 'uri',
    array: true,
  },
}).argv

if (!(argv.uri || argv.host)) {
  console.log('You must specify either a host or full RTSP uri')
  yargs.showHelp()
  process.exit(1)
}

// Set up main configuration object.
const config = {
  rtsp: {
    uri: argv.uri,
    hostname: argv.host,
    parameters: argv.vapix,
  },
}

// Setup a new pipeline
const pipeline = new pipelines.CliMp4Pipeline(config)
pipeline.rtsp.play()