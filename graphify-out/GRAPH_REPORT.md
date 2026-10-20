# Graph Report - Projek-kos-management  (2026-10-20)

## Corpus Check
- 112 files · ~16,991 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 447 nodes · 692 edges · 41 communities (38 shown, 3 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 21 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2ae2fb69`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Room
- Illuminate\Http\Request
- User
- composer.json
- devDependencies
- DeleteUserForm.jsx
- scripts
- AuthenticatedLayout.jsx
- compilerOptions
- LoginRequest
- README.md
- UserFactory
- Dropdown.jsx
- Laravel Application
- Laravel Application
- ExampleTest

## God Nodes (most connected - your core abstractions)
1. `User` - 27 edges
2. `Controller` - 23 edges
3. `TestCase` - 18 edges
4. `Room` - 17 edges
5. `Rental` - 15 edges
6. `Permit` - 14 edges
7. `AuthenticatedLayout()` - 10 edges
8. `PermitController` - 9 edges
9. `RentalController` - 9 edges
10. `RoomController` - 9 edges

## Surprising Connections (you probably didn't know these)
- `PermitController` --inherits--> `Controller`  [EXTRACTED]
  app/Http/Controllers/PermitController.php → app/Http/Controllers/Controller.php
- `RentalController` --inherits--> `Controller`  [EXTRACTED]
  app/Http/Controllers/RentalController.php → app/Http/Controllers/Controller.php
- `RoomController` --inherits--> `Controller`  [EXTRACTED]
  app/Http/Controllers/RoomController.php → app/Http/Controllers/Controller.php
- `AuthenticatedSessionController` --inherits--> `Controller`  [EXTRACTED]
  app/Http/Controllers/Auth/AuthenticatedSessionController.php → app/Http/Controllers/Controller.php
- `ConfirmablePasswordController` --inherits--> `Controller`  [EXTRACTED]
  app/Http/Controllers/Auth/ConfirmablePasswordController.php → app/Http/Controllers/Controller.php

## Import Cycles
- None detected.

## Communities (41 total, 3 thin omitted)

### Community 0 - "Room"
Cohesion: 0.05
Nodes (17): PermitController, RentalController, RoomController, StorePermitRequest, UpdatePermitRequest, StoreRentalRequest, UpdateRentalRequest, StoreRoomRequest (+9 more)

### Community 1 - "Illuminate\Http\Request"
Cohesion: 0.08
Nodes (22): AuthenticatedSessionController, ConfirmablePasswordController, EmailVerificationNotificationController, EmailVerificationPromptController, NewPasswordController, PasswordController, PasswordResetLinkController, RegisteredUserController (+14 more)

### Community 2 - "User"
Cohesion: 0.08
Nodes (14): User, Illuminate\Foundation\Auth\User, Illuminate\Foundation\Testing\RefreshDatabase, Illuminate\Foundation\Testing\TestCase, Illuminate\Notifications\Notifiable, AuthenticationTest, EmailVerificationTest, PasswordConfirmationTest (+6 more)

### Community 3 - "composer.json"
Cohesion: 0.04
Nodes (44): pestphp/pest-plugin, php-http/discovery, autoload, autoload-dev, psr-4, psr-4, config, allow-plugins (+36 more)

### Community 4 - "devDependencies"
Cohesion: 0.05
Nodes (38): AppServiceProvider, autoprefixer, concurrently, @headlessui/react, Illuminate\Support\ServiceProvider, @inertiajs/react, @laravel/multiplex, laravel-vite-plugin (+30 more)

### Community 5 - "DeleteUserForm.jsx"
Cohesion: 0.14
Nodes (12): ApplicationLogo(), Checkbox(), DangerButton(), InputError(), InputLabel(), Modal(), PrimaryButton(), SecondaryButton() (+4 more)

### Community 6 - "scripts"
Cohesion: 0.08
Nodes (26): scripts, dev, post-autoload-dump, post-create-project-cmd, post-root-package-install, post-update-cmd, pre-package-uninstall, setup (+18 more)

### Community 7 - "AuthenticatedLayout.jsx"
Cohesion: 0.12
Nodes (4): Header(), Navbar(), Sidebar(), AuthenticatedLayout()

### Community 8 - "compilerOptions"
Cohesion: 0.22
Nodes (8): compilerOptions, baseUrl, paths, exclude, ziggy-js, node_modules, public, ./vendor/tightenco/ziggy

### Community 10 - "README.md"
Cohesion: 0.25
Nodes (7): About Laravel, Agentic Development, Code of Conduct, Contributing, Learning Laravel, License, Security Vulnerabilities

### Community 11 - "UserFactory"
Cohesion: 0.47
Nodes (3): UserFactory, Illuminate\Database\Eloquent\Factories\Factory, static

### Community 13 - "Laravel Application"
Cohesion: 0.50
Nodes (3): Agent Setup, Laravel Application, Prerequisites

### Community 14 - "Laravel Application"
Cohesion: 0.50
Nodes (3): Agent Setup, Laravel Application, Prerequisites

## Knowledge Gaps
- **83 isolated node(s):** `$schema`, `name`, `type`, `description`, `laravel` (+78 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `User` connect `User` to `Room`, `Illuminate\Http\Request`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Why does `Controller` connect `Illuminate\Http\Request` to `Room`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Are the 21 inferred relationships involving `User` (e.g. with `.store()` and `.run()`) actually correct?**
  _`User` has 21 INFERRED edges - model-reasoned connections that need verification._
- **What connects `$schema`, `name`, `type` to the rest of the system?**
  _83 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Room` be split into smaller, more focused modules?**
  _Cohesion score 0.05328218243819267 - nodes in this community are weakly interconnected._
- **Should `Illuminate\Http\Request` be split into smaller, more focused modules?**
  _Cohesion score 0.08045977011494253 - nodes in this community are weakly interconnected._
- **Should `User` be split into smaller, more focused modules?**
  _Cohesion score 0.07529411764705882 - nodes in this community are weakly interconnected._