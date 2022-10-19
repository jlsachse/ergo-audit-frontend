# ErgoAudit Frontend
ErgoAudit is an open-source platform to audit projects around and on the Ergo
Platform. Anyone with a web3 experience can analyze an existing project in the
ecosystem. Dao provides templates for analyzing projects in various categories, 
such as defi, metaverse, nft, mining, dao and others.

## Links
- [Website](https://red-lobster-showcase.link/)
- [Backend](https://github.com/jlsachse/ergo-audit-backend)

## Docker

Our frontend can be easily installed with docker.
Just clone the repository and run the commands below.

```sh
cd /ergo-audit-frontend
docker build -t ergoauditfrontend .
docker container run -d -p [YOUR_PORT]:80 ergoauditfrontend
```