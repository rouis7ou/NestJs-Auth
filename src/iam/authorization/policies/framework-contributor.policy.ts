import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';
import { PolicyHandler } from './interfaces/policy-handler.interface';
import { Policy } from './interfaces/policy.interface';
import { Injectable } from '@nestjs/common';
import { PolicyHandlerStorage } from './policy-handlers.storage';

export class FrameworkContributorPolicy implements Policy {
  name: 'FrameworkContributor';
}

@Injectable()
export class FrameworkContributorPolicyHandler
  implements PolicyHandler<FrameworkContributorPolicy>
{
  constructor(private readonly policyHandlerStorage: PolicyHandlerStorage) {
    this.policyHandlerStorage.add(FrameworkContributorPolicy, this);
  }

  async handle(
    policy: FrameworkContributorPolicy,
    user: ActiveUserData,
  ): Promise<void> {
    const isContributor = user.email.endsWith('@nestjs.com');
    if (!isContributor) {
      throw new Error('User in not contributor');
    }
  }
}
