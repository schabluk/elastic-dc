# elastic-dc
data collection plugin for elastisearch

## installation

`git clone https://github.com/schabluk/elastic-dc.git`
`cd elastic-dc`

to build the java plugin

`mvn package`

to re-build the site plugin

`npm install`
`npm run build`

to install plugin

`cd $ES_HOME/`
`./bin/plugin install file:$HOME/path/to/elastic-dc/target/release/elastic-dc-0.0.4.zip`
