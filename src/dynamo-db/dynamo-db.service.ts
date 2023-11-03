import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  PutCommand,
  GetCommand,
  ScanCommand,
  DeleteCommand,
  DynamoDBDocumentClient,
} from '@aws-sdk/lib-dynamodb';

@Injectable()
export class DynamoDBService {
  private readonly docClient: DynamoDBDocumentClient;

  constructor() {
    const dynamoDB = new DynamoDBClient({ region: 'us-east-1' });
    this.docClient = DynamoDBDocumentClient.from(dynamoDB);
  }

  async scan(tableName: string): Promise<any[]> {
    try {
      const command = new ScanCommand({ TableName: tableName });
      const result = await this.docClient.send(command);
      return result.Items;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async get(tableName: string, id: string): Promise<any> {
    try {
      const command = new GetCommand({ TableName: tableName, Key: { id } });
      const result = await this.docClient.send(command);
      return result.Item;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async put(
    tableName: string,
    token: string,
    item: Record<string, any>,
  ): Promise<any> {
    try {
      const command = new PutCommand({
        TableName: tableName,
        Item: { id: token, ...item },
      });
      await this.docClient.send(command);
      return item;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(tableName: string, id: string): Promise<any> {
    try {
      const command = new DeleteCommand({ TableName: tableName, Key: { id } });
      const result = await this.docClient.send(command);
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
