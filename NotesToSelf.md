# Notes to self

## Releasing a new version

Note that we build using `buildx` as we are building a multi-platform docker image.

```sh
yarn version <major|minor|patch>
docker buildx build --platform=linux/amd64,linux/arm64 -t skarpdev/aws-secrets-manager-emulator:<version> --push .
```

Version should be something like `1.2.3`.

### No buildx

Ensure that your version of docker is at least `19.03` (as that is where `buildx` was added).


### If it fails building for one of the platforms

If the build fails building for one of the platforms, then the QEMU stuff probably has to be updated.

```sh
docker run --privileged --rm tonistiigi/binfmt --install all
sudo apt-get install qemu qemu-user-static
docker run --rm -t arm64v8/ubuntu uname -m  # Testing the emulation environment
```

If the QEMU stuff stops working, then try:

```sh
docker run --rm --privileged multiarch/qemu-user-static --reset -p yes
```
