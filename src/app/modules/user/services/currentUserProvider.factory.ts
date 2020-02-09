import { CurrentUserProvider } from './currentUser.provider';

export function currentUserProviderFactory(provider: CurrentUserProvider) {
  return () => provider.load();
}
