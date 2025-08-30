import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { DashboardIamRole } from '../lib/dashboard-iam-role';

describe('DashboardIamRole', () => {
  let app: App;
  let stack: Stack;

  beforeEach(() => {
    app = new App();
    stack = new Stack(app, 'TestStack', {
      env: {
        account: '123456789012',
        region: 'us-east-1'
      }
    });
  });

  test('creates IAM role with correct properties', () => {
    // ARRANGE & ACT
    const role = new DashboardIamRole(stack, 'TestRole', {});

    // ASSERT
    const template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::IAM::Role', {
      RoleName: 'PIEZOPY_DASHBOARD_DO_NOT_DELETE',
      Description: 'An IAM role for dashboard. See here for more info: https://www.npmjs.com/package/@pyriter/piezopy-iam-role',
      AssumeRolePolicyDocument: {
        Statement: [
          {
            Action: 'sts:AssumeRole',
            Effect: 'Allow',
            Principal: {
              AWS: 'arn:aws:iam::861276101356:root'
            }
          }
        ],
        Version: '2012-10-17'
      },
      ManagedPolicyArns: [
        {
          'Fn::Join': [
            '',
            [
              'arn:',
              {
                Ref: 'AWS::Partition'
              },
              ':iam::aws:policy/AWSBillingReadOnlyAccess'
            ]
          ]
        }
      ]
    });
  });

  test('does not create IAM role when shouldCreate is false', () => {
    // ARRANGE & ACT
    const dashboardRole = new DashboardIamRole(stack, 'TestRole', {
      shouldCreate: false
    });

    // ASSERT
    const template = Template.fromStack(stack);
    template.resourceCountIs('AWS::IAM::Role', 0);
    expect(dashboardRole.role).toBeNull();
  });

  test('creates IAM role when shouldCreate is not provided', () => {
    // ARRANGE & ACT
    const dashboardRole = new DashboardIamRole(stack, 'TestRole', {});

    // ASSERT
    const template = Template.fromStack(stack);
    template.resourceCountIs('AWS::IAM::Role', 1);
    expect(dashboardRole.role).not.toBeNull();
  });

  test('role has correct managed policy', () => {
    // ARRANGE & ACT
    new DashboardIamRole(stack, 'TestRole', {});

    // ASSERT
    const template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::IAM::Role', {
      ManagedPolicyArns: [
        {
          'Fn::Join': [
            '',
            [
              'arn:',
              {
                Ref: 'AWS::Partition'
              },
              ':iam::aws:policy/AWSBillingReadOnlyAccess'
            ]
          ]
        }
      ]
    });
  });

  test('role has correct name and description', () => {
    // ARRANGE & ACT
    new DashboardIamRole(stack, 'TestRole', {});

    // ASSERT
    const template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::IAM::Role', {
      RoleName: 'PIEZOPY_DASHBOARD_DO_NOT_DELETE',
      Description: 'An IAM role for dashboard. See here for more info: https://www.npmjs.com/package/@pyriter/piezopy-iam-role'
    });
  });
});
