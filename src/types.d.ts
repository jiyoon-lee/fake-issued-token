export interface TokenType {
  tenantId: string;
  serviceId: string;
  version: string;
  id: string;
  name: string;
  desc: string;
  type: string;
  user: {
    userName: string;
    userLevel: string;
  };
  url: string;
  authKey: string;
  iat?: number;
  exp?: number;
}
