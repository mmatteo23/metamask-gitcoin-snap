export type StampMetadata = {
  group: string;
  platform: {
    id: string;
    icon: string;
    name: string;
    description: string;
    connectMessage: string;
  };
  name: string;
  description: string;
  hash: string;
};

export type GitcoinStampItem = {
  version: string;
  credential: {
    '@context': string[];
    id: string;
    type: string[];
    issuer: string;
    issuanceDate: string;
    credentialSubject: any;
    proof: {
      type: string;
      created: string;
      proofPurpose: string;
      verificationMethod: string;
      jws: string;
    };
  };
  metadata: StampMetadata;
};

export type LoadApiKeyParams = {
  apiKey: string;
};

export type StampOutput = Record<
  string,
  {
    [x: string]: {
      // name: string;
      stamps: string[];
    };
  }
>;
