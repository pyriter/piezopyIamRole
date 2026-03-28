# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an npm-published AWS CDK construct library (`@pyriter/piezopy-iam-role`) that creates a standardized IAM role for Piezopy dashboard applications. The role grants read-only billing access via the `AWSBillingReadOnlyAccess` managed policy.

## Commands

- **Build:** `npm run build` (runs `clean` then `tsc`)
- **Test:** `npm test` (runs Jest)
- **Run single test:** `npx jest --testNamePattern="<pattern>"`
- **Watch mode:** `npm run watch`

## Architecture

- `src/main.ts` — barrel export file, re-exports everything from the construct module
- `src/piezopy-dashboard-iam-role.ts` — the single CDK construct (`PiezopyDashboardIamRole`), extends `Construct`. Accepts a `shouldCreate` prop to conditionally create the IAM role (useful for multi-region deployments in the same AWS account)
- `test/dashboard-iam-role.test.ts` — tests use `aws-cdk-lib/assertions` `Template.fromStack()` to verify CloudFormation output
- TypeScript compiles to `lib/` (published to npm); `src/` is the source root

## Key Details

- `aws-cdk-lib` and `constructs` are **devDependencies** (peer deps for consumers)
- Jest is configured with `ts-jest`, test root is `test/`, coverage output is HTML in `coverage/`
- TSLint is present (`tslint.json`) for linting
- The construct's IAM role name is hardcoded as `PIEZOPY_DASHBOARD_DO_NOT_DELETE` and trusts account `861276101356`
