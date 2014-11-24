# zuulnice

> Zuul plays nice with Browserify

# Install

From npm.

```shell
npm install zuulnice
```

# Use

Configure Zuul using the `.zuul.yml` yaml file. First off, add the `zuulnice` builder.

```yaml
builder: zuulnice
```

It works exactly like the default builder, and it adds extra functionality through the yaml configuration. You can set any of the configuration elements in the list below.

- `plugin`
- `external`
- `ignore`
- `exclude`
- `transform`
- `add`
- `require`

The syntax is as follows. You can pass options to any of them!

```yaml
builder: zuulnice
browserify:
  - plugin: proxyquire-universal
  - require: ./some-file.js
    expose: intimidate
    entry: true
  - external: ./some-module.js
  - transform: brfs
```

# License

MIT
