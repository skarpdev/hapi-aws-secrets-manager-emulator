# AWS Secrets Manager emulator

At the moment, an extremely minimal emulator of [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/).

Supported AWS Secrets Manager features:
- GetSecretValue

Limitations:
- it ignores secret versions
- it ignores authentication
- it provides an almost entirely hardcoded ARN

Other features:
- it has a UI for simple secret management
- it can preload secrets based on 1-file-1-secret in a given directory


## Preloading secrets

As secrets are really just JSON blobs, we thought it would be easiest just to say that 1 file becomes 1 secret.

In [example-secrets](./example-secrets) you can see, well, an example of this.

`flat` becomes a secret with `SecretId = flat` and secret string is the content of the file.

`hierarchy.one` becomes a secret with `SecretId = hierarchy/one`.

`hierarchy.two` becomes a secret with `SecretId = hierarchy/two`.

You tell the emulator to preload secrets from a directory by assigning an **absolute path** to the environment variable `SECRETS_MANAGER_PRELOAD_DIRECTORY`.
