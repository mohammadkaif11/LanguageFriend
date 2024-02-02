// types.d.ts (or any appropriate file where you define types)

import { Session } from 'next-auth';

interface CustomUser {
  id: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  goal?: string | null | undefined;
  nativeLanguageSetting?: string | null | undefined;
  proficiencyLevelSetting?: string | null | undefined;
  targetLanguageSetting?: string | null | undefined;
}

declare module 'next-auth' {
export interface Session {
    user: CustomUser;
  }
}
