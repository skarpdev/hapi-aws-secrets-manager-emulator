# Notes to self

## Releasing a new version

```
npm version <major|minor|patch>
docker build -t skarpdev/aws-secrets-manager-emulator:<version> .
docker push skarpdev/aws-secrets-manager-emulator:<version>
```
