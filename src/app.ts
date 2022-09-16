import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
let response: APIGatewayProxyResult | PromiseLike<APIGatewayProxyResult>;
import processUser from "./core/functions/processUser";

export async function userHandler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    let body;
    if (typeof event.body === "string") {
      body = JSON.parse(event.body);
    } else {
      body = event.body;
    }
    console.log('body::', event.body);
    const result = await processUser(event.body)  //-> controller
    response = {
      statusCode: result.status,      //-> status que retorna el controller processUser
      body: JSON.stringify(result.response),  //-> response que retorna el controller processUser
    };
  } catch (err) {
    console.log(err);
  }
  return response;
}