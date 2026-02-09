# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Consolidate TSL configs to use shared `@local/configs` package
  - Simplify root `tsl.config.ts` to re-export from `@local/configs`
  - Update all package configs to use shared `tsl.config.ts`
  - Remove inline rule configurations in favor of centralized config

