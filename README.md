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

The syntax is as follows. You can pass options to any of them, and you can use multiples as the configuration object is treated as an array!

```yaml
builder: zuulnice
browserify:
  - plugin: proxyquire-universal
  - require: ./some-file.js
    expose: intimidate
    entry: true
  - external: ./some-module.js
  - transform: brfs
  - transform: jadeify
```

You can also configure what's passed as the `opts` to `browserify(opts)` by adding an item with the `options` property.

```yaml
builder: zuulnice
browserify:
  - transform: coffeeify
  - options:
      extensions:
        - .js
        - .json
        - .coffee
```

# License

MIT
