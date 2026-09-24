# Graph Report - Projek-kos-management  (2026-09-24)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 161 nodes · 169 edges · 26 communities (13 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e37ad0f5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- composer.json
- User
- UserFactory.php
- 0001_01_01_000000_create_users_table.php
- Illuminate\Database\Eloquent\Model
- scripts
- require-dev
- config
- AppServiceProvider
- bootstrap/app.php
- TestCase
- psr-4
- logging.php
- ExampleTest
- console.php
- Controller.php
- Illuminate\Support\Facades\Route

## God Nodes (most connected - your core abstractions)
1. `User` - 9 edges
2. `scripts` - 9 edges
3. `require-dev` - 8 edges
4. `AppServiceProvider` - 5 edges
5. `config` - 5 edges
6. `TestCase` - 4 edges
7. `DatabaseSeeder` - 4 edges
8. `UserFactory` - 4 edges
9. `Rental` - 4 edges
10. `require` - 4 edges

## Surprising Connections (you probably didn't know these)
- `ExampleTest` --inherits--> `TestCase`  [EXTRACTED]
  tests/Feature/ExampleTest.php → tests/TestCase.php

## Import Cycles
- None detected.

## Communities (26 total, 5 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.10
Nodes (20): devDependencies, concurrently, laravel-vite-plugin, tailwindcss, @tailwindcss/vite, vite, optionalDependencies, @laravel/multiplex (+12 more)

### Community 1 - "composer.json"
Cohesion: 0.11
Nodes (18): autoload-dev, psr-4, description, extra, laravel, keywords, dont-discover, license (+10 more)

### Community 2 - "User"
Cohesion: 0.22
Nodes (7): User, DatabaseSeeder, Illuminate\Database\Console\Seeds\WithoutModelEvents, Illuminate\Database\Eloquent\Relations\HasMany, Illuminate\Database\Seeder, Illuminate\Foundation\Auth\User, Illuminate\Notifications\Notifiable

### Community 3 - "UserFactory.php"
Cohesion: 0.20
Nodes (6): UserFactory, Illuminate\Database\Eloquent\Factories\Factory, Illuminate\Support\Facades\Hash, Illuminate\Support\Str, Pdo\Mysql, static

### Community 4 - "0001_01_01_000000_create_users_table.php"
Cohesion: 0.23
Nodes (3): Illuminate\Database\Migrations\Migration, Illuminate\Database\Schema\Blueprint, Illuminate\Support\Facades\Schema

### Community 5 - "Illuminate\Database\Eloquent\Model"
Cohesion: 0.31
Nodes (5): Permission, Rental, Room, Illuminate\Database\Eloquent\Model, Illuminate\Database\Eloquent\Relations\BelongsTo

### Community 6 - "scripts"
Cohesion: 0.22
Nodes (9): scripts, dev, post-autoload-dump, post-create-project-cmd, post-root-package-install, post-update-cmd, pre-package-uninstall, setup (+1 more)

### Community 7 - "require-dev"
Cohesion: 0.25
Nodes (8): require-dev, fakerphp/faker, laravel/pail, laravel/pao, laravel/pint, mockery/mockery, nunomaduro/collision, phpunit/phpunit

### Community 8 - "config"
Cohesion: 0.29
Nodes (7): pestphp/pest-plugin, php-http/discovery, config, allow-plugins, optimize-autoloader, preferred-install, sort-packages

### Community 10 - "bootstrap/app.php"
Cohesion: 0.40
Nodes (4): Illuminate\Foundation\Application, Illuminate\Foundation\Configuration\Exceptions, Illuminate\Foundation\Configuration\Middleware, Illuminate\Http\Request

### Community 11 - "TestCase"
Cohesion: 0.47
Nodes (3): Illuminate\Foundation\Testing\TestCase, ExampleTest, TestCase

### Community 12 - "psr-4"
Cohesion: 0.40
Nodes (5): autoload, psr-4, App\\, Database\\Factories\\, Database\\Seeders\\

### Community 13 - "logging.php"
Cohesion: 0.40
Nodes (4): Monolog\Handler\NullHandler, Monolog\Handler\StreamHandler, Monolog\Handler\SyslogUdpHandler, Monolog\Processor\PsrLogMessageProcessor

## Knowledge Gaps
- **51 isolated node(s):** `Controller`, `concurrently`, `laravel-vite-plugin`, `tailwindcss`, `@tailwindcss/vite` (+46 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 86 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `User` connect `User` to `UserFactory.php`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Why does `scripts` connect `scripts` to `composer.json`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `require-dev` connect `require-dev` to `composer.json`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **What connects `Controller`, `concurrently`, `laravel-vite-plugin` to the rest of the system?**
  _51 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09956709956709957 - nodes in this community are weakly interconnected._
- **Should `composer.json` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._