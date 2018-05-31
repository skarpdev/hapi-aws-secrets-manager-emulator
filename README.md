# AWS Secrets Manager emulator

Available on Docker Hub as [skarpdev/aws-secrets-manager-emulator](https://hub.docker.com/r/skarpdev/aws-secrets-manager-emulator/).

At the moment, an extremely minimal emulator of [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/).

Supported AWS Secrets Manager features:
- [GetSecretValue](https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html)

Limitations:
- it ignores secret versions
- it ignores authentication
- it provides an almost entirely hardcoded ARN

Other features:
- it has a UI for simple secret management
- it can preload secrets based on 1-file-1-secret in a given directory


## Configuration

Configuration is done through environment variables.

- `SECRETS_MANAGER_PORT` the port to run on - **default is 3000**
- `SECRETS_MANAGER_PRELOAD_DIRECTORY` absolute path of directory from which to read initial set of secrets (see below) - **default is empty**
- `SECRETS_MANAGER_SECRETS` secrets to preload if you are unable to use volume mounts - **default is empty**


## Preloading secrets

Preloading secrets can be done either via files or by passing a JSON string through an environment variable.

If you define the same SecretId as both a file and in environment - **the version from env will win**.


### Via files

As secrets are really just JSON blobs, we thought it would be easiest just to say that 1 file becomes 1 secret.

In [example-secrets](./example-secrets) you can see, well, an example of this.

`flat` becomes a secret with `SecretId = flat` and secret string is the content of the file.

`hierarchy.one` becomes a secret with `SecretId = hierarchy/one`.

`hierarchy.two` becomes a secret with `SecretId = hierarchy/two`.

You tell the emulator to preload secrets from a directory by assigning an **absolute path** to the environment variable `SECRETS_MANAGER_PRELOAD_DIRECTORY`.


### Via environment variable

You can provide a set of initial secrets by setting the environment variable `SECRETS_MANAGER_SECRETS` to a JSON string.

The pretty-printed object would look like this:

```json
{
    "from/env": "{\"key\":\"value\"}",
    "kewl": "{\"kinda\":\"ew\"}"
}
```

It is basically a dictionary with a **string key** and a **string value**. The key becomes the SecretId and the value becomes the content.

In Bash the above would look like this:

```bash
SET SECRETS_MANAGER_SECRETS='{"from/env":"{\"key\": \"value\"}","kewl":"{\"kinda\":\"ew\"}"}'
```
