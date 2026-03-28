import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { PiezopyDashboardIamRole } from '../src/piezopy-dashboard-iam-role';

describe('PiezopyDashboardIamRole', () => {
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
    const role = new PiezopyDashboardIamRole(stack, 'TestRole', {});

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
        },
        {
          'Fn::Join': [
            '',
            [
              'arn:',
              {
                Ref: 'AWS::Partition'
              },
              ':iam::aws:policy/AWSCodePipeline_ReadOnlyAccess'
            ]
          ]
        },
        {
          'Fn::Join': [
            '',
            [
              'arn:',
              {
                Ref: 'AWS::Partition'
              },
              ':iam::aws:policy/AWSCodeBuildReadOnlyAccess'
            ]
          ]
        }
      ]
    });
  });

  test('does not create IAM role when shouldCreate is false', () => {
    // ARRANGE & ACT
    const dashboardRole = new PiezopyDashboardIamRole(stack, 'TestRole', {
      shouldCreate: false
    });

    // ASSERT
    const template = Template.fromStack(stack);
    template.resourceCountIs('AWS::IAM::Role', 0);
    expect(dashboardRole.role).toBeNull();
  });

  test('creates IAM role when shouldCreate is not provided', () => {
    // ARRANGE & ACT
    const dashboardRole = new PiezopyDashboardIamRole(stack, 'TestRole', {});

    // ASSERT
    const template = Template.fromStack(stack);
    template.resourceCountIs('AWS::IAM::Role', 1);
    expect(dashboardRole.role).not.toBeNull();
  });

  test('role has correct managed policies', () => {
    // ARRANGE & ACT
    new PiezopyDashboardIamRole(stack, 'TestRole', {});

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
        },
        {
          'Fn::Join': [
            '',
            [
              'arn:',
              {
                Ref: 'AWS::Partition'
              },
              ':iam::aws:policy/AWSCodePipeline_ReadOnlyAccess'
            ]
          ]
        },
        {
          'Fn::Join': [
            '',
            [
              'arn:',
              {
                Ref: 'AWS::Partition'
              },
              ':iam::aws:policy/AWSCodeBuildReadOnlyAccess'
            ]
          ]
        }
      ]
    });
  });

  test('role has correct name and description', () => {
    // ARRANGE & ACT
    new PiezopyDashboardIamRole(stack, 'TestRole', {});

    // ASSERT
    const template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::IAM::Role', {
      RoleName: 'PIEZOPY_DASHBOARD_DO_NOT_DELETE',
      Description: 'An IAM role for dashboard. See here for more info: https://www.npmjs.com/package/@pyriter/piezopy-iam-role'
    });
  });
});
