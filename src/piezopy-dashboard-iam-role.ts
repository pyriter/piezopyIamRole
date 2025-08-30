import { aws_iam as iam, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface PiezopyDashboardIamRoleProps {
  shouldCreate?: boolean;
}

export class PiezopyDashboardIamRole extends Construct {
  public readonly role: iam.Role | null = null;

  constructor(scope: Construct, id: string, props: PiezopyDashboardIamRoleProps) {
    super(scope, id);
    const { shouldCreate = true } = props;

    if (shouldCreate) {
      this.role = new iam.Role(this, 'MyRole', {
        assumedBy: new iam.ArnPrincipal(`arn:aws:iam::861276101356:root`),
        description:
          'An IAM role for dashboard. See here for more info: https://www.npmjs.com/package/@pyriter/piezopy-iam-role',
        roleName: `PIEZOPY_DASHBOARD_DO_NOT_DELETE`,
        managedPolicies: [
          iam.ManagedPolicy.fromAwsManagedPolicyName(
            'AWSBillingReadOnlyAccess',
          ),
        ],
      });
      this.role.applyRemovalPolicy(RemovalPolicy.DESTROY);
    }
  }
}
