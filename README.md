# Dev Team Styleguide

An [atomic design](http://bradfrost.com/blog/post/atomic-web-design/) and [Pattern Lab](http://patternlab.io/) starting point.

## Pattern Lab

Prerequisites: [git](https://git-scm.com/) and [Composer](https://getcomposer.org/) installed.

```sh
composer create-project pattern-lab/edition-twig-standard pattern-lab && cd $_
```

In the `htdocs`directory run:

```sh
composer create-project pattern-lab/edition-twig-standard pattern-lab && cd $_
```

When prompted for suggested starterkit choose `1: pattern-lab/starterkit-twig-base`.

In the `pattern-lab` directory run:

```sh
composer install
```

In the file `pattern-lab/config/config.yml` change sourceDir to:

```json
sourceDir: ../source
```

If everything went well you should now be able to generate the static Pattern Lab site. In the `pattern-lab` directory run:

```sh
php core/console --generate
```

To start the server, in the `pattern-lab` directory run:

```sh
php core/console --server
```

You can now view the site at: <a href="http://localhost:8080">http://localhost:8080</a>
