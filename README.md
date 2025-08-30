# Piezopy IAM Role

[![Patreon](https://img.shields.io/badge/Patreon-F96854?style=for-the-badge&logo=patreon&logoColor=white)](https://www.patreon.com/Pyriter)

## Description

A reusable AWS CDK construct that creates a standardized IAM role for dashboard applications. This construct provides a pre-configured IAM role with read-only access to AWS billing information, designed to be used across multiple CDK stacks or projects.

## Features

- **Standardized IAM Role**: Creates a consistent IAM role with predefined permissions
- **Billing Read Access**: Automatically attaches `AWSBillingReadOnlyAccess` managed policy
- **Conditional Creation**: Optional role creation based on configuration
- **CDK Integration**: Built as a native CDK construct for seamless integration
- **TypeScript Support**: Full TypeScript definitions and source code
- **Comprehensive Testing**: Full test coverage with Jest

## Install

```bash
npm install @pyriter/piezopy-iam-role
```

## One Time Setup

This construct requires AWS CDK to be set up in your project. Ensure you have:

1. AWS CDK CLI installed globally
2. AWS credentials configured
3. CDK project initialized

## Usage

### Basic Usage

```typescript
import { Stack, App } from 'aws-cdk-lib';
import { PiezopyDashboardIamRole } from '@pyriter/piezopy-iam-role';

const app = new App();
const stack = new Stack(app, 'MyStack');

// Create the dashboard IAM role
const dashboardRole = new PiezopyDashboardIamRole(stack, 'DashboardRole');

// The role is now available as dashboardRole.role
```

### Conditional Role Creation for multi-region deployment within same aws account 

```typescript
import { PiezopyDashboardIamRole } from '@pyriter/piezopy-iam-role';

const dashboardRole = new PiezopyDashboardIamRole(stack, 'DashboardRole', {
  shouldCreate: false
});

```

## API Reference

### PiezopyDashboardIamRoleProps

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `shouldCreate` | `boolean` | `true` | Whether to create the IAM role |

### PiezopyDashboardIamRole

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `role` | `iam.Role \| null` | The created IAM role or null if not created |

#### Constructor

```typescript
constructor(scope: Construct, id: string, props?: PiezopyDashboardIamRoleProps)
```

## IAM Role Details

The created IAM role has the following characteristics:

- **Role Name**: `PIEZOPY_DASHBOARD_DO_NOT_DELETE`
- **Trust Policy**: Allows the AWS account `861276101356` to assume this role
- **Managed Policies**: `AWSBillingReadOnlyAccess` (read-only access to billing)
- **Removal Policy**: `DESTROY` (deleted when stack is destroyed)

## Development

### Prerequisites

- Node.js 18+
- TypeScript 5.0+
- AWS CDK 2.0+

### Build

```bash
npm run build
```

### Test

```bash
npm test
```

### Watch Mode

```bash
npm run watch
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the GPL License.

## Support

- **Issues**: [GitHub Issues](https://github.com/pyriter/dashboardIamRole/issues)
- **Documentation**: [Package on npm](https://www.npmjs.com/package/@pyriter/piezopy-iam-role)
- **Author**: Phong Vuong
