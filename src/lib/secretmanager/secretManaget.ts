import {
  SecretsManagerClient,
  GetSecretValueCommand,
  GetSecretValueCommandInput,
} from "@aws-sdk/client-secrets-manager";

const secretManager = async (region: string, secret: string) => {
  const client = new SecretsManagerClient({ region: region });
  const secretInput: GetSecretValueCommandInput = { SecretId: secret };
  const command = new GetSecretValueCommand(secretInput);
  let response: any = {};
  try {
    const output = await client.send(command);
    response = output.SecretString ? JSON.parse(output.SecretString) : {};
    console.log(response);
    return response;
  } catch (error: any) {
    console.log(error);
    return response;
  }
};

export default secretManager;
