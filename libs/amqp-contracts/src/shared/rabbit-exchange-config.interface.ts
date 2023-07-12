export interface IRabbitExchangeConfig {
  name: string;
  type: 'topic' | 'direct' | 'fanout';
  options?: AssertExchange;
}

interface AssertExchange {
  durable?: boolean;
  internal?: boolean;
  autoDelete?: boolean;
  alternateExchanges?: string;
  arguments?: unknown | unknown[];
}
