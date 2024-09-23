import { EventBridgeEvent } from 'aws-lambda';
import { Logger } from '@aws-lambda-powertools/logger';

type AppClientUpdateEvent = {
  eventTime: string;
  eventName: string;
  responseElements: {
    userPoolClient: {
      userPoolId: string;
      clientId: string;
    };
  };
};

const logger = new Logger({ serviceName: process.env.SERVICE_NAME, logLevel: 'DEBUG' });

export const handler = async (
  event: EventBridgeEvent<string, AppClientUpdateEvent>,
): Promise<void> => {
  // Log incoming event
  logger.debug('Invocation event', { event });

  // Get and log main details
  const { eventTime, eventName } = event.detail;
  const { userPoolId, clientId } = event.detail.responseElements.userPoolClient;
  const appClientApiCallDetails = {
    eventTime,
    eventName,
    userPoolId,
    clientId,
  };
  logger.debug('App client API call details', { appClientApiCallDetails });

  // Do whatever you want
  // ...
};
